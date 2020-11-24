import { db } from "../auth/firebase";
import { queryCache } from "react-query";

const getUser = async (_, userId) => {
  const doc = await db.collection("users").doc(userId).get();
  return doc.data();
};

export default function usePrefetchUser(userId) {
  queryCache.prefetchQuery(["users", userId], getUser, {
    staleTime: 5 * 60 * 1000
  });
}
