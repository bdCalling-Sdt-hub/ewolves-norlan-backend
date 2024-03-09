const sendResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    status: data.success,
    message: data.message,
    data: data.data,
    token: data?.token
  };
  
  return res.status(data.statusCode).json(responseData);
};