import React from "react";
import styled from "styled-components";

export default function Profile() {
  return <Container></Container>;
}

const Container = styled.div`
  width: 90%;
  margin: 2rem 0;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  border-radius: 1rem;
  padding: 0rem 2.5rem 2rem 2.5rem;
  box-sizing: border-box;
`;
