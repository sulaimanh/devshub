import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { link as LinkButton } from "@/components/UI/Text/Text";
import { device } from "@/styles/Devices";
import menuItems from "../menu";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import { useRouter } from "next/router";

const MobileMenu = (props) => {
  const [selectedTab, setSelectedTab] = useState("home");
  const { signOut } = useAuth();
  const router = useRouter();

  // - If page is refreshed, then we need to keep the path
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
      {menuItems.map((item, index) => {
        return (
          <LinkContainer
            key={index}
            onClick={(event) => {
              selectTabHandler(event, item.path);
            }}
            chosen={selectedTab === item.path ? 1 : 0}
          >
            <LinkIcon
              chosen={selectedTab === item.path ? 1 : 0}
              icon={item.icon}
              size='2x'
            />
            <LinkTag chosen={selectedTab === item.path ? 1 : 0} size='xsmall'>
              {item.choice}
            </LinkTag>
          </LinkContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: none;
  @media ${device.tabPort} {
    position: fixed;
    bottom: 0;
    z-index: 9000;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.inputs.inputBorder};
    background-color: ${({ theme }) => theme.backgrounds.primary};
  }
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
  justify-content: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding: 1rem 1.5rem;
  width: 25%;
  /* background-color: ${({ theme, chosen }) =>
    chosen ? theme.backgrounds.grey : null}; */
  /* border-left: 1px solid ${({ theme }) => theme.inputs.inputBorder}; */
  /* &:last-child {
    border-right: 1px solid ${({ theme }) => theme.inputs.inputBorder};
  } */

  height: 15%;
  cursor: pointer;

  color: ${({ theme, chosen }) => (chosen ? theme.fonts.tertiary : null)};

  &:hover {
    background-color: ${({ theme }) => theme.backgrounds.grey};
  }
  &:hover > ${LinkTag} {
    color: ${({ theme }) => theme.fonts.primary};
  }
  &:hover > ${LinkIcon} {
    color: ${({ theme }) => theme.fonts.primary};
  }
`;
export default MobileMenu;
