import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./pages/Home";
import { Mint } from "./pages/Mint";

function App() {
  return (
    <GlobalStyles>
      <Router>
        <Routes>
          <Route path="/mint/:tokenId/:contractAddress" element={<Mint />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GlobalStyles>
  );
}

export default App;

const GlobalStyles = styled.div`
  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: white;
    }
  }
`;
