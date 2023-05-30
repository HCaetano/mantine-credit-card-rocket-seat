import * as Yup from "yup";

const requiredFieldText = "Campo obrigatório";

export const validationRules = Yup.object({
  cardNumber: Yup.string()
    .matches(/^-?\d*\.?\d*$/, "Digite somente números")
    .length(16, "Número deve ter 16 dígitos")
    .required(requiredFieldText),
  cardVerificationValue: Yup.string()
    .length(3, "Três números")
    .required(requiredFieldText),
  name: Yup.string()
    .matches(/^([a-zA-Zà-úÀ-Ú]|-|\s)+$/, "Digite somente letras")
    .min(10, "Nome deve ter 10 dígitos ou mais")
    .required(requiredFieldText),
});
