import * as Yup from "yup";

const requiredFieldText = "Campo obrigatório";

export const validationRules = Yup.object({
  cardNumber: Yup.string()
    .matches(/^[0-9]+$/, "Digite somente números")
    .length(16, "Número deve ter 16 dígitos")
    .required(requiredFieldText),
  cardVerificationValue: Yup.string()
    .length(3, "Três números")
    .matches(/^[0-9]+$/, "Digite somente números")
    .required(requiredFieldText),
  name: Yup.string()
    .trim()
    .min(10, "Nome deve ter 10 dígitos ou mais")
    .matches(/^([a-zA-Zà-úÀ-Ú]|-|\s)+$/, "Digite somente letras")
    .required(requiredFieldText),
});
