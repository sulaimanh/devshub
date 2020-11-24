import { FieldValue, TimeStamp, db } from "@/utils/auth/firebase";
import { queryCache, useMutation, useQueryCache } from "react-query";

export default function useCreatePost(section, postId, page = 1) {
  const cache = useQueryCache();

  return useMutation(
    (value) => {
      if (postId) {
        db.collection(section)
          .doc(postId)
          .update({
            ...value,
            updatedAt: FieldValue.serverTimestamp()
          });
      } else {
        db.collection(section).add({
          ...value,
          users: [],
          createdAt: FieldValue.serverTimestamp()
        });
      }
    },
    {
      onMutate: (post) => {
        if (postId) {
          cache.cancelQueries(["posts", section, postId]);
          const previousValue = cache.getQueryData(["posts", section, postId]);
          cache.setQueryData(["posts", section, postId], post);

          return () =>
            cache.setQueryData(["posts", section, postId], previousValue);
        } else {
          cache.cancelQueries(["posts", section, page]);

          const previousValue = cache.getQueryData(["posts", section, page]);

          cache.setQueryData(["posts", section, page], (old) => {
            if (old?.docs !== undefined) {
              const update = old.docs;
              update.unshift(post);

              const newFirst = {
                docs: update,
                lastVisible: old.firstVisible
              };

              return newFirst;
            } else {
              const update = {
                docs: [post],
                lastVisible: null
              };

              return update;
            }
          });

          return () => previousValue;
        }
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        cache.setQueryData(["posts", section, page], previousValue),
      // After success or failure, refetch
      onSettled: async () => {
        if (postId) {
          cache.invalidateQueries(["posts", section, postId]);
          cache.invalidateQueries(["posts", section]);
        } else {
          cache.invalidateQueries(["posts", section]);
        }
      }
    }
  );
}
