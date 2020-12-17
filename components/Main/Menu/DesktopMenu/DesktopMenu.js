import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { link as LinkButton } from "@/components/UI/Text/Text";
import { device } from "@/styles/Devices";
import menuItems from "../menu";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRouter } from "next/router";

export default function DesktopMenu({ ...props }) {
  const { signOut } = useAuth();

  const [selectedTab, setSelectedTab] = useState("home");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.substring(1) !== selectedTab) {
      setSelectedTab(router.pathname.split("/")[1]);
    }
  }, [router]);

  const selectTabHandler = async (event, choice) => {
    if (choice === "signOut") {
      await signOut();
      router.push("/");
    } else {
      setSelectedTab(choice);
      router.push(`/${choice}`);
    }
  };

  return (
    <Container>
      <LinksContainer>
        {menuItems.map((item, index) => {
          return (
            <LinkContainer
              key={index}
              onClick={(event) => {
                selectTabHandler(event, item.path);
              }}
              chosen={selectedTab === item.path ? 1 : 0}
              disabled={
                item.path === "profile"
                  ? true
                  : item.path === "messages"
                  ? true
                  : false
              }
            >
              <LinkIcon
                chosen={selectedTab === item.path ? 1 : 0}
                icon={item.icon}
                size='2x'
              />
              <LinkTag chosen={selectedTab === item.path ? 1 : 0} size='reg'>
                {item.choice}
              </LinkTag>
            </LinkContainer>
          );
        })}
      </LinksContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 2rem;
  overflow-x: hidden;
  display: flex;
  width: 14%;

  align-items: center;
  flex-direction: column;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.primary : theme.backgrounds.secondary};

  @media ${device.tabLand} {
    width: 20%;
  }

  @media ${device.tabPort} {
    display: none;
  }
`;

const LinksContainer = styled.div`
  margin: 6rem;
  width: 100%;
`;

const LinkIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, ...props }) =>
    props.chosen ? theme.fonts.primary : theme.fonts.primaryText};
`;

const LinkTag = styled(LinkButton)`
  color: ${({ theme, ...props }) =>
    props.chosen ? theme.fonts.primary : theme.fonts.primaryText};
  &:hover {
    text-decoration: none;
  }
`;

const LinkContainer = styled.div`
  display: flex;

  align-items: center;

  padding: 1rem 0 1rem 1rem;
  margin: 0.5rem 1rem 0rem 1rem;

  border-radius: 1rem;
  pointer-events: ${(props) => (props.disabled ? "none" : null)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  /* background-color: ${({ theme, ...props }) =>
    props.chosen
      ? theme.buttons.grey
      : theme.isDark
      ? theme.backgrounds.primary
      : theme.backgrounds.secondary}; */

  &:hover {
    background-color: ${({ theme }) => theme.buttons.grey};
  }
  &:hover > ${LinkTag} {
    color: ${({ theme }) => theme.fonts.primary};
  }
  &:hover > ${LinkIcon} {
    color: ${({ theme }) => theme.fonts.primary};
  }
`;
