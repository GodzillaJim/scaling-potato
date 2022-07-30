import createHttpError from "http-errors";

const createErrorResponse = (error: any, status: number = 500) => {
  switch (status) {
    case 404:
      return new createHttpError.NotFound(error.message);
    case 400:
      return new createHttpError.BadRequest(error.message);
    case 401:
      return new createHttpError.Unauthorized(error.message);
    case 403:
      return new createHttpError.Forbidden(error.message);
    default:
      return {
        error: {
          statusCode: status,
          message: error.message,
        },
      };
  }
};
export default createErrorResponse;
