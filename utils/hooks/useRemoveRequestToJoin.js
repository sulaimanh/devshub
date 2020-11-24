import { FieldValue, db } from "../auth/firebase";
import { queryCache, useMutation } from "react-query";

export default function useRemoveRequestToJoin(section, postId) {
  return useMutation(
    (value) => {
      try {
        db.collection(section)
          .doc(postId)
          .update({
            users: FieldValue.arrayRemove(value)
          });
      } catch (err) {
        console.log(err);
      }
    },
    {
      onMutate: (userId) => {
        queryCache.cancelQueries(["posts", section, postId]);

        const previousValue = queryCache.getQueryData([
          "posts",
          section,
          postId
        ]);

        queryCache.setQueryData(["posts", section, postId], (old) => {
          // const index = old.users
          //   .map((user) => userId.ownerId)
          //   .indexOf(userId.ownerId);
          // const usersArr = old.users.splice(index, 1);
          const usersArr = old.users.filter(
            (user) => user.ownerId !== userId.ownerId
          );
          return { ...old, users: usersArr };
        });

        return () =>
          queryCache.setQueryData(["posts", section, postId], previousValue);
      },
      onError: (err, variables, previousValue) => {
        queryCache.setQueryData(["posts", section, postId], previousValue);
      },
      // After success or failure, refetch the [users, ownerId] query
      onSettled: () => {
        queryCache.invalidateQueries(["posts", section, postId]);
      }
    }
  );
}
