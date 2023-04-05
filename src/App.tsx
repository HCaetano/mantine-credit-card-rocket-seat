import { AppShell, Button, Container } from "@mantine/core";
import { ThemeProvider } from "./ThemeProvider";
import { styled } from "./config/stitches.config";

const StyledButton = styled(Button, {
  color: "$gray500",
});

const Layout = styled(AppShell, {
  background: "$gray900",
});

export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Container size="sm">
          <div>All elements inside Container are Containered</div>
        </Container>
      </Layout>
    </ThemeProvider>
  );
}
