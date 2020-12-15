import MainView from "@/components/Main/Profile/MainView/MainView";
import React from "react";
import RightPanel from "@/components/Main/Profile/RightPanel/RightPanel";
import styled from "styled-components";

export default function Profile() {
  return (
    <Container>
      <MainView />
      <RightPanel />
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 4rem 0;
  display: flex;
  /* background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  border-radius: 1rem;
  padding: 2rem 2.5rem 2rem 2.5rem;
  box-sizing: border-box; */
`;
