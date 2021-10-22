import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-style';
import theme from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
