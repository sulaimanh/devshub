import {
  headingTertiary as HeadingTertiary,
  paragraph as Paragraph
} from "@/components/UI/Text/Text";

import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Inputs/TextInput/TextInput";
import React from "react";
import styled from "styled-components";

export default function AddTechnology({
  techValue,
  techArr,
  setTechArr,
  backgroundInputColor,
  setFieldValue,
  handleBlur,
  handler
}) {
  const setTechHandler = (event) => {
    if (techValue.trim().length > 0) {
      setTechArr((prevState) => [...prevState, techValue]);
      techValue = "";
      setFieldValue("tech", "");
    }
  };

  const setTechEnterHandler = (event) => {
    if (event.charCode === 13 && techValue.trim().length > 0) {
      setTechArr((prevState) => [...prevState, techValue]);
      setFieldValue("tech", "");
    }
  };

  const deleteTechHandler = (removedTech) => {
    setTechArr((prevState) => {
      const updatedTechArray = prevState.filter((t) => {
        if (t !== removedTech) {
          return t;
        }
      });

      return updatedTechArray;
    });
  };

  const technology = techArr.map((t, index) => {
    return (
      <Card key={index} onClick={() => deleteTechHandler(t)}>
        <Paragraph size='small'>{t}</Paragraph>
      </Card>
    );
  });
  return (
    <Container>
      <TechContainer onKeyPress={setTechEnterHandler}>
        <Input
          id='tech'
          placeholder='Technologies used (click enter to submit)'
          type='text'
          value={techValue}
          handleBlur={handleBlur}
          handler={handler}
          backgroundColor={backgroundInputColor}
        />
        <Add>
          <AddButton
            className
            handler={setTechHandler}
            category='primary'
            color='blue'
            hoverColor='blueHover'
            label='Add'
            size='large'
            type='reset'
          />
        </Add>
      </TechContainer>
      <Cards>
        {techArr.length > 0 ? (
          <Paragraph size='small'>Click to delete</Paragraph>
        ) : null}
        <Technology>{technology}</Technology>
      </Cards>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-bottom: 3rem;
`;

const TechContainer = styled.div`
  display: flex;
  width: 100%;
  margin-right: 1rem;
`;

const Add = styled.div`
  display: flex;
  align-items: baseline;
  width: 25%;
  margin-left: 2rem;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
`;

const Technology = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  width: fit-content;
  border: 1px solid transparent;
  box-shadow: var(--box-shadow);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};

  &:hover {
    background-color: ${({ theme }) => theme.fonts.red};
    color: ${({ theme }) => theme.fonts.primaryText};
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const AddButton = styled(Button)`
  background-color: ${({ theme }) =>
    theme.isDark ? theme.buttons.tertiary : theme.buttons.primary};
`;
