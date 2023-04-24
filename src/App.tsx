import { useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  TextInput,
} from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";
import { ThemeProvider } from "./config/ThemeProvider";
import { HiddenInformation } from "./styles";
import BackgroundBlur from "./assets/Background-blur.png";
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
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);

  const handleNameDisplay = (name: string) => {
    const nameHasNumbersInIt = /\d/.test(name);

    if (!name || nameHasNumbersInIt) {
      return "Seu nome aqui";
    }

    console.log(name.length);

    if (name.length > 20) {
      return name.slice(0, 20);
    }

    return name;
  };

  const handleTyping = debounce(function () {
    setShouldShowCardBack(false);
  }, 500);

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
                    placeholder="4716 8039 0211 9321"
                    {...formik.getFieldProps("cardNumber")}
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
                    placeholder="Nome como está no cartão"
                    {...formik.getFieldProps("name")}
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
                      onChange={(event) => {
                        const formattedNumber =
                          Number(event.target.value) < 10
                            ? `0${event.target.value}`
                            : event.target.value;

                        if (event.target.value.length === 2) {
                          formik.setFieldValue(
                            "expirationDate",
                            `${formattedNumber}/`
                          );
                          return;
                        }

                        formik.setFieldValue("expirationDate", formattedNumber);
                      }}
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
                      onBlur={(event) => {
                        formik.handleBlur(event);
                        handleTyping();
                      }}
                      onChange={(event) => {
                        setShouldShowCardBack(true);
                        formik.handleChange(event);
                      }}
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
                    backgroundImage: `url(${BackgroundBlur})`,
                    backgroundRepeat: "no-repeat",
                    border: `1px solid ${theme.colors.gray[7]}`,
                    borderRadius: "16px",
                    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.25)",
                    height: "fit-content",
                    padding: shouldShowCardBack ? "0" : "11px 24px",
                    width: "280px",
                  })}
                >
                  {shouldShowCardBack ? (
                    <Flex direction="column" h={169}>
                      <Box
                        sx={(theme) => ({
                          background: theme.colors.gray[9],
                          height: "32px",
                          marginTop: "16px",
                          width: "100%",
                        })}
                      />
                      <Flex align="center" m="46px auto 0">
                        <TextInput
                          rightSection={
                            formik.values.cardVerificationValue.length > 0
                              ? formik.values.cardVerificationValue
                              : "***"
                          }
                        />
                        <Text color="gray.2" ml={8}>
                          CVV
                        </Text>
                      </Flex>
                    </Flex>
                  ) : (
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
                          <HiddenInformation>
                            &#x2022; &#x2022;
                          </HiddenInformation>
                        </Text>
                        <Text
                          color="gray.0"
                          opacity={0.5}
                          size="md"
                          weight={600}
                        >
                          &#x2022; &#x2022; &#x2022; &#x2022;
                        </Text>
                      </Flex>
                      <Flex justify="space-between" mt={24}>
                        <Text color="gray.0" opacity={0.5} size="md">
                          {handleNameDisplay(formik.values.name)}
                        </Text>
                        <Text
                          color="gray.0"
                          opacity={0.5}
                          size="md"
                          weight={600}
                        >
                          &#x2022; &#x2022; / &#x2022; &#x2022;
                        </Text>
                      </Flex>
                    </Flex>
                  )}
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
