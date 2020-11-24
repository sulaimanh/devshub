import { link as Linker, paragraph as Paragraph } from "../Text/Text";

import Link from "next/link";
import React from "react";
import { device } from "../../../styles/Devices";
import styled from "styled-components";

const Footer = () => {
  return (
    <Foot>
      <Left>
        <Paragraph color='darkGrey'>
          DevsHub is commited in connecting developers to opportunities by
          facilitating the interaction with other developers and getting hands
          on experience.
        </Paragraph>
      </Left>
      <Right>
        <RightLeft>
          <Linker color='fourth' href={"https://sulaimanhamouda.com"}>
            About Us
          </Linker>

          <Link passHref href='/blah'>
            <Linker color='darkGrey'>Careers</Linker>
          </Link>
          <Link passHref href='/blah'>
            <Linker color='darkGrey'>Email us</Linker>
          </Link>
        </RightLeft>
        <RightRight>
          <Link passHref href='/blah'>
            <Linker color='darkGrey'>Privacy Policy</Linker>
          </Link>

          <Link passHref href='/home'>
            <Linker color='darkGrey'>Support</Linker>
          </Link>
        </RightRight>
      </Right>
    </Foot>
  );
};

const Foot = styled.footer`
  display: flex;
  position: relative;
  padding: 10rem;
  z-index: 1000;
  justify-content: space-around;
  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.primary : theme.backgrounds.secondary};

  @media ${device.bigDesktop} {
    justify-content: center;
  }

  @media ${device.tabPort} {
    flex-direction: column;
    align-items: center;
    padding: 5rem;
    padding-top: 15rem;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: space-around;

  width: 70%;
  border-top: 1px solid ${({ theme }) => theme.fonts.darkGrey};
  margin-right: 10rem;
  padding-top: 4rem;

  @media ${device.bigDesktop} {
    width: 35%;
  }

  @media ${device.tabPort} {
    margin-bottom: 3rem;
    margin-top: 5rem;
    margin-right: 0rem;
    width: 90%;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  border-top: 1px solid ${({ theme }) => theme.fonts.darkGrey};
  padding-top: 4rem;

  @media ${device.bigDesktop} {
    width: 35%;
  }

  @media ${device.tabPort} {
    margin-top: 2rem;
    width: 100%;
  }
`;

const RightRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Footer;
