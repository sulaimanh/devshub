import * as Yup from "yup";

import {
  headingSecondary as HeadingSecondary,
  headingTertiary as HeadingTertiary
} from "@/components/UI/Text/Text";
import React, { useState } from "react";

import AddTechnology from "@/components/UI/Technology/AddTechnology/AddTechnology";
import Button from "@/components/UI/Button/Button";
import Checkbox from "@/components/UI/Inputs/Checkbox/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreInfo from "@/components/UI/MoreInfo/MoreInfo";
import TextInput from "@/components/UI/Inputs/TextInput/TextInput";
import { device } from "@/styles/Devices";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import useCreateEditPost from "@/utils/hooks/useCreateEditPost";
import { useFormik } from "formik";
import { useRouter } from "next/router";

// import useCreateEditPost from "@/utils/hooks/useCreateEditPost";
// import { useRouteMatch } from "react-router-dom";

export default function Add({
  handler,
  post,
  postId,
  section,
  selectedChoice,
  page,
  ...props
}) {
  const [isCheckbox, setIsCheckbox] = useState({
    repo: post ? (post.repo !== "" ? true : false) : false,
    challenge: post ? (post.challenge !== "" ? true : false) : false
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please enter a title"),
    description: Yup.string().required("Please enter a description"),
    requirements:
      section === "Challenge"
        ? null
        : Yup.string().required("Please enter requirements"),
    numOfDevelopers:
      section === "Challenge"
        ? null
        : Yup.number()
            .moreThan(-1, "You must enter a positive number")
            .required("Please enter the number of developers working"),
    numOfDevelopersNeeded:
      section === "Challenge"
        ? null
        : Yup.number()
            .moreThan(-1, "You must enter a positive number")
            .required(
              "Please enter the number of developers you are looking for"
            ),
    repo: isCheckbox.repo
      ? Yup.string()
          .url("Please enter a valid link (https://example.com)")
          .required("Please add your repository")
      : null,
    challenge: isCheckbox.challenge
      ? Yup.string()
          .url("Please enter a valid link (https://example.com)")
          .required("Please add your challenge")
      : null
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleReset,
    isValid,
    setFieldValue,
    handleSubmit,
    isSubmitting
  } = useFormik({
    initialValues: {
      title: post ? post.title : "",
      description: post ? post.description : "",
      requirements: post ? post.requirements : "",
      numOfDevelopers: post ? post.numOfDevelopers : "",
      numOfDevelopersNeeded: post ? post.numOfDevelopersNeeded : "",
      tech: "",
      repo: post ? post.repo : "",
      challenge: post ? post.challenge : ""
    },
    validationSchema: validationSchema,
    onSubmit: () => postProjectHandler()
  });

  const [techArr, setTechArr] = useState(post ? post.techArr : []);
  const { user } = useAuth();
  const router = useRouter();

  const [savePost, { status, data, error }] = useCreateEditPost(
    selectedChoice,
    postId,
    page ? page : 1
  );

  const setInputHandler = (event) => {
    const value = event.target.value;
    const id = event.target.id;

    setInput((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const checkboxHandler = (isClicked, id) => {
    setIsCheckbox((prevState) => {
      return { ...prevState, [id]: isClicked };
    });
  };

  const postProjectHandler = async () => {
    // delete input.tech;

    await savePost({
      id: user.id,
      name: user.name,
      email: user.email,
      techArr: techArr,
      users: post ? post.users : null,
      views: post ? post.views : 0,
      ...values
    });
    handler();
  };

  return (
    <Container>
      <InnerContainer>
        <AddTop>
          <BackButton size='2x' onClick={handler} icon={faArrowCircleLeft} />
          <HeadingSecondary>Post a {section}</HeadingSecondary>
        </AddTop>
        <Heading>
          <TertiaryHeading>Title</TertiaryHeading>
          <TextInput
            id='title'
            placeholder={`Enter ${section} Name`}
            value={values.title}
            type='text'
            handleBlur={handleBlur}
            handler={handleChange}
            color='black'
            showError={errors.title && touched.title}
            message={errors.title}
          />
        </Heading>
        <Row>
          <Heading>
            <TertiaryHeading>Description</TertiaryHeading>
            <TextInput
              id='description'
              placeholder={`Enter ${section} description`}
              type='text'
              value={values.description}
              handleBlur={handleBlur}
              handler={handleChange}
              backgroundColor='white'
              showError={errors.description && touched.description}
              message={errors.description}
              isTextArea
            />
          </Heading>
          {section === "Challenge" ? null : (
            <Heading>
              <TertiaryHeading>Requirements</TertiaryHeading>
              <TextInput
                id='requirements'
                placeholder={`Enter ${section} requirements`}
                type='text'
                value={values.requirements}
                handleBlur={handleBlur}
                handler={handleChange}
                showError={errors.requirements && touched.requirements}
                message={errors.requirements}
                backgroundColor='white'
                isTextArea
              />
            </Heading>
          )}
        </Row>
        {section === "Challenge" ? null : (
          <Row>
            <Heading>
              <TertiaryHeading>Number of Developers</TertiaryHeading>
              <TextInput
                id='numOfDevelopers'
                placeholder='# of developers'
                type='number'
                value={values.numOfDevelopers}
                handleBlur={handleBlur}
                handler={handleChange}
                isRequired={true}
                backgroundColor='white'
                showError={errors.numOfDevelopers && touched.numOfDevelopers}
                message={errors.numOfDevelopers}
              />
            </Heading>
            <Heading>
              <TertiaryHeading>Number of Developers Needed</TertiaryHeading>
              <TextInput
                id='numOfDevelopersNeeded'
                placeholder='# of developers you need'
                type='number'
                value={values.numOfDevelopersNeeded}
                handleBlur={handleBlur}
                handler={handleChange}
                isRequired={true}
                backgroundColor='white'
                showError={
                  errors.numOfDevelopersNeeded && touched.numOfDevelopersNeeded
                }
                message={errors.numOfDevelopersNeeded}
              />
            </Heading>
          </Row>
        )}

        {section === "Challenge" ? (
          <Heading>
            <Check>
              <TertiaryHeading>Link to Challenge</TertiaryHeading>
              <MoreInfoContainer>
                <MoreInfo direction='middle'>
                  Enter the link for the challenge.
                </MoreInfo>
              </MoreInfoContainer>
            </Check>
            <TextInput
              id='challenge'
              placeholder={`Enter link to challenge`}
              type='text'
              value={values.challenge}
              handleBlur={handleBlur}
              handler={handleChange}
              isRequired={true}
              backgroundColor='white'
            />
          </Heading>
        ) : (
          <Heading>
            <TertiaryHeading>Technology</TertiaryHeading>
            <AddTechnology
              setFieldValue={setFieldValue}
              techValue={values.tech}
              setInputHandler={setInputHandler}
              setTechArr={setTechArr}
              handleBlur={handleBlur}
              handler={handleChange}
              techArr={techArr}
              backgroundInputColor='white'
            />
          </Heading>
        )}

        {section === "Challenge" ? null : (
          <Heading>
            <TertiaryHeading>Repository</TertiaryHeading>
            <Check>
              <Checkbox
                id='repo'
                hasValue={isCheckbox.repo}
                handler={checkboxHandler}
              >
                Would you like to add a repository?
              </Checkbox>
            </Check>
            {isCheckbox.repo ? (
              <div>
                <TertiaryHeading>Link to Repository</TertiaryHeading>
                <TextInput
                  id='repo'
                  placeholder='Link to repository'
                  type='text'
                  value={values.repo}
                  handleBlur={handleBlur}
                  handler={handleChange}
                  isRequired={true}
                  backgroundColor='white'
                  showError={errors.repo && touched.repo}
                  message={errors.repo}
                />
              </div>
            ) : null}
          </Heading>
        )}

        {section === "Challenge" ? null : (
          <Challenge>
            <TertiaryHeading>Challenge</TertiaryHeading>
            <Check>
              <Checkbox
                hasValue={isCheckbox.challenge}
                id='challenge'
                handler={checkboxHandler}
              >
                Is a challenge required?
              </Checkbox>

              <MoreInfoContainer>
                <MoreInfo bottom='3'>
                  You can require applicants to take a challenge before being
                  able to apply. Please go to the Challenges section to create
                  your challenge and paste your link here.
                </MoreInfo>
              </MoreInfoContainer>
            </Check>

            {isCheckbox.challenge ? (
              <div>
                <TertiaryHeading>Link to Challenge</TertiaryHeading>
                <TextInput
                  id='challenge'
                  placeholder='Link to challenge'
                  type='text'
                  value={values.challenge}
                  handleBlur={handleBlur}
                  handler={handleChange}
                  isRequired={true}
                  backgroundColor='white'
                  showError={errors.challenge && touched.challenge}
                  message={errors.challenge}
                />
              </div>
            ) : null}
          </Challenge>
        )}

        <SubmitContainer>
          <Button
            handler={handleSubmit}
            category='tertiary'
            label='Post'
            type='submit'
            size='large'
          />
        </SubmitContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 30000000000;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  min-height: 100%;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
`;

const InnerContainer = styled.div`
  padding: 5rem 5rem 7rem 5rem;
`;

const AddTop = styled.div`
  /* position: relative; */
  display: flex;
  /* width: 100%; */
  margin-bottom: 3rem;
`;

const BackButton = styled(FontAwesomeIcon)`
  width: 2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  background-color: ${({ theme }) => theme.backgrounds.grey};
  border-radius: 2rem;
  margin-right: 3rem;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  /* width: 100%; */

  @media ${device.tabPort} {
    flex-direction: column;
  }
`;

const Check = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const MoreInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

const Challenge = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

const SubmitContainer = styled.div`
  /* position: relative; */
  display: flex;
  margin-top: 3rem;
`;

const TertiaryHeading = styled(HeadingTertiary)`
  margin-bottom: 1rem;
`;
