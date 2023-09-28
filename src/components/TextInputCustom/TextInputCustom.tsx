import { TextInput } from "@mantine/core";

type TextInputCustomType = {
  name: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
  type?: "text" | "number";
};

export default function TextInputCustom({
  placeholder,
  type,
  ...props
}: TextInputCustomType) {
  return (
    <>
      <TextInput
        placeholder={placeholder}
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
        type={type || "text"}
        {...props}
      />
    </>
  );
}
