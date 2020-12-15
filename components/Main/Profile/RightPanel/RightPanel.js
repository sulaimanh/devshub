import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Inputs/TextInput/TextInput";
import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import React from "react";
import { device } from "@/styles/Devices";
import styled from "styled-components";

export default function RightPanel() {
  return (
    <Container>
      <ProfilePic src='https://media-exp1.licdn.com/dms/image/C4E03AQEfnBKVMWWjNw/profile-displayphoto-shrink_400_400/0/1567651664117?e=1613606400&v=beta&t=JVz6QcFzAIzWWUSZ9CpYpOqOcA7DNAgehXZlImMAR4E' />
      <Paragraph size='xl' weight='bold'>
        Sulaiman Hamouda
      </Paragraph>
      <ButtonContainer>
        <Button label='Edit Profile' category='tertiary' />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tabLand} {
    width: 35%;
  }
`;

const ButtonContainer = styled.div`
  width: 60%;
  margin-top: 1rem;
`;

const ProfilePic = styled.img`
  width: 55%;
  border-radius: 100%;
  margin-bottom: 2rem;
`;
