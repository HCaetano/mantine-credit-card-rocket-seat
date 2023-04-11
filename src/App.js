import {
  ActionIcon,
  AppShell,
  Container,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";
import { ThemeProvider } from "./ThemeProvider";
import { styled } from "./config/stitches.config";
import theme from "./config/mantineTheme";

const ContainerThemed = styled(Container, {
  background: theme.colors.gray[8],
});

const AppShellThemed = styled(AppShell, {
  background: theme.colors.gray[9],
});

const TextInputThemed = styled(TextInput, {
  "& .mantine-TextInput-input": {
    background: theme.colors.gray[9],
    color: theme.colors.gray[1],
    padding: "12px",
  },

  "& ::placeholder": {
    color: theme.colors.gray[3],
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <AppShellThemed>
        <ContainerThemed p={32} size="sm">
          <Flex direction="column" gap="xl" maw={328}>
            <Flex direction="column">
              <Text color={theme.colors.gray[1]} size="sm" weight={500}>
                Número do cartão
              </Text>
              <TextInputThemed placeholder="4716 8039 02" />
            </Flex>
            <Flex direction="column">
              <Text color="gray" size="sm" weight={500}>
                Nome do titular
              </Text>
              <TextInputThemed placeholder="Nome como está no cartão" />
            </Flex>
            <Flex align="center" gap="md">
              <Flex direction="column">
                <Text color="gray" size="sm" weight={500}>
                  Validade
                </Text>
                <TextInputThemed maw={182} placeholder="mm/aa" />
              </Flex>
              <Flex direction="column">
                <Flex gap="xs">
                  <Text color="gray" size="sm" weight={500}>
                    CVV
                  </Text>
                  <ActionIcon radius="xl" size="xs" variant="filled">
                    <IconQuestionMark />
                  </ActionIcon>
                </Flex>
                <TextInputThemed maw={130} placeholder="***" />
              </Flex>
            </Flex>
          </Flex>
        </ContainerThemed>
      </AppShellThemed>
    </ThemeProvider>
  );
}
