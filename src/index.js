import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#586BA4',
    },
    secondary: {
      main: '#324376',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
