import {
  headingSecondary as HeadingSecondary,
  paragraph as Paragraph
} from "../../UI/Text/Text";

import React from "react";
import ReactCodeLogo from "../../../public/images/code.svg";
import ReactCommunityLogo from "../../../public/images/community.svg";
import ReactTeamLogo from "../../../public/images/team_work.svg";
import { device } from "../../../styles/Devices";
import styled from "styled-components";

const WhatIs = () => {
  return (
    <Container>
      <Reason>
        <LogoContainer>
          <Icon1 />
        </LogoContainer>
        <StatementContainer>
          <HeadingSecondary>A community of developers</HeadingSecondary>
          <Paragraph>
            Collaborating with other developers just got easier. DevsHub helps
            developers build effective technical and collaboration skills.
          </Paragraph>
        </StatementContainer>
      </Reason>
      <Reason>
        <StatementContainer>
          <HeadingSecondary>Join Teams and Projects</HeadingSecondary>
          <Paragraph>
            Have an idea? Post it on DevsHub and build your own team. Looking
            for a team or project to join? Join DevsHub and find your next
            project.
          </Paragraph>
        </StatementContainer>
        <LogoContainer>
          <Icon2 />
        </LogoContainer>
      </Reason>
      <Reason>
        <LogoContainer>
          <Icon3 />
        </LogoContainer>
        <StatementContainer>
          <HeadingSecondary>Build an impressive portfolio</HeadingSecondary>
          <Paragraph>
            The best way to impress employers is by being engaged and having
            done projects. This shows that you have the ability to take your
            learning beyond what you learn in school or online.
          </Paragraph>
        </StatementContainer>
      </Reason>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  align-content: center;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.primary : theme.backgrounds.secondary};

  padding-bottom: 20rem;
`;

const Reason = styled.div`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 20rem;

  &:not(:first-child) {
    margin-top: 35rem;
  }
  @media ${device.tabPort} {
    flex-direction: column;

    width: 60%;
  }

  @media ${device.phone} {
    width: 80%;
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 5rem;
  &:nth-child(2) {
    margin-right: 0;
    margin-left: 5rem;
  }

  @media ${device.tabPort} {
    order: 1;
    margin-right: 0;
    &:nth-child(2) {
      margin-left: 0rem;
    }
  }
`;

const Icon1 = styled(ReactCodeLogo)`
  position: relative;

  height: 40rem;

  @media ${device.tabPort} {
    height: 30rem;
  }

  @media ${device.phone} {
    height: 25rem;
  }
`;

const Icon2 = styled(ReactCommunityLogo)`
  position: relative;

  height: 40rem;

  @media ${device.tabPort} {
    height: 30rem;
  }

  @media ${device.phone} {
    height: 25rem;
  }
`;

const Icon3 = styled(ReactTeamLogo)`
  position: relative;

  height: 40rem;

  @media ${device.tabPort} {
    height: 30rem;
  }

  @media ${device.phone} {
    height: 25rem;
  }
`;

const StatementContainer = styled.div`
  flex-basis: 30%;

  @media ${device.tabPort} {
    order: 2;
  }

  @media ${device.phone} {
    width: 100%;
  }
`;

export default WhatIs;
