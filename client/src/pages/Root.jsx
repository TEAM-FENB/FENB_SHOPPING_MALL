import React from 'react';
import { Outlet } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { Footer, NavigationBar } from '../components';

const Root = () => {
  const [colorScheme, setColorScheme] = React.useState('light');
  const toggleColorScheme = value => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NavigationBar />
          <Outlet />
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default Root;
