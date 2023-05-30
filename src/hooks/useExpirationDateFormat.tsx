import { useState } from "react";

export function useExpirationDateFormat() {
  const [expirationDate, setExpirationDateFormatted] = useState<string>();

  const setExpirationDate = (expirationDate: Date | null) => {
    if (!expirationDate) {
      return null;
    }

    const monthAsNumber = expirationDate.getMonth() + 1;
    const monthAsString =
      monthAsNumber < 10 ? `0${monthAsNumber}` : monthAsNumber;

    setExpirationDateFormatted(
      `${monthAsString}/${expirationDate.getFullYear()}`
    );
  };

  return [expirationDate, setExpirationDate];
}
