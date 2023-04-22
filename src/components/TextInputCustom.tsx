import { TextInput } from "@mantine/core";

type TextInputCustomType = {
  name: string;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
};

export default function TextInputCustom({
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}: TextInputCustomType) {
  return (
    <>
      <TextInput
        name={name}
        onBlur={onBlur}
        onChange={onChange}
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
        value={value}
      />
    </>
  );
}
