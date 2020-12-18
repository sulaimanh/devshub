import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firebase } from "../auth/firebase";
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie
} from "@/utils/auth/userCookies";

import { mapUserData } from "@/utils/auth/mapUserData";
import { useRouter } from "next/router";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = (email, password, name) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return auth.signInWithPopup(provider);
  };

  const signInWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    return auth.signInWithPopup(provider);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const sendPasswordResetEmail = (email) => {
    const actionCodeSettings = {
      url: "http://localhost:3000/",
      handleCodeInApp: true
    };
    return auth.sendPasswordResetEmail(email, actionCodeSettings).then(() => {
      return true;
    });
  };

  const confirmPasswordReset = (code, password) => {
    return auth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };
  const sendVerifyEmail = () => {
    return auth.currentUser.sendEmailVerification();
  };

  // ! Need to implement this
  const createPasswordForProvider = (email, password) => {
    // https://firebase.google.com/docs/auth/web/account-linking#link-email-address-and-password-credentials-to-a-user-account
    var credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    return auth.currentUser.linkWithCredential(credential);

    // .then(function (usercred) {
    //   var user = usercred.user;
    //   console.log("Account linking success", user);
    // })
    // .catch(function (error) {
    //   console.log("Account linking error", error);
    // });
  };

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const provider = user.providerData;
          const userData = await mapUserData(user);
          userData.providerData = provider;
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser();
        }
      });

    const userFromCookie = getUserFromCookie();

    if (!userFromCookie) {
      router.push("/");
      setLoading(false);
      return;
    }

    setUser(userFromCookie);

    setLoading(false);
    return () => {
      cancelAuthListener();
    };
  }, []);

  return {
    sendVerifyEmail,
    loading,
    user,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    createPasswordForProvider
  };
}
