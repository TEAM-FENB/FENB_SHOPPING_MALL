import { Outlet } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NavigationBar, Footer, SwitchingPageScrollToTop } from '../components';
import useTheme from '../hooks/darkmode/useTheme';
import ScrollTop from '../components/ScrollTop';

const Root = () => {
  const { colorScheme, toggleTheme } = useTheme();
  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleTheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <SwitchingPageScrollToTop />
          <ScrollTop positionY={700} />
          <NavigationBar />
          <Outlet />
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default Root;
