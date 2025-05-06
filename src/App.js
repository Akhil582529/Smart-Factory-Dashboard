import React from 'react';
import Inputs from './components/Inputs';
import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <h1 style={{textAlign: 'center'}}>Production Monitoring</h1>
      <Inputs/>
    </MantineProvider>
  );
}

export default App;