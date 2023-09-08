import ReactCardFlip from "react-card-flip";
import { Box, Flex, Image, Text, TextInput } from "@mantine/core";
import { handleDateFormat } from "../../utils";
import BackgroundBlur from "../../assets/Background-blur.png";
import ContactlessPayment from "../../assets/Contactless-payment.svg";
import VisaLogo from "../../assets/Visa.svg";

export type CreditCardType = {
  cardNumber: string;
  cardVerificationValue: string;
  expirationDate: Date | null;
  name: string;
  shouldShowCardBack?: boolean;
};

const handleCardNumberDisplay = (cardNumber: string) => {
  const isNumeric = /^-?\d+$/.test(cardNumber);

  if (!cardNumber || !isNumeric) {
    return null;
  }

  return cardNumber.split("").join(" ");
};

const handleDateDisplay = (expirationDate: Date | null) => {
  if (expirationDate && typeof expirationDate === "string") {
    return expirationDate;
  }

  if (expirationDate) {
    return handleDateFormat(expirationDate);
  }

  return <>&#x2022; &#x2022;/&#x2022; &#x2022;</>;
};

const handleNameDisplay = (name: string) => {
  const nameHasNumbersInIt = /\d/.test(name);

  if (!name || nameHasNumbersInIt) {
    return "Seu nome aqui";
  }

  if (name.length > 20) {
    return name.slice(0, 20);
  }

  return name;
};

function CreditCard(props: CreditCardType) {
  const {
    cardNumber,
    cardVerificationValue,
    expirationDate,
    name,
    shouldShowCardBack,
  } = props;

  return (
    <Box
      sx={(theme) => ({
        backgroundImage: `url(${BackgroundBlur})`,
        backgroundRepeat: "no-repeat",
        border: `1px solid ${theme.colors.gray[7]}`,
        borderRadius: 16,
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.25)",
        height: "fit-content",
        padding: shouldShowCardBack ? "0" : "11px 24px",
        width: 280,
      })}
    >
      <ReactCardFlip isFlipped={shouldShowCardBack} flipDirection="horizontal">
        <Flex direction="column">
          <Flex align="center" justify="space-between">
            <Box
              sx={() => ({
                width: 32,
              })}
            >
              <Image alt="Visa logo" src={VisaLogo} />
            </Box>
            <Box
              sx={() => ({
                width: 32,
              })}
            >
              <Image
                alt="Contactless Payment symbol"
                src={ContactlessPayment}
              />
            </Box>
          </Flex>
          <Flex justify="space-between" mt={40}>
            <Text color="gray.0" opacity={0.5} size="md" weight={600}>
              {cardNumber?.length > 0 ? (
                handleCardNumberDisplay(cardNumber?.slice(0, 4))
              ) : (
                <>&#x2022; &#x2022; &#x2022; &#x2022;</>
              )}
            </Text>
            <Text color="gray.0" opacity={0.5} size="md" weight={600}>
              {cardNumber?.length > 4 ? (
                handleCardNumberDisplay(cardNumber?.slice(4, 8))
              ) : (
                <>&#x2022; &#x2022; &#x2022; &#x2022;</>
              )}
            </Text>
            <Text color="gray.0" opacity={0.5} size="md" weight={600}>
              {cardNumber?.length > 8 ? (
                handleCardNumberDisplay(cardNumber?.slice(8, 12))
              ) : (
                <>&#x2022; &#x2022; &#x2022; &#x2022;</>
              )}
            </Text>
            <Text color="gray.0" opacity={0.5} size="md" weight={600}>
              {cardNumber?.length > 12 ? (
                handleCardNumberDisplay(cardNumber?.slice(12, 16))
              ) : (
                <>&#x2022; &#x2022; &#x2022; &#x2022;</>
              )}
            </Text>
          </Flex>
          <Flex justify="space-between" mt={24}>
            <Text color="gray.0" opacity={0.5} size="md">
              {handleNameDisplay(name)}
            </Text>
            <Text color="gray.0" opacity={0.5} size="md" weight={600}>
              {handleDateDisplay(expirationDate)}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" h={169}>
          <Box
            sx={(theme) => ({
              background: theme.colors.gray[9],
              height: 32,
              marginTop: 16,
              width: "100%",
            })}
          />
          <Flex align="center" m="46px auto 0">
            <TextInput
              rightSection={
                cardVerificationValue?.length > 0
                  ? cardVerificationValue?.substring(0, 3)
                  : "***"
              }
            />
            <Text color="gray.2" ml={8}>
              CVV
            </Text>
          </Flex>
        </Flex>
      </ReactCardFlip>
    </Box>
  );
}

export default CreditCard;
