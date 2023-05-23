import { useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { Box, Button, Center, Flex, Image, Text } from "@mantine/core";
import { ThemeProvider } from "./config/ThemeProvider";
import BackgroundBlur from "./assets/Background-blur.png";
import SafetySymbol from "./assets/Safety-symbol.svg";
import { validationRules } from "./utils/validationRules";
import { CreditCardDisplay, CreditCardForm } from "./components";

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
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);
  const [datePickerTouched, setDatePickerTouched] = useState(false);

  const handleTouching = () => {
    setDatePickerTouched(true);
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
              <CreditCardForm
                formProps={{
                  datePickerTouched,
                  expirationDate,
                  formik,
                  handleTouching,
                  handleTyping,
                  setExpirationDate,
                  setShouldShowCardBack,
                }}
              />
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
                    cardProps={{
                      expirationDate,
                      formik,
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
              mt={48}
              onClick={() => handleTouching()}
              p={16}
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
