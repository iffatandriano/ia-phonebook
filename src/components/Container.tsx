"use client";
import React from "react";

import styled from "@emotion/styled";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      <MainContent className="bg-gray-100 m-auto min-h-screen">
        {children}
      </MainContent>
    </div>
  );
};

const MainContent = styled.div`
  max-width: 500px;
`;

export default Container;
