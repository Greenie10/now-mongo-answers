import React from "react";
import styled from "styled-components";

class App extends React.Component {
  render() {
    return <MainHeader>Home</MainHeader>;
  }
}
const MainHeader = styled.h1`
  font-family: "Arial Black", "Arial Bold", Gadget, sans-serif;
  font-weight: bold;
  font-size: 36px;
`;
export default App;
