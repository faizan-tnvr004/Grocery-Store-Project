import { createTheme } from "@mui/material/styles";

// Create the theme with updated font
const theme = createTheme({
  palette: {
    primary: {
      main: "#a47148",
    },
    secondary: {
      main: "#f5f5dc",
    },
    background: { default: '#fdf6f0' },
    text: { primary: '#3e2c23' },
  },
  typography: {
    fontFamily: '"Cal Sans", "Arial", "Sansation", sans-serif', // Proper format with quotes
    h2: {
      fontFamily: '"Sansation", sans-serif', // Override for h2 to use Sansation
    },
    h6: {
      fontFamily: '"Cal Sans", sans-serif', // Override for h6 to use Arial
    },
  },
});

export default theme;
