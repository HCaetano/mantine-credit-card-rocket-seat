import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Box, Button, Flex, Group } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <Flex bg="gray.9" direction="column" h="100vh" p={40}>
        <Button
          color="purple.2"
          component="a"
          href="/"
          leftIcon={<IconArrowBack size="0.9rem" />}
          maw={100}
          mb={20}
          variant="outline"
        >
          Voltar
        </Button>
        <Group m="0 auto">
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
      </Flex>
    </ThemeProvider>
  );
}

export default CreditCardList;
