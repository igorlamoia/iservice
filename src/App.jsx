import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './global/theme';
import { Home } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Home />
    </ThemeProvider>
  );
}

export default App;
