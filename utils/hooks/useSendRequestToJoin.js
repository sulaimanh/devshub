import { FieldValue, db } from "../auth/firebase";
import { queryCache, useMutation } from "react-query";

export default function useSendRequestToJoin(section, postId) {
  return useMutation(
    (value) => {
      try {
        db.collection(section)
          .doc(postId)
          .update({
            users: FieldValue.arrayUnion(value)
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
          return { ...old, users: old.users.concat(userId) };
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
