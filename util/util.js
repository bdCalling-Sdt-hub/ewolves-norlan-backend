const crypto = require("crypto");
const QRCode = require("qrcode");

exports.cryptoToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

exports.qrCodeGenerate = async (token) => {
  const qrCode = await QRCode.toDataURL(token);
  return qrCode;
};
