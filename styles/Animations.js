import styled, { keyframes } from "styled-components";

export const moveInLeft = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-500px);
    }
  
    80% {
      transform: translateX(10px);
    }
  
    100% {
      opacity: 1;
      transform: translate(0);
    }
  `;

export const moveInRight = keyframes`
    0% {
      opacity: 0;
      transform: translateX(500px);
    }
  
    80% {
      transform: translateX(-10px);
    }
  
    100% {
      opacity: 1;
      transform: translate(0);
    }
  `;

export const moveInBottom = keyframes`
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
  
    100% {
      opacity: 1;
      transform: translate(0);
    }
  `;

export const floating = keyframes`
    0% {
      box-shadow: 0 10px 20px rgba(rgba(0, 0, 0, 0.2), 0.2);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 0 15px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-15px);
    }
    100% {
      box-shadow: 0 10px 20px rgba(rgba(0, 0, 0, 0.2), 0.2);
      transform: translatey(0px);
    }
  `;

export const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
  
    40%,
    50%,
    60% {
      opacity: 1;
    }
  
    100% {
      opacity: 0;
    }
  `;
