import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Box, Group } from "@mantine/core";
import CreditCard from "../../components/CreditCard/CreditCard";
import { ThemeProvider } from "../../config/ThemeProvider";
import { db } from "../../config/firebase";

function CreditCardList() {
  const creditCardsCollection = collection(db, "credit-cards");
  const [creditCards, setCreditCards] = useState<DocumentData[]>([]);

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
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[9],
          display: "flex",
          height: "100vh",
        })}
      >
        <Group m="0 auto" p={40}>
          {creditCards.length > 0 &&
            creditCards.map((card) => (
              <Box m="0 auto">
                <CreditCard
                  cardProps={{
                    data: {
                      name: card.name,
                      cardNumber: card.cardNumber,
                      cardVerificationValue: card.cardVerificationValue,
                      expirationDate: card.expirationDate,
                    },
                  }}
                />
              </Box>
            ))}
        </Group>
      </Box>
    </ThemeProvider>
  );
}

export default CreditCardList;
