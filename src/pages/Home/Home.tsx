import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import toast, { Toaster } from "react-hot-toast";
import { Anchor, Box, Button, Center, Flex, Image, Text } from "@mantine/core";
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  query,
  Query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { CreditCard } from "../../components";
import { CreditCardForm } from "../CreditCardForm";
import { validationRules, handleDateFormat } from "../../utils";
import SafetySymbol from "../../assets/Safety-symbol.svg";

function Home() {
  const creditCardsCollectionRef = collection(db, "credit-cards");
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardVerificationValue: "",
      name: "",
    },
    validationSchema: validationRules,
    onSubmit: async (values, { resetForm }) => {
      const fieldName = "cardNumber";
      const targetValue = values.cardNumber;
      const queryResult = query(
        creditCardsCollectionRef,
        where(fieldName, "==", targetValue)
      );
      const querySnapshot = await getDocs(queryResult);
      const fetchedCardNumber = querySnapshot.docs[0]?.data().cardNumber;

      if (targetValue !== fetchedCardNumber) {
        await addDoc(creditCardsCollectionRef, {
          cardNumber: values.cardNumber,
          cardVerificationValue: values.cardVerificationValue,
          expirationDate: handleDateFormat(expirationDate),
          name: values.name.trim(),
        })
          .then(() => {
            setExpirationDate(null);
            setDatePickerTouched(false);
            resetForm();
            toast.success("Cartão de crédito salvo.");
          })
          .catch(() => {
            toast.error("Erro ao salvar cartão de crédito.");
          });
      } else {
        toast.error("Já existe um cartão de crédito com este número.");
      }
    },
  });

  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);
  const [datePickerTouched, setDatePickerTouched] = useState(false);
  const [collectionSize, setCollectionSize] = useState(0);

  const handleTouching = () => {
    setDatePickerTouched(true);
  };

  const handleTyping = debounce(function () {
    setShouldShowCardBack(false);
  }, 500);

  const getCollectionCount = async (collection: Query<unknown>) => {
    const snapshot = await getCountFromServer(collection);
    setCollectionSize(snapshot.data().count);
  };

  useEffect(() => {
    getCollectionCount(creditCardsCollectionRef);
  }, [creditCardsCollectionRef]);

  return (
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
              datePickerTouched={datePickerTouched}
              expirationDate={expirationDate}
              formik={formik}
              handleTouching={handleTouching}
              handleTyping={handleTyping}
              setExpirationDate={setExpirationDate}
              setShouldShowCardBack={setShouldShowCardBack}
            />
            <Flex direction="column" gap={34} w={280}>
              <CreditCard
                name={formik.values.name}
                cardNumber={formik.values.cardNumber}
                cardVerificationValue={formik.values.cardVerificationValue}
                expirationDate={expirationDate}
                shouldShowCardBack={shouldShowCardBack}
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
        {collectionSize > 0 && (
          <Anchor color="purple.2" href="/cards" type="button">
            Confira seus cartões
          </Anchor>
        )}
      </Flex>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#9333EA",
            color: "#fff",
          },
        }}
      />
    </Center>
  );
}

export default Home;
