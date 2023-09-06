import { ThemeProvider } from "./config/ThemeProvider";
import Routes from "./routes/Routes";

export default function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}
