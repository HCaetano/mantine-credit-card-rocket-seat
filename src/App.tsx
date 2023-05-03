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
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconQuestionMark } from "@tabler/icons-react";
import { ThemeProvider } from "./config/ThemeProvider";
import BackgroundBlur from "./assets/Background-blur.png";
import SafetySymbol from "./assets/Safety-symbol.svg";
import { TextInputCustom } from "./components";
import { validationRules } from "./utils/validationRules";
import CreditCardDisplay from "./components/CreditCardDisplay";

export default function App() {
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardVerificationValue: "",
      name: "",
    },
    validationSchema: validationRules,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const handleCardNumberDisplay = (cardNumber: string) => {
    const isNumeric = /^-?\d+$/.test(cardNumber);

    if (!cardNumber || !isNumeric) {
      return null;
    }

    return cardNumber.split("").join(" ");
  };

  const handleExpirationDateDisplay = (expirationDate: Date | null) => {
    if (!expirationDate) {
      return null;
    }

    const monthAsNumber = expirationDate.getMonth() + 1;
    const monthAsString =
      monthAsNumber < 10 ? `0${monthAsNumber}` : monthAsNumber;

    return `${monthAsString}/${expirationDate.getFullYear()}`;
  };

  const handleNameDisplay = (name: string) => {
    const nameHasNumbersInIt = /\d/.test(name);

    if (!name || nameHasNumbersInIt) {
      return "Seu nome aqui";
    }

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
                  <Flex direction="column" w={70}>
                    <Text color="gray" size="sm" weight={500}>
                      Validade
                    </Text>
                    <DatePickerInput
                      minDate={new Date()}
                      onChange={setExpirationDate}
                      placeholder="mm/aa"
                      value={expirationDate}
                      valueFormat="MM/YY"
                      styles={(theme) => ({
                        input: {
                          backgroundColor: theme.colors.gray[9],
                          color: theme.colors.gray[1],
                          width: "100%",

                          "&:focus": {
                            border: `1.5px solid ${theme.colors.purple[0]}`,
                          },

                          "&:hover": {
                            border: `1.5px solid ${theme.colors.gray[6]}`,
                          },

                          "&::placeholder": {
                            // TODO: placeholder doesn't have the same color as other inputs
                            color: theme.colors.purple[3],
                          },
                        },
                      })}
                    />
                    {/* TODO: date input doesn't have error handling
                       <Text color="red.0" size="sm">
                        erro
                      </Text> */}
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
                  <CreditCardDisplay
                    cardData={{
                      expirationDate,
                      formik,
                      handleCardNumberDisplay,
                      handleExpirationDateDisplay,
                      handleNameDisplay,
                      shouldShowCardBack,
                    }}
                  />
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
