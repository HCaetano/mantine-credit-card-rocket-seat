import * as Yup from "yup";

export const validationRules = Yup.object({
  cardNumber: Yup.string()
    .matches(/[0-9]/, "Digite somente números")
    .length(12, "Número deve ter 12 dígitos")
    .required("Campo obrigatório"),
  cardVerificationValue: Yup.string()
    .length(3, "Três números")
    .required("Campo obrigatório"),
  expirationDate: Yup.string()
    .matches(
      /^(1[0-2]|0[1-9]|[1-9])\/(20\d{2}|0(?!0)\d|[1-9]\d)$/,
      "Formato mm/aaaa"
    )
    .required("Campo obrigatório"),
  name: Yup.string()
    .matches(/^([a-zA-Zà-úÀ-Ú]|-|\s)+$/, "Digite somente letras")
    .min(10, "Nome deve ter 10 dígitos ou mais")
    .required("Campo obrigatório"),
});
