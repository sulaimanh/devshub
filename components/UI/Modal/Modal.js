import Backdrop from "../Backdrop/Backdrop";
import React from "react";
import { device } from "@/styles/Devices";
import styled from "styled-components";

const Modal = React.memo(({ width, children, show, handler }) => (
  <Container>
    <Backdrop show={show} handler={handler} />
    <WhiteContainer width={width} show={show}>
      {children}
    </WhiteContainer>
  </Container>
));

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;

  z-index: 10000000000;

  @media ${device.tabPort} {
    width: 100%;
  }
`;

const WhiteContainer = styled.div`
  position: relative;
  z-index: 10000;
  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  display: flex;
  justify-content: center;
  width: ${({ width }) => (width ? width : "50%")};
  border-radius: 2rem;
  overflow-y: scroll;

  box-shadow: var(--box-shadow);
  padding: 4rem 4rem;
  transition: all 0.4s ease-out;

  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translate(-50%, -50%);

  @media ${device.tabPort} {
    padding: 4rem 4rem;
  }

  @media ${device.phone} {
    padding: 4rem 2rem;
    width: 85%;
  }
`;

export default Modal;
