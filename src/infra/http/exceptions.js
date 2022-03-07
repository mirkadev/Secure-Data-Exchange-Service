/* eslint-disable max-classes-per-file */
const STATUSES = {
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

class HttpException extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status || STATUSES.INTERNAL_SERVER_ERROR;
    this.code = code || 500;
  }
}

class NotFoundException extends HttpException {
  constructor(message, status) {
    super(message, status || STATUSES.NOT_FOUND, 404);
  }
}

class BadRequestException extends HttpException {
  constructor(message, status) {
    super(message, status || STATUSES.BAD_REQUEST, 400);
  }
}

module.exports = { HttpException, NotFoundException, BadRequestException };
