import { useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import ReactCardFlip from "react-card-flip";
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
import { DatePickerInput } from "@mantine/dates";
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
                  <ReactCardFlip
                    isFlipped={shouldShowCardBack}
                    flipDirection="horizontal"
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
                          {formik.values.cardNumber.length > 0 ? (
                            handleCardNumberDisplay(
                              formik.values.cardNumber.slice(0, 4)
                            )
                          ) : (
                            <HiddenInformation>
                              &#x2022; &#x2022; &#x2022; &#x2022;
                            </HiddenInformation>
                          )}
                        </Text>
                        <Text color="gray.0" size="md" weight={600}>
                          {formik.values.cardNumber.length > 4 ? (
                            handleCardNumberDisplay(
                              formik.values.cardNumber.slice(4, 8)
                            )
                          ) : (
                            <HiddenInformation>
                              &#x2022; &#x2022; &#x2022; &#x2022;
                            </HiddenInformation>
                          )}
                        </Text>
                        <Text color="gray.0" size="md" weight={600}>
                          {formik.values.cardNumber.length > 8 ? (
                            handleCardNumberDisplay(
                              formik.values.cardNumber.slice(8, 12)
                            )
                          ) : (
                            <HiddenInformation>
                              &#x2022; &#x2022; &#x2022; &#x2022;
                            </HiddenInformation>
                          )}
                        </Text>
                        <Text
                          color="gray.0"
                          // TODO: it's possible to avoid using HiddenInformation if we add this prop -> opacity={0.5}
                          size="md"
                          weight={600}
                        >
                          {formik.values.cardNumber.length > 12 ? (
                            handleCardNumberDisplay(
                              formik.values.cardNumber.slice(12, 16)
                            )
                          ) : (
                            <HiddenInformation>
                              &#x2022; &#x2022; &#x2022; &#x2022;
                            </HiddenInformation>
                          )}
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
                          {handleExpirationDateDisplay(expirationDate) ? (
                            handleExpirationDateDisplay(expirationDate)
                          ) : (
                            <HiddenInformation>
                              &#x2022; &#x2022;/&#x2022; &#x2022;
                            </HiddenInformation>
                          )}
                        </Text>
                      </Flex>
                    </Flex>
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
                              ? formik.values.cardVerificationValue.substring(
                                  0,
                                  3
                                )
                              : "***"
                          }
                        />
                        <Text color="gray.2" ml={8}>
                          CVV
                        </Text>
                      </Flex>
                    </Flex>
                  </ReactCardFlip>
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
