import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headingSecondary as HeadingSecondary } from "../../Text/Text";
import React from "react";
import { device } from "@/styles/Devices";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";
import { useRouter } from "next/router";

const HeaderIntro = ({ toggleModalHandler, forgotPasswordHandler }) => {
  const router = useRouter();
  const { toggle, value } = useDarkMode(false);

  return (
    <>
      <Header>
        <Logo>
          <HeadingSecondary handler={() => router.push("/")}>
            DevsHub
          </HeadingSecondary>
        </Logo>
        <LinksContainer>
          <LinksSpread>
            <DarkModeToggle
              onClick={toggle}
              icon={value ? faMoon : faSun}
              size='2x'
            />
            <Button
              size='small'
              label='About Us'
              category='secondary'
              type='button'
              handler={() =>
                window.open("https://sulaimanhamouda.com", "_self")
              }
            />
            <Button
              handler={() => toggleModalHandler(false)}
              category='secondary'
              label='Sign In'
              type='button'
              size='small'
            />
            <Button
              handler={() => toggleModalHandler(true)}
              category='primary'
              label='Sign Up'
              type='button'
              size='small'
            />
          </LinksSpread>

          <SmallScreen>
            <DarkModeToggle
              onClick={toggle}
              icon={value ? faMoon : faSun}
              size='2x'
            />
            <Button
              handler={() => toggleModalHandler(false)}
              category='primary'
              label='Sign In'
              type='button'
              size='small'
            />
          </SmallScreen>
        </LinksContainer>
      </Header>
    </>
  );
};

const DarkModeToggle = styled(FontAwesomeIcon)`
  display: flex;
  padding: 1.5rem;
  margin-right: 1rem;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.buttons.grey};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
    background-color: ${({ theme }) => theme.buttons.greyHover};
    border-radius: 1rem;
  }
`;

const Header = styled.header`
  position: relative;
  height: 5vh;
  display: flex;
  align-items: center;
  padding: 4rem 3rem 3rem 3rem;
  margin-bottom: 0;
  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};

  justify-content: space-between;

  @media ${device.bigDesktop} {
    justify-content: space-around;
    padding-left: 0rem;
  }

  @media ${device.tabPort} {
    height: 8vh;
  }

  @media ${device.phone} {
    justify-content: space-between;
    padding: 2rem 1rem 1rem 1rem;
  }
`;

const Logo = styled.div`
  padding-left: 5rem;

  @media ${device.bigDesktop} {
    padding-left: 0rem;
  }

  @media ${device.tabPort} {
    padding-left: 2rem;
  }

  @media ${device.phone} {
    padding-left: 2rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  padding-right: 5rem;

  @media ${device.bigDesktop} {
    padding-right: 0rem;
  }

  @media ${device.tabPort} {
    padding-right: 2rem;
  }

  @media ${device.phone} {
    padding-right: 1rem;
  }
`;

const LinksSpread = styled.div`
  display: flex;
  width: 100%;
  @media ${device.tabPort} {
    display: none;
  }
`;

const SmallScreen = styled.div`
  display: none;

  @media ${device.tabPort} {
    display: flex;
  }
`;

export default HeaderIntro;
