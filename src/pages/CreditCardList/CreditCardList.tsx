import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

function CreditCardList() {
  const creditCardsCollection = collection(db, "credit-cards");
  const [creditCards, setCreditCards] = useState<DocumentData[]>([]);

  console.log(creditCards);

  const getCards = async () => {
    const cards = await getDocs(creditCardsCollection);
    const cardsList = cards.docs.map((doc) => doc.data());
    setCreditCards(cardsList);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      {creditCards.length > 0 &&
        creditCards.map((card) => (
          <div key={card.cardNumber}>
            <div>{card.name}</div>
            <div>{card.cardNumber}</div>
            <div>{card.cardVerificationValue}</div>
            <div>{card.expirationDate}</div>
          </div>
        ))}
    </>
  );
}

export default CreditCardList;
