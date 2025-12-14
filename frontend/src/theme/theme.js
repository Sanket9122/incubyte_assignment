import { createTheme } from '@mui/material/styles';
import { orange, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[700],
    },
    secondary: {
      main: pink[500],
    },
    background: {
      default: '#fff',
      paper: '#f9f9f9',
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: orange[700],
    },
  },
});

export default theme;