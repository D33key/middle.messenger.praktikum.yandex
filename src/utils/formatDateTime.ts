export default function formatDateTime(dateTimeStr: string) {
  const dateTime = new Date(dateTimeStr);

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const dateTimeYear = dateTime.getFullYear();
  const dateTimeMonth = dateTime.getMonth();
  const dateTimeDay = dateTime.getDate();

  if (
    currentYear === dateTimeYear &&
    currentMonth === dateTimeMonth &&
    currentDay === dateTimeDay
  ) {
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const day = String(dateTimeDay).padStart(2, '0');
  const month = String(dateTimeMonth + 1).padStart(2, '0');
  const year = dateTimeYear;
  return `${day}-${month}-${year}`;
}
