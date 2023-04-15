import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import theme from "./mantineTheme";

export const newTheme: MantineThemeOverride = {
  ...theme,
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={newTheme}>
      {children}
    </MantineProvider>
  );
}
