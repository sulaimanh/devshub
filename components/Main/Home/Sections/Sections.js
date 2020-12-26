import React, { useEffect } from "react";

import Card from "@/components/UI/Card/Card";
import { useAuth } from "@/utils/hooks/useAuth";
import useCreateUser from "@/utils/hooks/useCreateUser";
import useGetUser from "@/utils/hooks/useGetUser";
import { useRouter } from "next/router";

export default function Sections({ page, data, section, ...props }) {
  const router = useRouter();
  const { user } = useAuth();
  const userData = useGetUser(user?.id);
  const updateUser = useCreateUser();

  useEffect(() => {
    router.prefetch("/home/[section]/[postId]");
  }, []);

  const handler = (id, index) => {
    router.push(
      {
        pathname: `/home/${section}/${id}`,
        query: { page: page }
      },
      `/home/${section}/${id}`
    );
  };
  // console.log(userData.data);

  const likeCardHandler = (isLiked, id) => {
    if (isLiked === "true") {
      const index = userData.data.likes.findIndex((like) => like.id === id);
      console.log(index);
      userData.data.likes.splice(index, 1);
    } else {
      userData.data.likes.push({ section: section, id: id });
    }

    updateUser.mutate(userData.data);
  };

  return (
    <>
      {data.map((doc, index) => {
        return (
          <Card
            index={index}
            page={page}
            section={section}
            key={index}
            handler={handler}
            title={doc.title}
            id={doc.postId}
            description={doc.description}
            tech={doc.techArr}
            likeCardHandler={likeCardHandler}
            likes={userData?.data?.likes}
          />
        );
      })}
    </>
  );
}
