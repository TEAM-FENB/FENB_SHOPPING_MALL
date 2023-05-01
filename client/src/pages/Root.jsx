import { Outlet } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { Footer, NavigationBar, SwitchingpageScrollToTop } from '../components';
import useTheme from '../hooks/darkmode/useTheme';

const Root = () => {
  const { colorScheme, toggleTheme } = useTheme();

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleTheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NavigationBar />
          <SwitchingpageScrollToTop />
          <Outlet />
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default Root;
