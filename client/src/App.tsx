import React from "react";

import Box from "@material-ui/core/Box";

import Grid from './Grid'
import "./App.css";

function App() {
  return (
      <Box 
        component="main" 
        className="App-main"
        p={2}
        mx="auto"
        maxWidth={1200}
        height={500}
      > 
        <Grid />
      </Box>
  );
}

App.whyDidYouRender = true
export default App;
