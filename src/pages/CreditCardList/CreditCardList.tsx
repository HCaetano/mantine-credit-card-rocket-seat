import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Flex } from "@mantine/core";
import CreditCardDisplay from "../../components/CreditCard/CreditCard";
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
    <Flex>
      {creditCards.length > 0 &&
        creditCards.map((card) => (
          <Flex direction="column" w={280}>
            <CreditCardDisplay
              cardProps={{
                data: {
                  name: card.name,
                  cardNumber: card.cardNumber,
                  cardVerificationValue: card.cardVerificationValue,
                  expirationDate: card.expirationDate,
                },
                isGalleryPage: true,
              }}
            />
          </Flex>
        ))}
    </Flex>
  );
}

export default CreditCardList;
