/* eslint-disable no-unused-vars */
const { DomainException } = require('../../domain/exceptions');
const { BadRequestException, InternalServerErrorException } = require('./exceptions');
const { logger } = require('../../modules/logger/logger.module');

logger.setName('ERROR_HANDLER');

const errorHandler = (err, req, res, next) => {
  let finalException = new InternalServerErrorException();

  if (err instanceof DomainException) {
    finalException = new BadRequestException(err.message, err.code);
  } else {
    logger.error('An unexpected error has occurred', err);
  }

  return res
    .status(finalException.code)
    .json({ status: finalException.code, message: finalException.message || finalException.status });
};

module.exports = { errorHandler };
