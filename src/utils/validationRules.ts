import * as Yup from "yup";
import { TestFunction, ValidationError } from "yup";

export const validationRules = Yup.object({
  cardNumber: Yup.string()
    .matches(/[0-9]/, "Digite somente números")
    .length(12, "Número deve ter 12 dígitos")
    .required("Campo obrigatório"),
  cardVerificationValue: Yup.string()
    .length(3, "Três números")
    .required("Campo obrigatório"),
  expirationDate: Yup.string()
    .test(
      "checks validity of month input value",
      "Mês entre 1 e 12",
      (
        value: string | undefined
      ):
        | boolean
        | void
        | ValidationError
        | Promise<boolean | ValidationError> => {
        if (!value) return false;

        const [month] = value.split("/");
        const monthAsNumber = Number(month);
        const isValidMonth = 1 <= monthAsNumber && monthAsNumber <= 12;

        return isValidMonth;
      }
    )
    .test(
      "checks validity of year input value",
      "Ano entre 23 e 29",
      (
        value: string | undefined
      ):
        | boolean
        | void
        | ValidationError
        | Promise<boolean | ValidationError> => {
        if (!value) return false;
        const [, year] = value.split("/");
        const yearAsNumber = Number(year);
        const isValidYear = 23 <= yearAsNumber && yearAsNumber <= 29;

        return isValidYear;
      }
    )
    .required("Campo obrigatório"),
  name: Yup.string()
    .matches(/^([a-zA-Zà-úÀ-Ú]|-|\s)+$/, "Digite somente letras")
    .min(10, "Nome deve ter 10 dígitos ou mais")
    .required("Campo obrigatório"),
});
