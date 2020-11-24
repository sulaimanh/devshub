import * as Yup from "yup";

import React, { useEffect } from "react";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

import Button from "@/components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headingSecondary as HeadingSecondary } from "@/components/UI/Text/Text";
import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import RingSpinner from "@/components/UI/Loading/Ring";
import TextInput from "@/components/UI/Inputs/TextInput/TextInput";
import { device } from "@/styles/Devices";
import { mapUserData } from "@/utils/auth/mapUserData";
import { setUserCookie } from "@/utils/auth/userCookies";
import styled from "styled-components";
import { useAuth } from "../../../utils/hooks/useAuth";
import useCreateUser from "@/utils/hooks/useCreateUser";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

const validationSchemaSignUp = Yup.object().shape({
  fullName: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please provide a valid email")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please enter your password")
});
const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email("Please provide an valid email")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 7 characters")
    .required("Password is Required")
});

const SignIn = ({ isSignUp, forgotPasswordHandler, toggleModalHandler }) => {
  const {
    user,
    signIn,
    signUp,
    signInWithGitHub,
    signInWithGoogle,
    sendVerifyEmail
  } = useAuth();

  const validationSchema = isSignUp
    ? validationSchemaSignUp
    : validationSchemaSignIn;

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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: () => attemptSignIn(isSignUp ? "emailSignUp" : "emailSignIn")
  });
  const resetError = { message: "", isError: false };
  const [error, setError] = useState(resetError);
  const [saveUser] = useCreateUser();

  useEffect(() => {
    router.prefetch("/home");
  });

  const attemptSignIn = async (method) => {
    try {
      let res = null;

      if (method === "google") {
        res = await signInWithGoogle();
      } else if (method === "github") {
        res = await signInWithGitHub();
      } else if (method === "emailSignUp") {
        res = await signUp(values.email, values.password);
      } else if (method === "emailSignIn") {
        res = await signIn(values.email, values.password);
      }

      if (method === "emailSignUp") {
        await res.user.updateProfile({
          displayName: values.fullName
        });
      }

      const { user, additionalUserInfo } = res;
      const userData = await mapUserData(user);
      userData.signInMethod = additionalUserInfo.providerId;

      setUserCookie(userData);
      if (userData.isNewUser) {
        sendVerifyEmail();
        saveUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          photoURL: userData.photoURL || ""
        });
      }
      // router.push("/home");
    } catch (err) {
      setError({ message: err.message, isError: true });
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <HeadingContainer>
          <HeadingSecondary>
            {isSignUp ? "Sign Up" : "Sign In"}
          </HeadingSecondary>
        </HeadingContainer>

        <TextContainer>
          {isSignUp ? (
            <TextInput
              placeholder='Full Name'
              id='fullName'
              type='text'
              name='fullName'
              handleBlur={handleBlur}
              value={values.fullName}
              handler={handleChange}
              showError={errors.fullName && touched.fullName}
              message={errors.fullName}
            />
          ) : null}

          <TextInput
            placeholder='Email'
            id='email'
            type='email'
            value={values.email}
            handleBlur={handleBlur}
            handler={handleChange}
            showError={errors.email && touched.email}
            message={errors.email}
          />

          <TextInput
            placeholder='Password'
            id='password'
            type='password'
            handleBlur={handleBlur}
            value={values.password}
            handler={handleChange}
            showError={errors.password && touched.password}
            message={errors.password}
          />
          {isSignUp ? (
            <TextInput
              placeholder='Confirm Password'
              id='confirmPassword'
              type='password'
              value={values.confirmPassword}
              handleBlur={handleBlur}
              handler={handleChange}
              showError={errors.confirmPassword && touched.confirmPassword}
              message={errors.confirmPassword}
            />
          ) : null}
          <ForgotContainer>
            {isSignUp ? (
              <Paragraph
                weight='bold'
                handler={() => toggleModalHandler(false, true)}
                size='small'
                color='primary'
                hoverColor='tertiary'
                clickable
              >
                Already have an account?
              </Paragraph>
            ) : null}
          </ForgotContainer>
          <ForgotContainer>
            {!isSignUp ? (
              <Paragraph
                weight='bold'
                handler={() => forgotPasswordHandler()}
                size='small'
                color='primary'
                hoverColor='tertiary'
                clickable
              >
                Forgot password?
              </Paragraph>
            ) : null}
          </ForgotContainer>
          {error.isError ? (
            <Paragraph size='small' color='red'>
              {error.message}
            </Paragraph>
          ) : null}
        </TextContainer>

        <SubmitContainer>
          {isSubmitting ? (
            <>
              <RingContainer>
                <RingSpinner />
              </RingContainer>
            </>
          ) : (
            <>
              <Button
                type='submit'
                type='submit'
                category='tertiary'
                label='Submit'
              />

              <LoginContainer>
                <Button
                  handler={() => attemptSignIn("github")}
                  category='github'
                  label='GitHub'
                  size='small'
                  type='button'
                  icon={<FontAwesomeIcon icon={faGithub} />}
                />
                <Button
                  handler={() => attemptSignIn("google")}
                  category='google'
                  size='small'
                  type='button'
                  icon={<FontAwesomeIcon icon={faGoogle} />}
                  label='Google'
                />
              </LoginContainer>
            </>
          )}
        </SubmitContainer>
      </FormContainer>
    </>
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

const RingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
`;

const ForgotContainer = styled.div`
  display: flex;
  /* width: 100%; */
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

export default SignIn;
