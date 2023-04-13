import { TextInput } from "@mantine/core";

type TextInputCustomType = {
  placeholder: string;
};

export default function TextInputCustom({ placeholder }: TextInputCustomType) {
  return (
    <>
      <TextInput
        sx={(theme) => ({
          input: {
            backgroundColor: theme.colors.gray[9],
            color: theme.colors.gray[1],

            "&::placeholder": {
              color: theme.colors.gray[3],
            },
          },
        })}
        placeholder={placeholder}
      />
    </>
  );
}
