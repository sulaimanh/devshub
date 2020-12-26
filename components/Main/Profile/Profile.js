import MainView from "@/components/Main/Profile/MainView/MainView";
import React from "react";
import RightPanel from "@/components/Main/Profile/RightPanel/RightPanel";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import useGetUser from "@/utils/hooks/useGetUser";

export default function Profile() {
  const userData = useGetUser(user?.id);
  const { user } = useAuth();

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
