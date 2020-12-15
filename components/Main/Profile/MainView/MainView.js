import React, { useState } from "react";

import { paragraph as Paragraph } from "@/components/UI/Text/Text";
import { device } from "@/styles/Devices";
import styled from "styled-components";

const sections = ["About Me", "My Projects", "Interested In"];

export default function MainView() {
  const [selection, setSelection] = useState(sections[0]);

  const changeSection = (index) => {
    setSelection(sections[index]);
  };

  const menu = (
    <SectionContainer>
      {sections.map((sect, index) => {
        return (
          <>
            <Paragraph
              hoverColor={selection !== sect ? "tertiary" : null}
              clickable={selection !== sect ? true : false}
              color={selection === sect ? "primary" : "darkGrey"}
              handler={() => changeSection(index)}
            >
              {sect}
            </Paragraph>
            {index !== sections.length - 1 ? (
              <Paragraph color='darkGrey'>&nbsp;&nbsp;|&nbsp;&nbsp;</Paragraph>
            ) : null}
          </>
        );
      })}
    </SectionContainer>
  );

  return <Container>{menu}</Container>;
}

const Container = styled.div`
  width: 75%;
  @media ${device.tabLand} {
    width: 65%;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
`;
