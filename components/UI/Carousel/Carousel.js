import React, { useState } from "react";

import Button from "@/components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// - This view is simply the skeleton and the functionality. You have to style the actual contents
export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);

  const goLeftHandler = () => {
    setIndex((prevValue) => {
      if (index === 0) {
        return items.length - 1;
      }
      return prevValue - 1;
    });
  };

  const goRightHandler = () => {
    setIndex((prevValue) => {
      if (index === items.length - 1) {
        return 0;
      }
      return prevValue + 1;
    });
  };

  const goToIndex = (ind) => {
    setIndex(ind);
  };

  const Dots = items.map((x, ind) => (
    <Dot key={ind} onClick={() => goToIndex(ind)} selected={index === ind}>
      &nbsp;
    </Dot>
  ));

  return (
    <Container>
      <Cont>
        <InnerContainer>
          <div>{items[index]}</div>
        </InnerContainer>
      </Cont>
      <BottomContainer>
        <Button
          handler={goLeftHandler}
          label='Back'
          category='primary'
          size='small'
          color='grey'
          hoverColor='greyHover'
          textColor='primaryText'
        />
        <DotContainer>{Dots}</DotContainer>
        <Button
          handler={goRightHandler}
          label='Next'
          category='primary'
          size='small'
        />
      </BottomContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;

const Cont = styled.div`
  position: relative;
  width: 100%;
  align-items: center;
  display: flex;
  margin-bottom: 4rem;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Dot = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme, selected }) =>
    selected ? theme.fonts.tertiary : theme.fonts.primary};

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
