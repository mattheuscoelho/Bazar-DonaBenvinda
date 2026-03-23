/**
 * Centralized Error Handler Middleware
 * Standardizes error responses in the format:
 * { "error": { "code": "SOME_CODE", "message": "..." } }
 */
function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Ocorreu um erro inesperado no servidor.';

  res.status(status).json({
    error: {
      code,
      message
    }
  });
}

/**
 * Custom Error Class for API errors
 */
class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

module.exports = { errorHandler, ApiError };
