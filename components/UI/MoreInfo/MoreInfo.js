import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function MoreInfo({ children, top, bottom, left, right }) {
  const handler = () => {};
  return (
    <Container>
      <Icon onClick={handler} size='2x' icon={faInfoCircle} />
      <MessageContainer top={top} bottom={bottom} left={left} right={right}>
        <Paragraph size='small'>{children}</Paragraph>
      </MessageContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const MessageContainer = styled.div`
  display: none;
  justify-content: center;
  width: 25rem;
  position: absolute;
  top: ${({ top }) => (top ? `${top}rem` : null)};
  bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : null)};
  left: ${({ left }) => (left ? `${left}rem` : null)};
  right: ${({ right }) => (right ? `${right}rem` : null)};

  padding: 1rem;
  z-index: 1000;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.backgrounds.secondary};
  background-color: ${({ theme }) => theme.backgrounds.secondary};
  box-shadow: var(--box-shadow);
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.fonts.darkGrey};
  z-index: 2;

  &:hover {
    color: ${({ theme }) => theme.fonts.tertiary};
  }

  &:hover + ${MessageContainer} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
