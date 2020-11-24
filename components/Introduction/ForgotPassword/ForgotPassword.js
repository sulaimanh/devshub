import * as Yup from "yup";

import React, { useEffect } from "react";

import Button from "@/components/UI/Button/Button";
import { headingSecondary as HeadingSecondary } from "@/components/UI/Text/Text";
import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import TextInput from "@/components/UI/Inputs/TextInput/TextInput";
import { device } from "@/styles/Devices";
import styled from "styled-components";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please provide a valid email")
    .required("Email is Required")
});
const ForgotPassword = ({ forgotPasswordHandler }) => {
  const { sendPasswordResetEmail } = useAuth();

  const router = useRouter();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    isSubmitting
  } = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: () => attemptReset()
  });
  const resetError = { message: "", isError: false };
  const [error, setError] = useState(resetError);
  const [success, setSuccess] = useState(false);

  const attemptReset = async (method) => {
    try {
      setError(resetError);
      await sendPasswordResetEmail(values.email);
      setSuccess(true);
    } catch (err) {
      setError({ message: err.message, isError: true });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <HeadingContainer>
        <HeadingSecondary>Reset Password</HeadingSecondary>
      </HeadingContainer>

      <TextContainer>
        <TextInput
          placeholder='Email'
          id='email'
          type='email'
          handleBlur={handleBlur}
          value={values.email}
          handler={handleChange}
          showError={errors.email && touched.email}
          message={errors.email}
        />

        {error.isError ? (
          <Paragraph size='small' color='red'>
            {error.message}
          </Paragraph>
        ) : null}
        {success ? (
          <SuccessContainer>
            <Paragraph size='small' color='primary'>
              Please go to {values.email} to reset your password
            </Paragraph>
          </SuccessContainer>
        ) : null}
      </TextContainer>

      <SubmitContainer>
        <Button
          type='submit'
          type='submit'
          category='tertiary'
          label='Submit'
        />
      </SubmitContainer>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 2rem;
  width: 70%;

  @media ${device.bigDesktop} {
    width: 100%;
  }

  @media ${device.tabPort} {
    width: 100%;
  }

  &.isModal {
    width: 100%;
  }
`;

const HeadingContainer = styled.div``;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SuccessContainer = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 1rem;
`;

export default ForgotPassword;
