import React, { useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headingSecondary as HeadingSecondary } from "@/components/UI/Text/Text";
import styled from "styled-components";
import useDarkMode from "use-dark-mode";

// import SearchInput from "@/components/UI/Inputs/SearchInput/SearchInput";

const HeaderMain = (props) => {
  const [search, setSearch] = useState("");
  const { toggle, value } = useDarkMode(false);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container>
      <HeadingSecondary>DevsHub</HeadingSecondary>

      {/* <SearchContainer> */}
      {/* <SearchInput
          isSubmitButton={true}
          placeholder='Search'
          info='Search for users, projects, or teams'
          value={search}
          handler={searchHandler}
        /> */}
      {/* </SearchContainer> */}
      <DarkModeToggle
        onClick={toggle}
        icon={value ? faMoon : faSun}
        size='2x'
      />
    </Container>
  );
};

const DarkModeToggle = styled(FontAwesomeIcon)`
  display: flex;
  padding: 1.5rem;
  margin-right: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.buttons.grey};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
    background-color: ${({ theme }) => theme.buttons.greyHover};
  }
`;

const Container = styled.header`
  z-index: 5000000;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  box-shadow: var(--box-shadow);
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 4%;
  padding-right: 2.5%;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 50%;
`;

export default HeaderMain;
