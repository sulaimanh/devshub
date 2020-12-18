import { useQuery, useQueryClient } from "react-query";

import { db } from "../auth/firebase";

export const getPost = async (_, section, postId) => {
  if (section && postId) {
    const doc = await db.collection(section).doc(postId).get();
    return JSON.parse(JSON.stringify(doc.data()));
  } else {
    return null;
  }
};

export default function usePost(section, postId, page, userId) {
  const cache = useQueryClient();
  return useQuery(
    ["posts", section, postId],
    (posts) => getPost(posts, section, postId),
    {
      initialData: () => {
        return cache
          .getQueryData(["posts", section, parseInt(page)])
          ?.docs.find((post) => post.id === userId);
      }
    }
  );
}
