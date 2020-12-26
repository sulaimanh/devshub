import { useQuery, useQueryClient } from "react-query";

import { db } from "../auth/firebase";

const getUser = async (_, userId) => {
  if (!userId) {
    return null;
  }
  const doc = await db.collection("users").doc(userId).get();

  return doc.data();
};

export default function useUser(userId) {
  const cache = useQueryClient();

  return useQuery(["users", userId], (users) => getUser(users, userId), {
    initialData: (userId) => {
      return cache
        .getQueryData(["users", userId])
        ?.find((user) => user.id === userId);
    }
  });
}
