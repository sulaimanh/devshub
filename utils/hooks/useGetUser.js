import { queryCache, useQuery } from "react-query";

import { db } from "../auth/firebase";

const getUser = async (_, userId) => {
  const doc = await db.collection("users").doc(userId).get();
  return doc.data();
};

export default function useUser(userId) {
  return useQuery(["users", userId], getUser, {
    initialData: () => {
      return queryCache
        .getQueryData(["users", userId])
        ?.find((user) => user.id === userId);
    }
  });
}
