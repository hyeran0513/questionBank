import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiCrown, BiSolidBot } from "react-icons/bi";

const HeaderWrapper = styled.header`
  height: 100px;
  background-color: ${({ theme }) => theme.colors.headerBg};
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
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

const Message= styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: red;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo to="/"><BiCrown /> 문제은행구리</Logo>
        <Message><BiSolidBot /> 해당 사이트는 프론트엔드로만 구현되어 데이터가 서버에 저장되지 않습니다. 모든 데이터는 브라우저를 새로 고침하거나 페이지를 이동하면 삭제되며, 일회성으로만 사용 가능합니다.</Message>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;