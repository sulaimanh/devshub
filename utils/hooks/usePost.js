import { queryCache, useQuery } from "react-query";

import { db } from "../auth/firebase";

export const getPost = async (_, section, postId) => {
  const doc = await db.collection(section).doc(postId).get();

  return JSON.parse(JSON.stringify(doc.data()));
};

export default function usePost(section, postId, page) {
  return useQuery(["posts", section, postId], getPost, {
    initialData: () => {
      return queryCache
        .getQueryData(["posts", section, page])
        ?.find((post) => post.id === postId);
    }
  });
}
