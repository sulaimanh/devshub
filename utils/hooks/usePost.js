import { useQuery, useQueryCache } from "react-query";

import { db } from "../auth/firebase";

export const getPost = async (_, section, postId) => {
  const doc = await db.collection(section).doc(postId).get();

  return JSON.parse(JSON.stringify(doc.data()));
};

export default function usePost(section, postId, page, userId) {
  const cache = useQueryCache();
  console.log(postId);
  return useQuery(["posts", section, postId], getPost, {
    initialData: () => {
      return cache
        .getQueryData(["posts", section, parseInt(page)])
        ?.docs.find((post) => post.id === userId);
    }
  });
}
