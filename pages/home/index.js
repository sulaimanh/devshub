import React, { useEffect, useState } from "react";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";
import usePosts, { getPosts } from "@/utils/hooks/usePosts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Loading from "@/components/UI/Loading/Ring";
import Sections from "@/components/Main/Home/Sections/Sections";
import TopSelection from "@/components/Main/Home/TopSelection/TopSelection";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";

const selections = [
  {
    heading: "Teams",
    choice: "teams",
    path: "/home/teams",
    buttonName: "Team"
  },
  {
    heading: "Projects",
    choice: "projects",
    path: "/home/projects",
    buttonName: "Project"
  },
  {
    heading: "Challenges",
    choice: "challenges",
    path: "/home/challenges",
    buttonName: "Challenge"
  }
];

//! I am not able to do SSR because of some limitations with firebase. Can't perform pagination
// export async function getServerSideProps() {
//   const queryCache = new QueryCache();

//   await queryCache.prefetchQuery(["posts", "teams", null], getPosts);
//   console.log(queryCache);

// return {
//   props: {
//     dehydratedState: dehydrate(queryCache)
//   }
// };
// }

const Home = ({ ...props }) => {
  const cache = useQueryClient();
  const [selectedChoice, setSelectedChoice] = useState("teams");
  const [section, setSection] = useState("Team");
  const [showAdd, setShowAdd] = useState(false);
  const router = useRouter();
  const [lastVisible, setLastVisible] = useState({
    page: 1,
    curr: null,
    isBackwards: false,
    section: selectedChoice
  });

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData
  } = usePosts(
    selectedChoice,
    lastVisible.curr,
    lastVisible.page,
    lastVisible.isBackwards
  );

  // console.log(data);

  useEffect(() => {
    router.push(`/home?page=${lastVisible.page}`, "/home");
  }, [selectedChoice, lastVisible.page]);

  useEffect(() => {
    // - We are setting the last viewed post in order to maintain pagination
    const lastCache = cache.getQueryData("lastVisible");
    const last = lastCache
      ? lastCache
      : { page: 1, curr: last, isBackwards: false };
    setLastVisible(last);
  }, [selectedChoice]);

  useEffect(async () => {
    // - We are setting the last viewed post in order to maintain pagination
    cache.setQueryData("lastVisible", lastVisible, {
      staleTime: Infinity
    });
    if (data?.disbaledPage !== lastVisible.page && !lastVisible.isBackwards) {
      await cache.prefetchQuery(
        ["posts", selectedChoice, lastVisible.page],
        (posts, section, page) =>
          getPosts(
            posts,
            section,
            page,
            lastVisible.curr,
            lastVisible.isBackwards
          )
      );
    }
  }, [lastVisible.curr, getPosts]);

  const selectedChoiceHandler = (choice, heading) => {
    setSelectedChoice(choice);
    setSection(heading);
  };

  const showAddHandler = (event, id) => {
    setShowAdd((prevState) => !prevState);
  };

  return (
    <Container>
      <TopSelection
        showAddHandler={showAddHandler}
        showAdd={showAdd}
        selectedChoiceHandler={selectedChoiceHandler}
        selectedChoice={selectedChoice}
        section={section}
        selections={selections}
      />

      {isFetching || data?.docs === undefined ? (
        <div style={{ marginTop: "5rem" }}>
          <Loading />
        </div>
      ) : status === "error" ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Sections
            page={lastVisible.page}
            section={selectedChoice}
            data={data.docs}
          />
          <IconContainer>
            {lastVisible.page === 1 ? null : (
              <Icon
                size='5x'
                icon={faArrowAltCircleLeft}
                disabled={lastVisible.page === 1}
                onClick={() =>
                  setLastVisible((prevValue) => {
                    return {
                      page: prevValue.page - 1,
                      curr: data.firstVisible,
                      isBackwards: true
                    };
                  })
                }
              />
            )}

            {lastVisible.page === data.disabledPage ? null : (
              <Icon
                size='5x'
                icon={faArrowAltCircleRight}
                disabled={lastVisible.page === data.disabledPage}
                onClick={() => {
                  setLastVisible((prevValue) => {
                    return {
                      page: prevValue.page + 1,
                      curr: data.lastVisible,
                      isBackwards: false
                    };
                  });
                }}
              />
            )}
          </IconContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: ${({ disabled }) => (disabled ? "none" : null)};
  width: 90%;
  margin: 2rem 0;

  background-color: ${({ theme }) =>
    theme.isDark ? theme.backgrounds.primary : theme.backgrounds.secondary};
`;

const IconContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.fonts.primary};

  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : null)};
  &:hover {
    color: ${({ theme }) => theme.fonts.tertiary};
  }
  &:not(:last-child) {
    margin-right: 3rem;
  }
`;

export default Home;
