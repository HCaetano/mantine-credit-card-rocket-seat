import { TextInput } from "@mantine/core";

type TextInputCustomType = {
  error: string;
  onChange?: (event: string) => void;
  placeholder: string;
};

export default function TextInputCustom({
  error,
  placeholder,
}: TextInputCustomType) {
  return (
    <>
      <TextInput
        error={error}
        styles={(theme) => ({
          error: {
            color: theme.colors.red[0],
          },
          input: {
            backgroundColor: theme.colors.gray[9],
            color: theme.colors.gray[1],

            "&::placeholder": {
              color: theme.colors.gray[3],
            },

            "&:focus": {
              border: `1.5px solid ${theme.colors.purple[0]}`,
            },

            "&:hover": {
              border: `1.5px solid ${theme.colors.gray[6]}`,
            },

            "&[data-invalid]": {
              borderColor: theme.colors.red[0],
              color: theme.colors.gray[1],

              "&::placeholder": {
                color: theme.colors.red[0],
              },
            },
          },
        })}
        placeholder={placeholder}
      />
    </>
  );
}
