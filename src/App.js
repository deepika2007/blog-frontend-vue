import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MasterComponent from "./routes";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// import EmptyBag from "./Components/EmptyBag";

const font = "'Poppins', sans-serif";

function App() {
  const theme = createTheme({
    input: {
      "&::placeholder": {
        opacity: 1,
      },
    },
    palette: {
      primary: {
        main: "#e86a0b",
      },
      
      secondary: {
        main: "#ff8600",
      },
    },
    typography: {
      fontFamily: font,
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CookiesProvider>
            <MasterComponent />
          </CookiesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
