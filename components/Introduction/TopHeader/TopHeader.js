import {
  headingPrimary as HeadingPrimary,
  paragraph as Paragraph
} from "../../UI/Text/Text";
import { moveInLeft, moveInRight } from "../../../styles/Animations";

import Button from "../../UI/Button/Button";
import React from "react";
import { device } from "../../../styles/Devices";
import styled from "styled-components";

const TopHeader = ({ toggleModalHandler }) => {
  return (
    <LeftContainer>
      <ParagraphContainer>
        <HeadingPrimary>Connecting Developers</HeadingPrimary>
        <Paragraph>
          A better way to get involved and build your skills
        </Paragraph>
      </ParagraphContainer>
      <ButtonsContainer>
        <Button
          handler={() => toggleModalHandler(true)}
          type='button'
          category='primary'
          size='small'
          label='Sign Up'
        />
        <Button
          size='small'
          category='secondary'
          type='button'
          label='About Us'
          handler={() => window.open("https://sulaimanhamouda.com", "_self")}
        />
      </ButtonsContainer>
    </LeftContainer>
  );
};

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* margin-top: 5rem; */
  height: fit-content;

  animation: ${moveInLeft} 1s ease-in-out;

  @media ${device.bigDesktop} {
    width: 100%;
  }

  @media ${device.tabPort} {
    width: 85%;
    text-align: center;
    align-items: center;
    margin-top: 7rem;
    height: 100%;
  }

  @media ${device.phone} {
    width: 90%;
    align-items: center;
    margin-top: 0rem;
    height: 100%;
  }
`;

const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;

export default TopHeader;
