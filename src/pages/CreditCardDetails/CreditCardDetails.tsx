import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, DocumentData, getDoc } from "firebase/firestore";
import {
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { db } from "../../config/firebase";
import { CreditCard } from "../../components";
import toast, { Toaster } from "react-hot-toast";

function CreditCardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<DocumentData | undefined>();
  const [error, setError] = useState(false);
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "credit-cards", id);

      getDoc(docRef)
        .then((document) => {
          if (document.data()) {
            setCardData(document.data());
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [id]);

  const handleCardFlip = () => {
    setShouldShowCardBack(!shouldShowCardBack);
  };

  const handleDelete = async () => {
    const creditCard = doc(db, "credit-cards", id ?? "");
    await deleteDoc(creditCard)
      .then(() => {
        toast.success("Cartão de crédito removido.");
        toast(() => (
          <>
            <Text mr={8}>Você voltará para a lista de cartões.</Text>
            <IconArrowBack size={20} />
          </>
        ));
        setTimeout(() => {
          navigate("/cards");
        }, 3000);
      })
      .catch(() => {
        toast.error("Erro ao remover cartão de crédito.");
      });
  };

  if (error) {
    navigate("/error");
  }

  if (!cardData) {
    return (
      <Flex bg="gray.9" direction="column" mih="100vh" p={40}>
        <Center h={600} w="100%">
          <Loader m="0 auto" />
        </Center>
      </Flex>
    );
  }

  return (
    <Flex
      bg="gray.9"
      direction="column"
      gap={{ base: 32, md: 0 }}
      h="100vh"
      p={{ base: 16, md: 32 }}
    >
      <Group
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          color="purple.2"
          component="a"
          href="/cards"
          leftIcon={<IconArrowBack size="0.9rem" />}
          w={110}
          h={40}
          variant="outline"
        >
          Galeria
        </Button>
        <Button
          color="purple.2"
          component="a"
          href="/"
          leftIcon={<IconArrowBack size="0.9rem" />}
          w={110}
          h={40}
          variant="outline"
        >
          Início
        </Button>
      </Group>
      <Flex align="center" justify="center" h={{ md: "100%" }}>
        <Flex direction={{ base: "column", md: "row" }} gap={24}>
          <CreditCard
            name={cardData.name}
            cardNumber={cardData.cardNumber}
            cardVerificationValue={cardData.cardVerificationValue}
            expirationDate={cardData.expirationDate}
            shouldShowCardBack={shouldShowCardBack}
          />
          <Stack justify="center">
            <Button color="purple.0" onClick={handleCardFlip}>
              Virar cartão
            </Button>
            <Button color="purple.0" onClick={handleDelete}>
              Remover
            </Button>
          </Stack>
        </Flex>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            duration: 2500,
            style: {
              background: "#9333EA",
              color: "#fff",
            },
          }}
        />
      </Flex>
    </Flex>
  );
}

export default CreditCardDetails;
