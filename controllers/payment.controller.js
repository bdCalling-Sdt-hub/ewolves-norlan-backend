const sendResponse = require("../shared/sendResponse");
const catchAsync = require("../shared/catchAsync");
const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const fs = require("fs");
const User = require("../models/user.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create payment intent
exports.createPaymentIntent = catchAsync(async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "eur",
    payment_method_types: ["card"],
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment created successfully",
    data: paymentIntent.client_secret,
  });
});

//create connected account
exports.createConnectedAccount = catchAsync(async (req, res) => {
  const user = req.user;
  //user check
  const isExistUser = await User.isExistUser(user._id);
  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does't exist!");
  }

  //check already account exist;
  if (await User.isAccountCreated(user._id)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Your account already exist,Please skip this"
    );
  }

  //parse body data
  const bodyData = JSON.parse(req.body.data);
  const { dateOfBirth, phoneNumber, address, bank_info, business_profile } =
    bodyData;
  const dob = new Date(dateOfBirth);

  //process of kyc
  const files = req.files.KYC;
  if (!files && files.length < 2) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Two kyc files are required!");
  }

  //file upload on stipe
  const frontFilePart = await stripe.files.create({
    purpose: "identity_document",
    file: {
      data: fs.readFileSync(files[0].path),
      name: files[0].filename,
      type: files[0].mimetype,
    },
  });

  const backFilePart = await stripe.files.create({
    purpose: "identity_document",
    file: {
      data: fs.readFileSync(files[0].path),
      name: files[0].filename,
      type: files[0].mimetype,
    },
  });

  //create token
  const token = await stripe.tokens.create({
    account: {
      individual: {
        dob: {
          day: dob.getDate(),
          month: dob.getMonth() + 1,
          year: dob.getFullYear(),
        },
        first_name: isExistUser?.firstName,
        last_name: isExistUser?.lastName,
        email: isExistUser?.email,
        phone: phoneNumber,
        address: {
          city: address.city,
          country: address.country,
          line1: address.line1,
          postal_code: address.postal_code,
        },
        verification: {
          document: {
            front: frontFilePart.id,
            back: backFilePart.id,
          },
        },
      },
      business_type: "individual",
      tos_shown_and_accepted: true,
    },
  });

  //account created
  const account = await stripe.accounts.create({
    type: "custom",
    account_token: token.id,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_profile: {
      mcc: "5970",
      name: business_profile.business_name || isExistUser.firstName,
      url: business_profile.website,
      product_description: business_profile.product_description,
    },
    external_account: {
      object: "bank_account",
      account_holder_name: bank_info.account_holder_name,
      account_holder_type: bank_info.account_holder_type,
      account_number: bank_info.account_number,
      country: bank_info.country,
      currency: bank_info.currency,
    },
  });

  //save to the DB
  if (account.id && account.external_accounts.data.length) {
    isExistUser.accountInformation.stripeAccountId = account.id;
    isExistUser.accountInformation.externalAccountId =
      account.external_accounts?.data[0].id;
    isExistUser.accountInformation.status = true;
    await isExistUser.save();
  }

  // Create account link for onboarding
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "https://example.com/reauth",
    return_url: "https://example.com/return",
    type: "account_onboarding",
    collect: "eventually_due",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Connected account created successfully",
    data: accountLink,
  });
});

//transfer money
app.post("/transfer", async (req, res) => {
  try {
    const transfer = await stripe.transfers.create({
      amount: 5 * 100,
      currency: "eur",
      destination: "acct_1PNun0GdZpO2byQu",
    });

    const payouts = await stripe.payouts.create(
      {
        amount: 5 * 100,
        currency: "eur",
        //method: "instant",
        destination: "ba_1PNun1GdZpO2byQuR0sML48a",
      },
      {
        stripeAccount: "acct_1PNun0GdZpO2byQu",
      }
    );

    console.log("payouts", payouts);
    res.status(200).send({
      message: "Transfer and payout created successfully",
      transfer,
      payouts,
    });
  } catch (error) {
    console.log({ error: error });
    res.status(200).send({ message: error });
  }
});
