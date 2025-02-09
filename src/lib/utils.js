import {Colors} from './Colors';

export const setHour = () => {
  const date = new Date();
  const secondRatio = date.getSeconds() / 60;
  const minuteRatio = (secondRatio + date.getMinutes()) / 60;
  const hourRatio = (minuteRatio + date.getHours()) / 12;
  return hourRatio;
};

export const setMinute = () => {
  const date = new Date();
  const secondRatio = date.getSeconds() / 60;
  const minuteRatio = (secondRatio + date.getMinutes()) / 60;
  return minuteRatio;
};

export const setSecond = () => {
  const date = new Date();
  const secondRatio = date.getSeconds() / 60;
  return secondRatio;
};

export const showLocalTime = () => {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  console.log('localTime utils', typeof hour, minute, second);
  return {hour, minute, second};
};

export const showISO = (timestampMS, styleLight, styleDark) => {
  const zoneISO = new Date(timestampMS * 1000).toISOString();
  const zoneISOhhmmss = zoneISO.slice(11, 16);
  return zoneISOhhmmss;
};

export const convertTo12HourFormat = time => {
  let [hours, minutes] = time.split(':').map(Number);
  let period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for AM times
  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const time24 = '23:06';
const time12 = convertTo12HourFormat(time24);

console.log(time12); // Output: "11:06 PM"
export const angleClock = (hour, minutes) => {
  const minuteAngle = minutes * 6;
  const hourAngle = hour * 30 + minutes * 0.5;
  const angle = Math.abs(hourAngle - minuteAngle);
  return Math.min(angle, 360 - angle);
};

export const generateRandomColors = () => {
  const colorsArr = [
    Colors.VibrantOrange,
    Colors.vibrantMustard,
    Colors.vibrantPink,
    Colors.vibrantDarkBlue,
    Colors.vibrantWhite,
  ];
  let randomIndex = Math.floor(Math.random() * colorsArr.length);
  return colorsArr.splice(randomIndex, 1);
};
