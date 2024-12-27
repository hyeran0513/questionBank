import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  flex: 1;
  margin: 0 auto;
  padding: 30px 20px;
  max-width: 1240px;
  width: 100%;
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </LayoutWrapper>
  );
};

export default MainLayout;