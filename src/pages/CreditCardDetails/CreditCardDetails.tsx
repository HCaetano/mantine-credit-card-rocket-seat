import { useParams } from "react-router-dom";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";

function CreditCardDetails() {
  const { id } = useParams();
  const [cardData, setCardData] = useState<DocumentData | undefined>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "credit-cards", id);

      getDoc(docRef)
        .then((document) => {
          if (document.data()) {
            setCardData(document.data());
          }
          // else {
          //   setError("Document not found.");
          // }
        })
        .catch((error) => {
          // setError("Error getting document: " + error.message);
        });
    }
  }, [id]);

  // redirect to error page
  // set up a loader

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!cardData) {
  //   return <div>Loading...</div>;
  // }

  return <div>lolzies</div>;
}

export default CreditCardDetails;
