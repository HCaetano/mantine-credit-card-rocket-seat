export function handleExpirationDateDisplay(expirationDate: Date | null) {
  if (!expirationDate) {
    return null;
  }

  const monthAsNumber = expirationDate.getMonth() + 1;
  const monthAsString =
    monthAsNumber < 10 ? `0${monthAsNumber}` : monthAsNumber;

  return `${monthAsString}/${expirationDate.getFullYear()}`;
}
