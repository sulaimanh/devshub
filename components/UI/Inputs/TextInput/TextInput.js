import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import PropTypes from "prop-types";
import React from "react";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const TextInput = (
  {
    id,
    type,
    value,
    placeholder,
    handler,
    backgroundColor,
    isTextArea,
    name,
    handleBlur,
    showError,
    message,
    removeMarginBelow,
    ...props
  },
  ref
) => {
  return (
    <Container removeMarginBelow={removeMarginBelow}>
      <InputContainer>
        {isTextArea ? (
          <TextArea
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            onBlur={handleBlur}
            onChange={handler}
            backgroundColor={backgroundColor}
            showError={showError}
          />
        ) : (
          <Input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            onBlur={handleBlur}
            onChange={handler}
            backgroundColor={backgroundColor}
            showError={showError}
          />
        )}
        <Label htmlFor={props.id}>{placeholder}</Label>
      </InputContainer>

      <ErrorContainer>
        <Paragraph size='small' color='red'>
          {showError && message}
        </Paragraph>
      </ErrorContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  margin-bottom: ${({ removeMarginBelow }) =>
    removeMarginBelow ? 0 : "1.5rem"};
`;

const ErrorContainer = styled.div`
  position: relative;
  display: flex;
  margin-left: 1rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  position: absolute;
  top: -1.8rem;
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 2rem;
  margin-top: 0.7rem;
  background-color: ${({ theme, ...props }) => theme.inputs.inputBackground};
  transition: all 0.3s;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 1.5rem 2rem;

  font-size: var(--default-font-size-medium);
  font-family: inherit;
  border-radius: 1rem;
  transition: all 0.3s;
  background-color: ${({ theme, ...props }) => theme.inputs.inputBackground};
  color: ${({ theme }) => theme.inputs.inputText};

  border: 1.5px solid
    ${({ theme, showError }) =>
      showError ? theme.inputs.red : theme.inputs.inputBorder};

  &:focus {
    outline: none;
    border: 1.5px solid ${({ theme }) => theme.inputs.inputHighlight};
    box-shadow: var(--box-shadow);
  }

  &:placeholder-shown ~ ${Label} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
  }

  ::placeholder {
    color: ${({ theme }) => theme.inputs.inputText};
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 1.5rem 2rem;

  font-size: var(--default-font-size-medium);
  font-family: inherit;
  border-radius: 1rem;
  transition: all 0.3s;
  background-color: ${({ theme, ...props }) => theme.inputs.inputBackground};
  color: ${({ theme }) => theme.inputs.inputText};
  height: 20rem;
  border: 1.5px solid
    ${({ theme, showError }) =>
      showError ? theme.inputs.red : theme.inputs.inputBorder};
  resize: none;
  &:focus {
    outline: none;
    border: 1.5px solid ${({ theme }) => theme.inputs.inputHighlight};
    box-shadow: var(--box-shadow);
  }

  &:placeholder-shown ~ ${Label} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
  }

  ::placeholder {
    color: ${({ theme }) => theme.inputs.inputText};
  }
`;

export default TextInput;
