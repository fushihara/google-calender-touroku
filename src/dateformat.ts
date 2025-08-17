export function dateformat(dateObj = new Date(), format = "yyyy-MM-dd(ddd)HH:mm:ss.SSS") {
  let result = format;
  result = result.replace(/yyyy/g, dateObj.getFullYear().toString());
  result = result.replace(/MM/g, (dateObj.getMonth() + 1).toString().padStart(2, "0"));
  // result = result.replace(/DDD/g, ["日", "月", "火", "水", "木", "金", "土"][dateObj.getDay()]);
  result = result.replace(/ddd/g, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateObj.getDay()]);
  result = result.replace(/dd/g, dateObj.getDate().toString().padStart(2, "0"));
  result = result.replace(/HH/g, dateObj.getHours().toString().padStart(2, "0"));
  result = result.replace(/mm/g, dateObj.getMinutes().toString().padStart(2, "0"));
  result = result.replace(/ss/g, dateObj.getSeconds().toString().padStart(2, "0"));
  result = result.replace(/SSS/g, dateObj.getMilliseconds().toString().padStart(3, "0"));
  return result;
}