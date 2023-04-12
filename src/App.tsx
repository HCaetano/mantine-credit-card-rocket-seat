import { ActionIcon, Box, Button, Center, Flex, Text } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";
import { ThemeProvider } from "./ThemeProvider";
import { TextInputThemed } from "./styles";

export default function App() {
  return (
    <ThemeProvider>
      <Center
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[9],
          height: "100vh",
        })}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[8],
            height: 420,
            padding: 32,
            width: 720,
          })}
        >
          <Flex>
            <Flex direction="column" gap="xl" maw={328}>
              <Flex direction="column">
                <Text color="gray" size="sm" weight={500}>
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
                    <ActionIcon
                      color="gray.3"
                      radius="xl"
                      size="xs"
                      variant="filled"
                    >
                      <IconQuestionMark color="black" />
                    </ActionIcon>
                  </Flex>
                  <TextInputThemed maw={130} placeholder="***" />
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column" maw={280}></Flex>
          </Flex>
          <Button
            color="purple.0"
            fullWidth
            p={16}
            mt={48}
            styles={{ root: { height: "auto" } }}
          >
            <Text size="lg">Adicionar cartão</Text>
          </Button>
        </Box>
      </Center>
    </ThemeProvider>
  );
}
