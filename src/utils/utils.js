const toString = Object.prototype.toString;

const toType = function (target) {
  let str = toString.call(target);
  return str.slice(8, str.length-1);
}

const padZero = function (num) {
  let str = '' + num;
  if (str.length < 2) {
    str = 0 + str;
  }
  return str;
}

const deepClone = function (target) {
  let type = toType(target);
  let res = null;
  if (type === 'Array') {
    res = [];
    target.forEach((item, i) => {
      res[i] = deepClone(item);
    })
  } else if (type === 'Object') {
    res = {};
    Object.keys(target).forEach(key => {
      res[key] = deepClone(target[key]);
    })
  } else {
    res = target;
  }
  return res;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const parsetimeData = function (time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

const parseFormat = function (format = 'DD:HH:mm', timeData) {
  let { days, hours, minutes, seconds } = timeData;
  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', padZero(days));
  }
  format = format.replace('HH', padZero(hours));
  format = format.replace('mm', padZero(minutes));
  format = format.replace('ss', padZero(seconds));
  return format;
}

export {
  toType,
  padZero,
  parseFormat,
  parsetimeData,
  deepClone,
}