import { moveInLeft, moveInRight } from "@/styles/Animations";

import ForgotPassword from "@/components/Introduction/ForgotPassword/ForgotPassword";
import HeaderIntro from "@/components/UI/Header/HeaderIntro/HeaderIntro";
import Modal from "@/components/UI/Modal/Modal";
import React from "react";
import SignIn from "@/components/Introduction/SignIn/SignIn";
import TopHeader from "@/components/Introduction/TopHeader/TopHeader";
import WhatIs from "@/components/Introduction/WhatIs/WhatIs";
import WhyDev from "@/components/Introduction/WhyDev/WhyDev";
import { device } from "@/styles/Devices";
import styled from "styled-components";
import { useState } from "react";

export default function Introduction(props) {
  const [showModal, setShowModal] = useState({ show: false, isSignUp: true });
  const [forgot, setForgot] = useState(false);

  const forgotPasswordHandler = () => {
    setShowModal({ show: false, isSignUp: false });
    setForgot((prevValue) => !prevValue);
  };

  const toggleModalHandler = (isSignUp, showSignUp = false) => {
    setShowModal((prevValue) => {
      return { show: showSignUp ? true : !prevValue.show, isSignUp: isSignUp };
    });
  };

  return (
    <>
      {forgot ? (
        <Modal show={forgot} handler={forgotPasswordHandler}>
          <ForgotPassword />
        </Modal>
      ) : null}
      {showModal.show === true ? (
        <Modal show={showModal.show} handler={toggleModalHandler}>
          <SignIn
            toggleModalHandler={toggleModalHandler}
            forgotPasswordHandler={forgotPasswordHandler}
            isSignUp={showModal.isSignUp}
          />
        </Modal>
      ) : null}
      <div>
        <HeaderIntro
          forgotPasswordHandler={forgotPasswordHandler}
          toggleModalHandler={toggleModalHandler}
        />
        <Main>
          <Container>
            <LeftContainer>
              <TopHeader toggleModalHandler={toggleModalHandler} />
            </LeftContainer>
            <RightContainer>
              <SignIn isSignUp toggleModalHandler={toggleModalHandler} />
            </RightContainer>
          </Container>
          <WhatIs />
          <WhyDev handler={toggleModalHandler} />
        </Main>
      </div>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  padding-top: 10rem;
  padding-bottom: 15rem;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);

  max-width: 100%;
  height: fit-content;

  @media ${device.bigDesktop} {
    justify-content: center;
    padding-top: 5rem;
  }

  @media ${device.tabPort} {
    height: 45vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  @media ${device.phone} {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 35vh;
  }
`;

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-top: 5rem;
  /* height: fit-content; */

  animation: ${moveInLeft} 1s ease-in-out;

  @media ${device.bigDesktop} {
    width: 40%;
  }

  @media ${device.tabPort} {
    width: 75%;
    text-align: center;
    align-items: center;
    margin-top: 7rem;
    height: 100%;
  }

  @media ${device.phone} {
    width: 90%;
    align-items: center;
    margin-top: 0rem;
  }
`;

const RightContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: flex-end;

  height: fit-content;
  width: 45%;

  animation: ${moveInRight} 1s ease-in-out;

  @media ${device.bigDesktop} {
    width: 25%;
  }

  @media ${device.tabPort} {
    display: none;
  }

  @media ${device.phone} {
    width: 100%;
    align-content: center;
  }
`;
