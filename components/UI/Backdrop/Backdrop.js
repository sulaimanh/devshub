import React from "react";
import styled from "styled-components";

const Backdrop = ({ show, handler }) => {
  return show ? <Back onClick={handler} /> : null;
};

const Back = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9000;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
