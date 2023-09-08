import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

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

  // if (!cardData) {
  //   return <div>Loading...</div>;
  // }

  return <div>lolzies</div>;
}

export default CreditCardDetails;
