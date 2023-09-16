import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Anchor, Button, Center, Flex, Group, Loader } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { CreditCard } from "../../components";
import { db } from "../../config/firebase";

function CreditCardList() {
  const creditCardsCollection = collection(db, "credit-cards");
  const [creditCards, setCreditCards] = useState<DocumentData[]>([]);

  const getCards = async () => {
    const cards = await getDocs(creditCardsCollection);
    const cardsList = cards.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;

      return {
        ...data,
        id,
      };
    });
    setCreditCards(cardsList);
  };

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex bg="gray.9" direction="column" mih="100vh" p={{ base: 16, md: 32 }}>
      <Button
        color="purple.2"
        component="a"
        h={40}
        href="/"
        leftIcon={<IconArrowBack size="0.9rem" />}
        mb={20}
        variant="outline"
        w={110}
      >
        Voltar
      </Button>
      <Group>
        {creditCards?.length > 0 ? (
          creditCards.map((card) => (
            <Anchor
              href={`/card/${card.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <CreditCard
                name={card.name}
                cardNumber={card.cardNumber}
                cardVerificationValue={card.cardVerificationValue}
                expirationDate={card.expirationDate}
              />
            </Anchor>
          ))
        ) : (
          <Center h={600} w="100%">
            <Loader m="0 auto" />
          </Center>
        )}
      </Group>
    </Flex>
  );
}

export default CreditCardList;
