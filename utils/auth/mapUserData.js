export const mapUserData = async (user) => {
  const { uid, email, displayName, emailVerified, photoURL } = user;
  const isNewUser = user.metadata.lastSignInTime === user.metadata.creationTime;

  const token = await user.getIdToken(true);

  return {
    id: uid,
    email,
    token,
    name: displayName,
    emailVerified: emailVerified,
    isNewUser: isNewUser,
    photoURL: photoURL
  };
};
