const { DateTime } = require('luxon');

class DateEntity {
  constructor(date) {
    this._date = date;
  }

  toJSDate() {
    return this._date.toJSDate();
  }

  toISO() {
    return this._date.toISO();
  }

  toUNIX() {
    return this._date.toUnixInteger();
  }

  isValid() {
    return this._date.isValid;
  }

  getFullYear() {
    return this._date.toFormat('YYYY');
  }

  getMonth() {
    return this._date.toFormat('MM');
  }

  getDate() {
    return this._date.toFormat('dd');
  }

  getHours() {
    return this._date.toFormat('HH');
  }

  getMinutes() {
    return this._date.toFormat('mm');
  }

  getSeconds() {
    return this._date.toFormat('s');
  }

  getMilliseconds() {
    return this._date.toFormat('SSS');
  }

  static of(date) {
    let dateObject;

    if (typeof date === 'string') {
      dateObject = DateTime.fromISO(date);
    }

    if (date instanceof Date) {
      dateObject = DateTime.fromJSDate(date);
    }

    return new DateEntity(dateObject);
  }

  static isISODateWithTimestamp(dateString) {
    return DateTime.fromFormat(dateString.replace('T', ' '), 'yyyy-MM-dd TT').isValid;
  }

  static now() {
    return DateEntity.of(DateTime.now());
  }
}

module.exports = { DateEntity };
