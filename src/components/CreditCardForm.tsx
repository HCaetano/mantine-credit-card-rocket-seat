import { Dispatch, SetStateAction } from "react";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconQuestionMark } from "@tabler/icons-react";
import TextInputCustom from "./TextInputCustom";

type CreditCardFormType = {
  formProps: {
    datePickerTouched: boolean;
    expirationDate: Date | null;
    formik: any;
    handleTouching: () => void;
    handleTyping: () => void;
    setExpirationDate: Dispatch<SetStateAction<Date | null>>;
    setShouldShowCardBack: Dispatch<SetStateAction<boolean>>;
  };
};

function CreditCardForm(props: CreditCardFormType) {
  const {
    datePickerTouched,
    expirationDate,
    handleTouching,
    handleTyping,
    formik,
    setExpirationDate,
    setShouldShowCardBack,
  } = props.formProps;

  return (
    <Flex direction="column" gap="sm" maw={328}>
      <Flex direction="column">
        <Text color="gray" size="sm" weight={500}>
          Número do cartão
        </Text>
        <TextInputCustom
          placeholder="4716 8039 0211 9321"
          {...formik.getFieldProps("cardNumber")}
        />
        {/* {formik.touched.cardNumber && formik.errors.cardNumber && ( */}
        <Text
          color="red.0"
          size="sm"
          style={{
            height: "22px",
          }}
        >
          {formik.errors.cardNumber}
        </Text>
        {/* )} */}
      </Flex>
      <Flex direction="column">
        <Text color="gray" size="sm" weight={500}>
          Nome do titular
        </Text>
        <TextInputCustom
          placeholder="Nome como está no cartão"
          {...formik.getFieldProps("name")}
        />
        {/* {formik.touched.name && formik.errors.name && ( */}
        <Text color="red.0" size="sm" style={{ height: "22px" }}>
          {formik.errors.name}
        </Text>
        {/* )} */}
      </Flex>
      <Flex gap="md">
        <Flex direction="column" w={70}>
          <Text color="gray" size="sm" weight={500}>
            Validade
          </Text>
          <DatePickerInput
            minDate={new Date()}
            onBlur={handleTouching}
            onChange={setExpirationDate}
            placeholder="mm/aa"
            value={expirationDate}
            valueFormat="MM/YY"
            styles={(theme) => ({
              input: {
                backgroundColor: theme.colors.gray[9],
                color: theme.colors.gray[1],
                width: "100%",

                "&:focus": {
                  border: `1.5px solid ${theme.colors.purple[0]}`,
                },

                "&:hover": {
                  border: `1.5px solid ${theme.colors.gray[6]}`,
                },

                "&::placeholder": {
                  // TODO: placeholder doesn't have the same color as other inputs
                  color: theme.colors.purple[3],
                },
              },
            })}
          />
          <Text color="red.0" size="sm" style={{ height: "22px" }}>
            {datePickerTouched && !expirationDate ? "Obrigatório" : ""}
          </Text>
        </Flex>
        <Flex direction="column" maw={130}>
          <Flex gap="xs">
            <Text color="gray" size="sm" weight={500}>
              CVV
            </Text>
            <ActionIcon color="gray.3" radius="xl" size="xs" variant="filled">
              <IconQuestionMark color="black" />
            </ActionIcon>
          </Flex>
          <TextInputCustom
            name="cardVerificationValue"
            onBlur={(event) => {
              formik.handleBlur(event);
              handleTyping();
            }}
            onChange={(event) => {
              setShouldShowCardBack(true);
              formik.handleChange(event);
            }}
            placeholder="***"
            value={formik.values.cardVerificationValue}
          />
          {/* {formik.touched.cardVerificationValue &&
            formik.errors.cardVerificationValue && ( */}
          <Text
            color="red.0"
            size="sm"
            style={{
              height: "22px",
            }}
          >
            {formik.errors.cardVerificationValue}
          </Text>
          {/* )} */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CreditCardForm;
