import { AppShell, Container, TextInput } from "@mantine/core";
import { styled } from "./config/stitches.config";

export const ContainerThemed = styled(Container, {
  background: "$gray800",
});

export const AppShellThemed = styled(AppShell, {
  background: "$gray900",
});

export const TextInputThemed = styled(TextInput, {
  "& .mantine-TextInput-input": {
    background: "$gray900",
    color: "$gray100",
    padding: "12px",
  },

  "& ::placeholder": {
    color: "$gray400",
  },
});
