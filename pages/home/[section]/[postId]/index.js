import React, { useEffect, useState } from "react";
import usePost, { getPost } from "@/utils/hooks/usePost";

import Head from "next/head";
import { QueryCache } from "react-query";
import Spinner from "@/components/UI/Loading/Spinner";
import UserPost from "@/components/Main/Home/UserPost/UserPost";
import { dehydrate } from "react-query/hydration";
import styled from "styled-components";
import { useAuth } from "@/utils/hooks/useAuth";
import useRemoveRequestToJoin from "@/utils/hooks/useRemoveRequestToJoin";
import { useRouter } from "next/router";
import useSendRequestToJoin from "@/utils/hooks/useSendRequestToJoin";

// export async function getServerSideProps(context) {
//   const queryCache = new QueryCache();

//   await queryCache.prefetchQuery(
//     ["posts", context.params.section, context.params.postId],
//     getPost
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryCache)
//     }
//   };
// }

export default function Index({ section, ...props }) {
  const router = useRouter();
  const { user } = useAuth();
  const { status, isLoading, isError, data, error } = usePost(
    router.query?.section,
    router.query?.postId,
    router.query?.page,
    user?.id
  );

  const [sendJoinRequest, sendJoinRequestInfo] = useSendRequestToJoin(
    router.query.section,
    router.query.postId
  );
  const [removeJoinRequest, removeJoinRequestInfo] = useRemoveRequestToJoin(
    router.query.section,
    router.query.postId
  );
  const goBackHandler = () => {
    router.push("/home");
  };

  if (status === "loading" || isLoading || data === null) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>DevsHub | {data?.title}</title>
      </Head>
      <Container>
        <UserPost
          section={router.query.section}
          page={router.query.page}
          postId={router.query.postId}
          goBackHandler={goBackHandler}
          user={user}
          post={data}
          sendJoinRequest={sendJoinRequest}
          removeJoinRequest={removeJoinRequest}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  width: 90%;
  margin: 2rem 0;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.secondary : theme.backgrounds.primary};
  border-radius: 1rem;
  padding: 0rem 2.5rem 2rem 2.5rem;
  box-sizing: border-box;

  /* padding-left: 2.5%;
  padding-right: 2.5%; */
  /* box-shadow: var(--box-shadow); */
`;
