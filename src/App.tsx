import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { Anchor, Box, Button, Center, Flex, Image, Text } from "@mantine/core";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import { CreditCardForm } from "./pages";
import CreditCard from "./components/CreditCard/CreditCard";
import { db } from "./config/firebase";
import { ThemeProvider } from "./config/ThemeProvider";
import { validationRules } from "./utils/validationRules";
import { handleExpirationDateDisplay } from "./utils/handleExpirationDateDisplay";
import SafetySymbol from "./assets/Safety-symbol.svg";

export default function App() {
  const creditCardsCollection = collection(db, "credit-cards");
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardVerificationValue: "",
      name: "",
    },
    validationSchema: validationRules,
    onSubmit: async (values) => {
      await addDoc(creditCardsCollection, {
        cardNumber: values.cardNumber,
        cardVerificationValue: values.cardVerificationValue,
        expirationDate: handleExpirationDateDisplay(expirationDate),
        name: values.name,
      });
    },
  });
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);
  const [datePickerTouched, setDatePickerTouched] = useState(false);
  const [creditCards, setCreditCards] = useState<DocumentData[]>([]);

  const handleTouching = () => {
    setDatePickerTouched(true);
  };

  const handleTyping = debounce(function () {
    setShouldShowCardBack(false);
  }, 500);

  const getCards = async () => {
    const cards = await getDocs(creditCardsCollection);
    const cardsList = cards.docs.map((doc) => doc.data());
    setCreditCards(cardsList);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <ThemeProvider>
      <Center
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[9],
          display: "flex",
          flexDirection: "column",
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
              <Flex direction="column" gap={34} w={280}>
                <CreditCard
                  cardProps={{
                    data: {
                      name: formik.values.name,
                      cardNumber: formik.values.cardNumber,
                      cardVerificationValue:
                        formik.values.cardVerificationValue,
                      expirationDate,
                    },
                    shouldShowCardBack,
                  }}
                />
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
        <Flex
          sx={() => ({
            alignItems: "end",
            height: 40,
          })}
        >
          {creditCards.length > 0 && (
            <Anchor color="purple.2" href="/cards" type="button">
              Confira seus cartões
            </Anchor>
          )}
        </Flex>
      </Center>
    </ThemeProvider>
  );
}
