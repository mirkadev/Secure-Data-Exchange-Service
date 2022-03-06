const cuid = require('cuid');
const { randomString } = require('../utils/random-string');
const { DateEntity } = require('./date.entity');

class MetadataEntity {
  constructor(accessTimeCount, expirationTime, shareCode, adminCode, filename, id = null) {
    this._accessTimeCount = accessTimeCount;
    this._expirationTime = expirationTime;
    this._shareCode = shareCode;
    this._adminCode = adminCode;
    this._filename = filename;
    this._id = id;
  }

  get accessTimeCount() {
    return this._accessTimeCount;
  }

  set accessTimeCount(count) {
    this._accessTimeCount = count;
  }

  get expirationTime() {
    return this._expirationTime.toISO();
  }

  set expirationTime(timeStampEntity) {
    this._expirationTime = timeStampEntity;
  }

  get shareCode() {
    return this._shareCode;
  }

  set shareCode(code) {
    this._shareCode = code;
  }

  get adminCode() {
    return this._adminCode;
  }

  set adminCode(code) {
    this._adminCode = code;
  }

  get filename() {
    return this._filename;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  isExpired() {
    if (this._expirationTime.toUNIX() <= DateEntity.now().toUNIX()) {
      return true;
    }

    return false;
  }

  static generateCode(size) {
    return randomString(size, 'base64').replace(/[^A-Za-z0-9]/g, () => randomString(1, 'hex'));
  }

  static generateFilename() {
    const date = DateEntity.now();
    return `${cuid()}_${date.toUNIX()}.data`;
  }
}

module.exports = { MetadataEntity };
