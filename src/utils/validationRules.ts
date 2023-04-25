import * as Yup from "yup";

const requiredFieldText = "Campo obrigatário";

export const validationRules = Yup.object({
  cardNumber: Yup.string()
    .matches(/[0-9]/, "Digite somente números")
    .length(12, "Número deve ter 12 dígitos")
    .required(requiredFieldText),
  cardVerificationValue: Yup.string()
    .length(3, "Três números")
    .required(requiredFieldText),
  // TODO: expirationDate doesn't have a validation rule
  name: Yup.string()
    .matches(/^([a-zA-Zà-úÀ-Ú]|-|\s)+$/, "Digite somente letras")
    .min(10, "Nome deve ter 10 dígitos ou mais")
    .required(requiredFieldText),
});
