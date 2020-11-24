import { queryCache, useMutation } from "react-query";

import { db } from "../auth/firebase";

export default function useUpdateUser(ownerId) {
  return useMutation(
    (value) => {
      try {
        db.collection("users").doc(value.ownerId).update(value);
      } catch (err) {
        console.log(err);
      }
    },
    {
      onMutate: (user) => {
        queryCache.cancelQueries(["users", ownerId]);

        const previousValue = queryCache.getQueryData(["users", ownerId]);

        queryCache.setQueryData(["users", ownerId], (old) => {
          return { ...old, ...user };
        });

        return () => queryCache.setQueryData(["users", ownerId], previousValue);
      },
      onError: (err, variables, previousValue) => {
        queryCache.setQueryData(["users", ownerId], previousValue);
      },
      // After success or failure, refetch the [users, ownerId] query
      onSettled: () => {
        queryCache.invalidateQueries(["users", ownerId]);
      }
    }
  );
}
