import {
  headingTertiary as HeadingTertiary,
  paragraph as Paragraph
} from "../Text/Text";

import React from "react";
import { device } from "@/styles/Devices";
import styled from "styled-components";

const Technology = (props) => {
  const tech = props.tech.map((skill, index) => {
    return (
      <Card key={index}>
        <CardParagraph hoverColor='white' size='small'>
          {skill}
        </CardParagraph>
      </Card>
    );
  });

  return (
    <Container>
      <TechContainer>
        <HeadingTertiary>Technology Used</HeadingTertiary>
        <Tech>{tech}</Tech>
      </TechContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  align-items: baseline;
  margin-top: 2rem;

  @media ${device.phone} {
    flex-direction: column;
  }
`;

const TechContainer = styled.div`
  display: flex;

  flex-direction: column;
  position: relative;

  @media ${device.phone} {
    width: 100%;
  }
`;

const Tech = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const CardParagraph = styled(Paragraph)``;

const Card = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  border: 1px solid transparent;
  box-shadow: var(--box-shadow);
  /* border: 1px solid ${({ theme }) => theme.backgrounds.secondary}; */
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  margin-right: 1rem;

  &:hover {
    background-color: ${({ theme }) =>
      theme.isDark ? theme.backgrounds.primary : theme.backgrounds.tertiary};
  }

  &:hover > ${CardParagraph} {
    color: ${({ theme }) => theme.fonts.white};
  }
`;

export default Technology;
