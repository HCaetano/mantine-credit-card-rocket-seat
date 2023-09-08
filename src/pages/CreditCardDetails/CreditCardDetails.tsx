import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Center, Flex, Loader } from "@mantine/core";
import { db } from "../../config/firebase";
import { CreditCard } from "../../components";

function CreditCardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<DocumentData | undefined>();
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
        />
      </Center>
    </Flex>
  );
}

export default CreditCardDetails;
