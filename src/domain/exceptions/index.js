/* eslint-disable max-classes-per-file */
const CODES = {
  NOT_FOUND: 'NOT_FOUND',
  LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
  INVALID_DATA: 'INVALID_DATA',
};

class DomainException extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class NotFoundException extends DomainException {
  constructor(message) {
    super(message, CODES.NOT_FOUND);
  }
}

class LimitExceededException extends DomainException {
  constructor(message) {
    super(message, CODES.LIMIT_EXCEEDED);
  }
}

class ValidationException extends DomainException {
  constructor(message) {
    super(message, CODES.INVALID_DATA);
  }
}

module.exports = { DomainException, NotFoundException, LimitExceededException, ValidationException };
