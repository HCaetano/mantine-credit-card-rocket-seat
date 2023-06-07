import { CreditCard } from "../../components/CreditCard";

export type CreditCardDisplayType = {
  cardProps: {
    data: any;
    isGalleryPage?: boolean;
    shouldShowCardBack?: boolean;
  };
};

function CreditCardDisplay(props: CreditCardDisplayType) {
  return <CreditCard cardProps={props.cardProps} />;
}

export default CreditCardDisplay;
