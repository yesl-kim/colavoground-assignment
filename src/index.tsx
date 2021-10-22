import ReactDOM from 'react-dom';
import Routes from './Routes';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-style';
import theme from './styles/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Routes />
  </ThemeProvider>,
  document.getElementById('root')
);
