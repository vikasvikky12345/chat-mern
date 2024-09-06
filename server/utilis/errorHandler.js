export const errorHandler = async (errorStatus, errorMessage) => {
  const error = new Error();
  error.errorStatus = errorStatus;
  error.errorMessage = errorMessage;
  return error;
};
