import React, { useEffect, useRef } from "react";

import { paragraph as Paragraph } from "../../Text/Text";
import styled from "styled-components";
import { useState } from "react";

const CheckBox = ({ id, handler, hasValue, children }) => {
  const inputRef = useRef();
  const [isClicked, setIsClicked] = useState(true);

  useEffect(() => {
    if (hasValue) {
      inputRef.current.click();
    }
  }, []);

  return (
    <Box>
      <Label>
        <Input
          ref={inputRef}
          onClick={() => {
            setIsClicked((prevState) => !prevState);
            handler(isClicked, id);
          }}
          type='checkbox'
        />
        <Span></Span>
        <Paragraph
          className
          hoverColor='tertiary'
          handler={() => {
            handler(isClicked, id);
          }}
          clickable
        >
          {children}
        </Paragraph>
      </Label>
    </Box>
  );
};

const Input = styled.input`
  display: None;
  visibility: Hidden;
  opacity: 0;
`;

const Span = styled.span`
  height: 20px;
  width: 20px;
  background-color: transparent;
  margin-right: 1rem;
  border-radius: 1rem;
  border: 3px solid ${({ theme }) => theme.fonts.primary};
  cursor: pointer;

  &:hover {
    border: 3px solid ${({ theme }) => theme.fonts.tertiary};
  }

  border-radius: 5px;
  transition: all 0.2s ease-out;
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
`;

const Label = styled.label`
  display: flex;
  /* margin-right: 1rem; */
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  ${Label} ${Input}:checked ~ ${Span} {
    background-color: ${({ theme }) => theme.fonts.primary};
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    opacity: 1;

    border: 3px solid ${({ theme }) => theme.fonts.primary};

    &:hover {
      background-color: ${({ theme }) => theme.fonts.tertiary};
      border: 3px solid ${({ theme }) => theme.fonts.tertiary};
    }
  }

  ${Label} ${Span}::after {
    position: absolute;
    content: "";
    left: 5px;
    top: 5px;
    height: 0px;
    width: 0px;
    border-radius: 5px;
    border: solid ${({ theme }) => theme.fonts.primary};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(0deg) scale(0);
    -ms-transform: rotate(0deg) scale(0);
    transform: rotate(0deg) scale(0);
    opacity: 1;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
  }

  ${Label} ${Input}:checked ~ ${Span}::after {
    -webkit-transform: rotate(45deg) scale(1) translate(-40%, -50%);
    -ms-transform: rotate(45deg) scale(1) translate(-50%, -50%);
    opacity: 1;
    left: 6px;
    top: 1px;
    transform: rotate(45deg) scale(1);

    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    background-color: transparent;
    border-radius: 0;
  }
`;

export default CheckBox;
