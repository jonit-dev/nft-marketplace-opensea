import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import { uiColors } from "../constants/colors";

interface IProps {}

export const Loading: React.FC<IProps> = (props) => {
  return (
    <Container>
      <ClipLoader color={uiColors.dark} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;
