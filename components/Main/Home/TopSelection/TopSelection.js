import Add from "@/components/Main/Home/Add/Add";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import React from "react";
import styled from "styled-components";

export default function TopSelection({
  selectedChoice,
  section,
  showAdd,
  selectedChoiceHandler,
  showAddHandler,
  selections
}) {
  const view = selections.map((selection, index) => {
    return (
      <Selections
        key={index}
        onClick={() =>
          selectedChoiceHandler(selection.choice, selection.buttonName)
        }
        selected={selection.choice === selectedChoice}
      >
        <SectionTitle selected={selection.choice === selectedChoice} size='reg'>
          &nbsp;{selection.heading}
        </SectionTitle>
      </Selections>
    );
  });

  return (
    <React.Fragment>
      {showAdd ? (
        <Add
          post={null}
          handler={showAddHandler}
          section={section}
          postId={null}
          selectedChoice={selectedChoice}
        />
      ) : null}

      <Container>
        <TopContainer>
          <TopLinks>{view}</TopLinks>
          <HrContainer>
            <HrOne section={section} />
            <HrTwo />
          </HrContainer>
        </TopContainer>

        <TopAdd>
          <AddButton
            className
            handler={showAddHandler}
            category='tertiary'
            type='button'
            size='large'
            label={`Post a ${section}`}
          />
        </TopAdd>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
  width: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  flex-direction: column;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  transition: all ease 0.3s;

  &:hover {
    box-shadow: var(--box-shadow);
  }
`;

const TopLinks = styled.div`
  display: flex;
`;

const HrContainer = styled.div`
  display: flex;
  position: relative;
`;

const HrOne = styled.hr`
  display: flex;
  flex-direction: column;
  height: 0.4rem;
  width: 33.33%;
  overflow: visible;
  position: absolute;
  border-radius: 0 0 1rem 1rem;
  margin: 0;
  background: ${({ theme }) => theme.fonts.primary};
  border: none;
  transition: 0.3s ease-in-out;
  z-index: 2;

  margin-left: ${({ section }) =>
    section === "Team" ? 0 : section === "Project" ? "33.33%" : "66.66%"};
`;

const HrTwo = styled.hr`
  display: flex;
  height: 0.4rem;
  width: 100%;
  overflow: visible;
  z-index: 1;
  position: absolute;
  border-radius: 0 0 1rem 1rem;
  margin: 0;
  background: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  border: none;
  transition: 0.3s ease-in-out;
`;

const TopAdd = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
`;

const AddButton = styled(Button)`
  display: flex;
  width: 100%;
  padding: 1.5rem;
  justify-content: center;
  align-content: center;
  border-radius: 1rem;
`;

const SectionTitle = styled(Paragraph)`
  color: ${({ selected, theme }) =>
    selected ? theme.fonts.primary : theme.fonts.primaryText};
`;

const Selections = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.3rem 0rem;
  border-radius: 1rem 1rem 0 0;
  text-decoration: none;
  color: ${({ theme, selected }) =>
    selected ? theme.fonts.primary : theme.fonts.primaryText};

  cursor: ${({ selected }) => (selected ? "default" : "pointer")};
  pointer-events: ${({ selected }) => (selected ? "none" : null)};

  &:hover {
    color: ${({ theme }) => theme.fonts.tertiary};
  }

  &:hover > ${SectionTitle} {
    color: ${({ theme }) => theme.fonts.tertiary};
  }
`;
