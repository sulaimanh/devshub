import { db } from "../auth/firebase";
import { useQuery } from "react-query";

const getUserPosts = async (_, ownerId) => {
  let usersPosts = { teams: [], projects: [], challenges: [] };
  const teams = await db
    .collection("teams")
    .where("ownerId", "==", ownerId)
    .get();

  usersPosts.teams = teams.docs.map((doc) => {
    return { ...doc.data(), postId: doc.id };
  });

  const projects = await db
    .collection("projects")
    .where("ownerId", "==", ownerId)
    .get();

  usersPosts.projects = projects.docs.map((doc) => {
    return { ...doc.data(), postId: doc.id };
  });

  const challenges = await db
    .collection("challenges")
    .where("ownerId", "==", ownerId)
    .get();

  usersPosts.challenges = challenges.docs.map((doc) => {
    return { ...doc.data(), postId: doc.id };
  });

  return usersPosts;
};

export default function useGetUserPosts(ownerId) {
  return useQuery(["posts", ownerId], getUserPosts);
}
