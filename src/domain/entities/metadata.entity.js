const { randomString } = require('../utils/random-string');

class MetadataEntity {
  constructor(data, accessTimeCount, expirationTime, shareCode, adminCode, filename, id = null) {
    this._data = data;
    this._accessTimeCount = accessTimeCount;
    this._expirationTime = expirationTime;
    this._shareCode = shareCode;
    this._adminCode = adminCode;
    this._filename = filename;
    this._id = id;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  get accessTimeCount() {
    return this._accessTimeCount;
  }

  set accessTimeCount(count) {
    this._accessTimeCount = count;
  }

  get expirationTime() {
    return this._expirationTime;
  }

  set expirationTime(time) {
    this._expirationTime = time;
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

  static generateCode(size) {
    return randomString(size, 'base64').replace(/[^A-Za-z0-9]/g, () => randomString(1, 'hex'));
  }
}

module.exports = { MetadataEntity };
