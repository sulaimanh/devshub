import styled, { keyframes } from "styled-components";

import React from "react";
import { device } from "@/styles/Devices";

const motion = (props) => keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const DefaultSpinner = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* width: ${(p) => `${p.size}${p.sizeUnit}`};
  height: ${(p) => `${p.size}${p.sizeUnit}`}; */
  width: 90px;
  height: 90px;
  @media ${device.tabPort} {
    width: 70px;
    height: 70px;
  }

  div {
    position: absolute;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: ${(p) => p.color};
    animation: ${(p) => motion(p)} 1.2s linear infinite;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  div:nth-child(1) {
    top: 0;
    left: 0;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 0;
    left: 50%;
    animation-delay: -0.4s;
  }
  div:nth-child(3) {
    top: 0;
    left: 100%;
    animation-delay: -0.8s;
  }
  div:nth-child(4) {
    top: 50%;
    left: 0;
    animation-delay: -0.4s;
  }
  div:nth-child(5) {
    top: 50%;
    left: 50%;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    top: 50%;
    left: 100%;
    animation-delay: -1.2s;
  }
  div:nth-child(7) {
    top: 100%;
    left: 0%;
    animation-delay: -0.8s;
  }
  div:nth-child(8) {
    top: 100%;
    left: 50%;
    animation-delay: -1.2s;
  }
  div:nth-child(9) {
    top: 100%;
    left: 100%;
    animation-delay: -1.6s;
  }
`;

const Spinner = ({ color, size, sizeUnit }) => (
  <DefaultSpinner color={color} size={size} sizeUnit={sizeUnit}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </DefaultSpinner>
);

Spinner.defaultProps = {
  size: 10,
  color: "#1877F2",
  sizeUnit: "%"
};

export default Spinner;
