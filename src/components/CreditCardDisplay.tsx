import ReactCardFlip from "react-card-flip";
import { Box, Flex, Image, Text, TextInput } from "@mantine/core";
import ContactlessPayment from "../assets/Contactless-payment.svg";
import VisaLogo from "../assets/Visa.svg";
import { HiddenInformation } from "./styles";

type CreditCardDisplayType = {
  cardData: {
    expirationDate: Date | null;
    formik: any;
    handleCardNumberDisplay: (cardNumber: string) => string | null;
    handleExpirationDateDisplay: (expirationDate: Date | null) => string | null;
    handleNameDisplay: (name: string) => string;
    shouldShowCardBack: boolean;
  };
};

function CreditCardDisplay(props: CreditCardDisplayType) {
  const {
    expirationDate,
    formik,
    handleCardNumberDisplay,
    handleExpirationDateDisplay,
    handleNameDisplay,
    shouldShowCardBack,
  } = props.cardData;

  return (
    <ReactCardFlip isFlipped={shouldShowCardBack} flipDirection="horizontal">
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Box
            sx={() => ({
              width: "32px",
            })}
          >
            <Image alt="Visa logo" src={VisaLogo} />
          </Box>
          <Box
            sx={() => ({
              width: "32px",
            })}
          >
            <Image alt="Contactless Payment symbol" src={ContactlessPayment} />
          </Box>
        </Flex>
        <Flex justify="space-between" mt={40}>
          <Text color="gray.0" size="md" weight={600}>
            {formik.values.cardNumber.length > 0 ? (
              handleCardNumberDisplay(formik.values.cardNumber.slice(0, 4))
            ) : (
              <HiddenInformation>
                &#x2022; &#x2022; &#x2022; &#x2022;
              </HiddenInformation>
            )}
          </Text>
          <Text color="gray.0" size="md" weight={600}>
            {formik.values.cardNumber.length > 4 ? (
              handleCardNumberDisplay(formik.values.cardNumber.slice(4, 8))
            ) : (
              <HiddenInformation>
                &#x2022; &#x2022; &#x2022; &#x2022;
              </HiddenInformation>
            )}
          </Text>
          <Text color="gray.0" size="md" weight={600}>
            {formik.values.cardNumber.length > 8 ? (
              handleCardNumberDisplay(formik.values.cardNumber.slice(8, 12))
            ) : (
              <HiddenInformation>
                &#x2022; &#x2022; &#x2022; &#x2022;
              </HiddenInformation>
            )}
          </Text>
          <Text
            color="gray.0"
            // TODO: it's possible to avoid using HiddenInformation if we add this prop -> opacity={0.5}
            size="md"
            weight={600}
          >
            {formik.values.cardNumber.length > 12 ? (
              handleCardNumberDisplay(formik.values.cardNumber.slice(12, 16))
            ) : (
              <HiddenInformation>
                &#x2022; &#x2022; &#x2022; &#x2022;
              </HiddenInformation>
            )}
          </Text>
        </Flex>
        <Flex justify="space-between" mt={24}>
          <Text color="gray.0" opacity={0.5} size="md">
            {handleNameDisplay(formik.values.name)}
          </Text>
          <Text color="gray.0" opacity={0.5} size="md" weight={600}>
            {handleExpirationDateDisplay(expirationDate) ? (
              handleExpirationDateDisplay(expirationDate)
            ) : (
              <HiddenInformation>
                &#x2022; &#x2022;/&#x2022; &#x2022;
              </HiddenInformation>
            )}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" h={169}>
        <Box
          sx={(theme) => ({
            background: theme.colors.gray[9],
            height: "32px",
            marginTop: "16px",
            width: "100%",
          })}
        />
        <Flex align="center" m="46px auto 0">
          <TextInput
            rightSection={
              formik.values.cardVerificationValue.length > 0
                ? formik.values.cardVerificationValue.substring(0, 3)
                : "***"
            }
          />
          <Text color="gray.2" ml={8}>
            CVV
          </Text>
        </Flex>
      </Flex>
    </ReactCardFlip>
  );
}

export default CreditCardDisplay;
