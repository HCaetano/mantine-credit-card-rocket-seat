import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, DocumentData, getDoc } from "firebase/firestore";
import { Button, Center, Flex, Loader, Stack } from "@mantine/core";
import { db } from "../../config/firebase";
import { CreditCard } from "../../components";
import toast, { Toaster } from "react-hot-toast";

function CreditCardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<DocumentData | undefined>();
  const [shouldShowCardBack, setShouldShowCardBack] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "credit-cards", id);

      getDoc(docRef)
        .then((document) => {
          console.log(document.data());

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
        toast.success("Você voltará para a lista de cartões.");
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
    <Flex bg="gray.9" direction="column" mih="100vh" p={40}>
      <Center h={600} w="100%">
        <CreditCard
          name={cardData.name}
          cardNumber={cardData.cardNumber}
          cardVerificationValue={cardData.cardVerificationValue}
          expirationDate={cardData.expirationDate}
          shouldShowCardBack={shouldShowCardBack}
        />
        <Stack>
          <Button onClick={handleCardFlip}>Virar cartão</Button>
          <Button onClick={handleDelete}>Remover</Button>
        </Stack>
      </Center>
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
  );
}

export default CreditCardDetails;
