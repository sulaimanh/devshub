import * as Yup from "yup";

import {
  headingSecondary as HeadingSecondary,
  paragraph as Paragraph
} from "@/components/UI/Text/Text";
import React, { useState } from "react";

import Button from "@/components/UI/Button/Button";
import Carousel from "@/components/UI/Carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "@/components/UI/Inputs/TextInput/TextInput";
import ReactWelcomeIcon from "../../../public/images/empty.svg";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import { useFormik } from "formik";

const validationScheme = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 7 characters")
    .required("Password is required")
});

export default function NewUser() {
  const { user, createPasswordForProvider } = useAuth();
  const [passwordRes, setPasswordRes] = useState({
    completed: false,
    message: "",
    errMessage: ""
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    setFieldValue,
    isSubmitting
  } = useFormik({
    initialValues: {
      password: ""
    },
    validationSchema: validationScheme,
    onSubmit: async () => {
      try {
        await createPasswordForProvider(user.email, values.password);
        setPasswordRes({
          completed: true,
          message: "You have successfully set a password"
        });
        setFieldValue("password", "");
      } catch (err) {
        setPasswordRes({
          completed: false,
          message: "",
          errMessage: err
        });
        console.log(err);
      }
    }
  });

  const setPasswordPage = (
    <SetPasswordPage>
      {!passwordRes.completed && user.providerData.length === 1 ? (
        <>
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <Paragraph size='small'>
              You signed up with your {user.signInMethod} account. You can set
              up a password for your DevsHub account below. Your email is{" "}
              {user.email}
            </Paragraph>
          </div>
          <Input
            id='password'
            type='password'
            handleBlur={handleBlur}
            value={values.password}
            handler={handleChange}
            showError={errors.password && touched.password}
            message={errors.password}
            placeholder='Password'
          />
          <Button
            color='tertiary'
            hoverColor='tertiaryHover'
            label='Submit'
            category='primary'
            handler={handleSubmit}
          />
        </>
      ) : (
        <SuccessCheck icon={faCheckCircle} size='5x' />
      )}
      <Paragraph color='primary'>{passwordRes.message}</Paragraph>
      <Paragraph color='red'>{passwordRes.errMessage}</Paragraph>
    </SetPasswordPage>
  );
  const x = [
    user.providerData.length === 1 &&
    user.providerData[0].providerId !== "password" ? (
      setPasswordPage
    ) : (
      <Paragraph>PLACEHOLDER</Paragraph>
    ),
    <Paragraph>PLACEHOLDER</Paragraph>,
    <Paragraph>PLACEHOLDER</Paragraph>
  ];
  const [num, setNum] = useState(0);
  const next = () => {};
  return (
    <Container>
      <Heading>Welcome to DevsHub, {user.name}</Heading>
      <Carousel items={x} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Icon = styled(ReactWelcomeIcon)`
  width: 25%;
  height: 55%;
  background-color: red;
`;

const Heading = styled(HeadingSecondary)`
  text-align: center;
`;

const SetPasswordPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SuccessCheck = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.fonts.tertiary};
  margin-bottom: 2rem;
`;
