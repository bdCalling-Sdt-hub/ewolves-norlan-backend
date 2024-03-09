const sendResponse = (res, status, message, data) => {
    return res.status(status).send({
        status: status,
        message: message,
        data: data
    })
};
module.exports = sendResponse;