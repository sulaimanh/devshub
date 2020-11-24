import React, { useState } from "react";

import Button from "@/components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "@/components/UI/Inputs/TextInput/TextInput";
import MoreInfo from "../../MoreInfo/MoreInfo";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function SearchInput({
  placeholder,
  value,
  handler,
  info,
  isSubmitButton,
  submitHandler,
  ...props
}) {
  return (
    <Container>
      <SearchBarContainer>
        <InputSearch
          className
          placeholder={placeholder}
          value={value}
          handler={handler}
          removeMarginBelow
        />

        <Icon icon={faSearch} size='2x' />

        <MoreInfoContainer>
          <MoreInfoIcon left='1'>{info}</MoreInfoIcon>
        </MoreInfoContainer>
      </SearchBarContainer>
      {isSubmitButton ? (
        <Submit
          className
          type='button'
          onClick={submitHandler}
          category='tertiary-outline'
          label='Search'
          size='small'
        />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 2.8rem;
  transform: translateY(-50%);
  left: 1rem;
  z-index: 2;
  color: ${({ theme }) => theme.fonts.darkGrey};
`;

const MoreInfoIcon = styled(MoreInfo)``;

const InputSearch = styled(Input)`
  width: 100%;
  transition: all 0.3s;
  &::head &:focus + ${Icon} {
    color: ${({ theme }) => theme.fonts.primary};
  }

  &:focus + ${Icon} + ${MoreInfoIcon} {
    color: ${({ theme }) => theme.fonts.primary};
  }

  &:focus {
    outline: none;
    box-shadow: var(--box-shadow);
  }
`;

const MoreInfoContainer = styled.div`
  position: absolute;
  top: 3rem;
  transform: translateY(-50%);
  right: 2rem;
  z-index: 2;
  color: black;
`;

const Submit = styled(Button)`
  padding: 1rem;
`;
