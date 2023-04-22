import { useFormik } from "formik";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
} from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";
import { ThemeProvider } from "./config/ThemeProvider";
import { HiddenInformation } from "./styles";
import ContactlessPayment from "./assets/Contactless-payment.svg";
import SafetySymbol from "./assets/Safety-symbol.svg";
import VisaLogo from "./assets/Visa.svg";
import { TextInputCustom } from "./components";
import { validationRules } from "./utils/validationRules";

export default function App() {
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardVerificationValue: "",
      expirationDate: "",
      name: "",
    },
    validationSchema: validationRules,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <ThemeProvider>
      <Center
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[9],
          height: "100vh",
        })}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[8],
            padding: 32,
            width: 720,
          })}
        >
          <form onSubmit={formik.handleSubmit}>
            <Flex gap={64}>
              <Flex direction="column" gap="xl" maw={328}>
                <Flex direction="column">
                  <Text color="gray" size="sm" weight={500}>
                    Número do cartão
                  </Text>
                  <TextInputCustom
                    name="cardNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="4716 8039 0211 9321"
                    value={formik.values.cardNumber}
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber && (
                    <Text color="red.0" size="sm">
                      {formik.errors.cardNumber}
                    </Text>
                  )}
                </Flex>
                <Flex direction="column">
                  <Text color="gray" size="sm" weight={500}>
                    Nome do titular
                  </Text>
                  <TextInputCustom
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Nome como está no cartão"
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Text color="red.0" size="sm">
                      {formik.errors.name}
                    </Text>
                  )}
                </Flex>
                <Flex gap="md">
                  <Flex direction="column" maw={182}>
                    <Text color="gray" size="sm" weight={500}>
                      Validade
                    </Text>
                    <TextInputCustom
                      name="expirationDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="mm/aa"
                      value={formik.values.expirationDate}
                    />
                    {formik.touched.expirationDate &&
                      formik.errors.expirationDate && (
                        <Text color="red.0" size="sm">
                          {formik.errors.expirationDate}
                        </Text>
                      )}
                  </Flex>
                  <Flex direction="column" maw={130}>
                    <Flex gap="xs">
                      <Text color="gray" size="sm" weight={500}>
                        CVV
                      </Text>
                      <ActionIcon
                        color="gray.3"
                        radius="xl"
                        size="xs"
                        variant="filled"
                      >
                        <IconQuestionMark color="black" />
                      </ActionIcon>
                    </Flex>
                    <TextInputCustom
                      name="cardVerificationValue"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="***"
                      value={formik.values.cardVerificationValue}
                    />
                    {formik.touched.cardVerificationValue &&
                      formik.errors.cardVerificationValue && (
                        <Text color="red.0" size="sm">
                          {formik.errors.cardVerificationValue}
                        </Text>
                      )}
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column" gap={34}>
                <Box
                  sx={(theme) => ({
                    background: theme.colors.gray[9],
                    border: `1px solid ${theme.colors.gray[7]}`,
                    borderRadius: "16px",
                    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.25)",
                    height: "fit-content",
                    padding: "24px",
                    width: "280px",
                  })}
                >
                  <Flex direction="column">
                    <Flex align="center" justify="space-between">
                      <Box
                        sx={() => ({
                          width: "32px",
                        })}
                      >
                        <Image alt="Visa logo" src={VisaLogo} />
                      </Box>
                      <Box
                        sx={() => ({
                          width: "32px",
                        })}
                      >
                        <Image
                          alt="Contactless Payment symbol"
                          src={ContactlessPayment}
                        />
                      </Box>
                    </Flex>
                    <Flex justify="space-between" mt={40}>
                      <Text color="gray.0" size="md" weight={600}>
                        4 7 1 6
                      </Text>
                      <Text color="gray.0" size="md" weight={600}>
                        8 0 3 9
                      </Text>
                      <Text color="gray.0" size="md" weight={600}>
                        0 2{" "}
                        <HiddenInformation>&#x2022; &#x2022;</HiddenInformation>
                      </Text>
                      <Text color="gray.0" opacity={0.5} size="md" weight={600}>
                        &#x2022; &#x2022; &#x2022; &#x2022;
                      </Text>
                    </Flex>
                    <Flex justify="space-between" mt={24}>
                      <Text color="gray.0" opacity={0.5} size="md">
                        Seu nome aqui
                      </Text>
                      <Text color="gray.0" opacity={0.5} size="md" weight={600}>
                        &#x2022; &#x2022; / &#x2022; &#x2022;
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
                <Flex align="center" gap={8} m="0 auto">
                  <Image height={15} src={SafetySymbol} width={15} />
                  <Text color="gray.2">Seus dados estão seguros</Text>
                </Flex>
              </Flex>
            </Flex>
            <Button
              color="purple.0"
              fullWidth
              p={16}
              mt={48}
              styles={(theme) => ({
                root: {
                  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                  color: theme.colors.gray[0],
                  height: "auto",

                  "&:disabled": {
                    backgroundColor: theme.colors.purple[0],
                    color: theme.colors.gray[0],
                    opacity: 0.5,
                  },

                  "&:focus": {
                    border: `2px solid ${theme.colors.gray[0]}`,
                  },

                  "&:hover": {
                    backgroundColor: theme.colors.purple[1],
                  },
                },
              })}
              type="submit"
            >
              <Text size="lg">Adicionar cartão</Text>
            </Button>
          </form>
        </Box>
      </Center>
    </ThemeProvider>
  );
}
