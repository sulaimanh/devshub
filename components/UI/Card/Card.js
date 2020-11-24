import {
  headingSecondary as HeadingSecondary,
  headingTertiary as HeadingTertiary,
  link as LinkTag,
  paragraph as Paragraph,
  span as Span
} from "../Text/Text";
import React, { useState } from "react";

import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import PropTypes from "prop-types";
import Technology from "../Technology/Technology";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useEffect } from "react";

const Card = ({
  page,
  section,
  description,
  handler,
  id,
  title,
  tech,
  ...props
}) => {
  const [isWordy, setWordy] = useState(false);
  // 250

  useEffect(() => {
    if (description.length > 250) {
      setWordy(true);
    } else {
      setWordy(false);
    }
  }, [description]);

  const desc = isWordy ? (
    <Paragraph size='reg'>
      {description.substring(0, 250)}...{" "}
      <Span handler={() => handler(id)} clickable color='primary' pad='0rem'>
        see more
      </Span>
    </Paragraph>
  ) : (
    <Paragraph size='reg'>{description}</Paragraph>
  );

  return (
    <Container>
      <HeadingContainer>
        <TitleContainer onClick={() => handler(id)}>
          <HeadingSecondary>{title}</HeadingSecondary>
        </TitleContainer>

        <Button
          handler={() => handler(id)}
          category='tertiary-outline'
          size='small'
          label='Explore'
          type='button'
        />
      </HeadingContainer>
      <DescriptionContainer>
        <HeadingTertiary>Description</HeadingTertiary>
        {desc}
      </DescriptionContainer>
      <TechContainer>
        <Technology tech={tech} /> <Icon icon={faHeart} size='3x' />
      </TechContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  padding: 2rem;
  border-radius: 1rem;

  width: 100%;
  box-sizing: border-box;

  margin-top: 2rem;

  transition: all ease 0.3s;

  &:hover {
    box-shadow: var(--box-shadow);
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  cursor: pointer;
`;

const DescriptionContainer = styled.div`
  margin: 0 1rem;
`;

const TechContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  justify-content: space-between;
  align-items: flex-end;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.buttons.greyHover};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.fonts.red};
  }
`;

Card.propTypes = {
  description: PropTypes.string.isRequired,
  tech: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

Card.defaultProps = {
  handler: null
};

export default Card;
