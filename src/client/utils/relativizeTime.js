function getWeekNumber(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
}

function isThisWeek(date) {
  const thisWeek = getWeekNumber();
  const week = getWeekNumber(date);
  return thisWeek === week;
}

export default function relativizeTime(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const deltaSeconds = (Date.now() - date) / 1000;

  if (deltaSeconds < 60) {
    return '剛剛';
  } else if (deltaSeconds < 60 * 60) {
    // less than an hour
    return Math.floor(deltaSeconds / 60) + '分鐘前';
  } else if (deltaSeconds < 60 * 60 * 24) {
    // less than a day
    return Math.floor(deltaSeconds / 60 / 60) + '小時前';
  } else if (deltaSeconds < 60 * 60 * 24 * 2) {
    // less than two day
    return '昨天';
  } else if (isThisWeek(date)) {
    return '星期' + ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
  } else {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    const dd = date.getDate().toString();

    if (new Date().getFullYear() !== date.getFullYear()) {
      return yyyy + '年' + (mm[1] ? mm : '0' + mm[0]) + '月' + (dd[1] ? dd : '0' + dd[0]) + '日'; // padding
    } else {
      return (mm[1] ? mm : '0' + mm[0]) + '月' + (dd[1] ? dd : '0' + dd[0]) + '日'; // padding
    }
  }
}
