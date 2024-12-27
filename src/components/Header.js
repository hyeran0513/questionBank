import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiMehBlank } from "react-icons/bi";

const HeaderWrapper = styled.header`
  height: 100px;
  background-color: ${({ theme }) => theme.colors.headerBg};
`;

const HeaderInner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
  height: 100%;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  svg {
    font-size: 1.5rem;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo to="/"><BiMehBlank /> 문제은행</Logo>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;