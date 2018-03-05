export const getMonth = age => age % 12;

export const getYear = age => Math.floor(age / 12);

export const getAgeString = age => {
  const year = Math.floor(age / 12);
  const month = age % 12;
  let result = '';
  if (year == 0 && month == 0)
    return '0個月';
  if (year > 0)
    result += `${year}歲`;
  if (month > 0)
    result += `${month}個月`;
  return result;
};