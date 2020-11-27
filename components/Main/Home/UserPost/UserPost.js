import {
  headingSecondary as HeadingSecondary,
  link as Link,
  paragraph as Paragraph,
  pre as Pre
} from "../../../UI/Text/Text";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  faArrowCircleLeft,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

import Add from "@/components/Main/Home/Add/Add";
import Button from "@/components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headingTertiary as HeadingTertiary } from "@/components/UI/Text/Text";
import Technology from "@/components/UI/Technology/Technology";
import TextInput from "@/components/UI/Inputs/TextInput/TextInput";
import { device } from "@/styles/Devices";
import styled from "styled-components";

const sects = { teams: "Team", projects: "Project", challenges: "Challenge" };

const UserPost = React.memo(
  ({
    post,
    user,
    page,
    goBackHandler,
    sendJoinRequest,
    removeJoinRequest,
    section,
    postId,
    ...props
  }) => {
    const [showAdd, setShowAdd] = useState(false);

    const goToUserHandler = () => {
      history.push("/profile/" + post.id);
    };

    const editPostHandler = () => {
      setShowAdd((prevState) => !prevState);
    };

    const joinPostHandler = () => {
      sendJoinRequest({ id: user.id, name: user.name });
    };

    const leavePostHandler = () => {
      removeJoinRequest({
        id: user.id,
        name: user.name
      });
    };

    return (
      <React.Fragment>
        {showAdd ? (
          <Add
            handler={editPostHandler}
            post={post}
            selectedChoice={section}
            section={sects[section]}
            postId={postId}
            page={page}
          />
        ) : null}
        <Container>
          <TopContainer>
            <Icon
              onClick={goBackHandler}
              className='top'
              icon={faArrowCircleLeft}
              size='3x'
            />
            <RequestContainer>
              {post.users.some((curr) => curr.id === user?.id) ? (
                <Icon
                  onClick={leavePostHandler}
                  className='check'
                  icon={faCheckCircle}
                  size='3x'
                />
              ) : user?.id === post.id ? (
                <Button
                  handler={editPostHandler}
                  category='primary'
                  color='blue'
                  hoverColor='blueHover'
                  type='button'
                  size='small'
                  label='Edit Post'
                />
              ) : (
                <Button
                  handler={joinPostHandler}
                  category='tertiary'
                  label='Send Request'
                  size='small'
                  type='button'
                />
              )}
            </RequestContainer>
          </TopContainer>

          <DetailsContainer>
            <LeftContainer>
              <LeftHeading>
                <HeadingSecondary>{post.title}</HeadingSecondary>
              </LeftHeading>
              <Pre>{post.description}</Pre>
            </LeftContainer>

            <RightContainer>
              <Link
                color='primary'
                href={`/${post.id}`}
                handler={goToUserHandler}
                pad='0rem'
                clickable
              >
                {post.name}
              </Link>

              <Paragraph>Developers: {post.numOfDevelopers}</Paragraph>
              <Paragraph>
                Developers needed: {post.numOfDevelopersNeeded}
              </Paragraph>
              {post.repo ? (
                <Link
                  hoverColor='tertiary'
                  color='primary'
                  href={post.repo}
                  clickable
                  pad='0'
                >
                  Go to Repository
                </Link>
              ) : null}
              {post.challenge ? (
                <Link
                  hoverColor='tertiary'
                  color='primary'
                  href={post.challenge}
                  clickable
                  pad='0'
                >
                  Go to Challenge
                </Link>
              ) : null}
            </RightContainer>
          </DetailsContainer>

          <ReqContainer>
            <HeadingTertiary>Requirements</HeadingTertiary>
            <Pre>{post.requirements}</Pre>
          </ReqContainer>
          <TechContainer>
            <Technology tech={post.techArr} />
          </TechContainer>
        </Container>
      </React.Fragment>
    );
  }
);

const Container = styled.div`
  width: 100%;
`;

const TopContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  margin-top: 2rem;
  margin-bottom: 1rem;
  @media ${device.tabPort} {
    margin-bottom: 0rem;
  }
`;

const RequestContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: baseline;
  @media ${device.tabPort} {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 60%;
  @media ${device.tabPort} {
    width: 100%;
    order: 2;
  }
`;

const LeftHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  width: 40%;

  @media ${device.tabPort} {
    width: 100%;
    order: 1;
    margin-bottom: 1rem;
    align-items: flex-start;
  }
`;

const ReqContainer = styled.div``;
const TechContainer = styled.div``;

const Icon = styled(FontAwesomeIcon)`
  &.top {
    color: ${({ theme }) => theme.fonts.primary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.fonts.tertiary};
    }
  }

  &.check {
    color: ${({ theme }) => theme.fonts.tertiary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.fonts.red};
    }
  }
`;

export default UserPost;
