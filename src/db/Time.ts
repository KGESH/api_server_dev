export const GetCurrentTime = () => {
  const date: any = new Date();
  const year: any = date.getFullYear();
  const month: any = date.getMonth();
  const day: any = date.getDate();
  const hours: any = date.getHours();
  const minutes: any = date.getMinutes();
  const seconds: any = date.getSeconds();
  // let milliseconds: any = date.getMilliseconds();
  return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
};
