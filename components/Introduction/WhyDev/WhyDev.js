import {
  headingPrimary as HeadingPrimary,
  paragraph as Paragraph,
  span as Span
} from "../../UI/Text/Text";
import React, { useEffect, useState } from "react";

import Button from "../../UI/Button/Button";
import { device } from "../../../styles/Devices";
import { fadeIn } from "../../../styles/Animations";
import styled from "styled-components";

const WhyDev = ({ handler }) => {
  const [term, setTerm] = useState({
    term: "developers",
    index: 0
  });

  const terms = ["developers", "ideas", "opportunities"];

  useEffect(() => {
    let interval = setInterval(() => {
      if (term.index === 0) {
        setTerm({ term: terms[1], index: 1 });
      } else if (term.index === 1) {
        setTerm({ term: terms[2], index: 2 });
      } else {
        setTerm({ term: terms[0], index: 0 });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Container>
      <Heading>
        <HeadingPrimary>
          <Span color='white'>A community of </Span>
          <TextChange>{term.term}</TextChange>
        </HeadingPrimary>
      </Heading>
      <ContStatement>
        <Paragraph weight='600' size='reg' color='white'>
          DevsHub makes it easy for developers to start working on real
          projects. Developers are able to collaborate on projects together,
          work on teams, and gain effective skills.
        </Paragraph>
      </ContStatement>

      <ContButton>
        <Button
          handler={() => handler(true)}
          category='tertiary-outline'
          type='button'
          size='large'
          label='Sign Up'
        />
      </ContButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 100%;
  background-color: ${({ theme }) => theme.backgrounds.tertiary};

  clip-path: polygon(0% 10%, 100% 0, 100% 90%, 0 100%);

  z-index: 1;
  padding-top: 15rem;
  padding-bottom: 15rem;
`;

const Heading = styled.div`
  display: flex;
  color: white;
  text-align: center;
`;

const TextChange = styled.span`
  color: ${({ theme }) => theme.fonts.tertiary};
  @media ${device.phone} {
    display: block;
  }
  animation: ${fadeIn} 3s linear infinite;
`;

const ContStatement = styled.div`
  width: 50%;
  text-align: center;

  @media ${device.tabPort} {
    width: 85%;
  }
`;

const ContButton = styled.div`
  display: flex;
  justify-content: center;

  width: 30%;
  margin-top: 4rem;

  @media ${device.tabPort} {
    width: 50%;
  }

  @media ${device.phone} {
    width: 70%;
  }
`;

export default WhyDev;
