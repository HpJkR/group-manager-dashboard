import {createTheme} from '@mui/material/styles';

// Thème clair
const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: "#FFFFFF",
      main: '#FE7835', // Couleur primaire
    },
    background: {
      default: '#ffffff', // Couleur de fond pour le mode clair
    },
    text: {
      primary: '#000000', // Couleur du texte pour le mode clair
    },
  },
});

// Thème sombre
const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: "#FFFFFF",
      main: '#FB5B21', // Couleur primaire
    },
    background: {
      default: '#121212', // Couleur de fond pour le mode sombre
    },
    text: {
      primary: '#ffffff', // Couleur du texte pour le mode sombre
    },
  },
});

export {themeLight, themeDark};
