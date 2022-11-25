import { createTheme } from '@mui/material/styles';;
import { blue, red, green, cyan, grey } from '@mui/material/colors'
let theme = createTheme({
  palette: {
    primary: {
      light: blue[400],
      main: blue[500],
      dark: blue[600],
      //main: '#1890ff',
    },
    secondary: {
      main: grey[600],
      dark: grey[700],
    },
    warning: {
      main:  '#faad14',
      dark: grey[700],
    },
  
    info: {
      main: cyan[500],
      dark: cyan[600],
      contrastText: '#fff',
    },
    error: {
      main: '#ff4d4f',
      dark: red[600]
    },
    success: {
      main: '#00c853',
      dark: green.A700,
      contrastText: '#fff',
    }
  },

});

export default theme;
