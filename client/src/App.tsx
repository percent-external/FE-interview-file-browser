import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import logo from "./logo.svg";
import "./App.css";
import { useListEntriesQuery } from "./generated-api";

const StyledHelloCard = styled(Card)`
  border: 1px solid gray;
  width: 300px;
  padding: 8px;
  margin: 8px;
`;

function App() {
  const { data, loading, error } = useListEntriesQuery({
    variables: { path: "/" },
  });

  return (
    <div className="App">
      <StyledHelloCard>hello</StyledHelloCard>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
