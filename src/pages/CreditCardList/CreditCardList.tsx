import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Flex } from "@mantine/core";
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
      <Flex bg="gray.9" h="100vh" wrap="wrap">
        {creditCards.length > 0 &&
          creditCards.map((card) => (
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
          ))}
      </Flex>
    </ThemeProvider>
  );
}

export default CreditCardList;
