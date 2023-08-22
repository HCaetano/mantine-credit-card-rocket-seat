export function handleDateFormat(expirationDate: Date | null) {
  if (!expirationDate) {
    return null;
  }

  const monthAsNumber = expirationDate.getMonth() + 1;
  const monthAsString =
    monthAsNumber < 10 ? `0${monthAsNumber}` : monthAsNumber;
  const lastTwoDigitsOfYear = expirationDate
    .getFullYear()
    .toString()
    .substring(2);

  return `${monthAsString}/${lastTwoDigitsOfYear}`;
}
