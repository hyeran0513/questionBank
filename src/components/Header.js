import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiBookReader } from "react-icons/bi";

const HeaderWrapper = styled.header`
  height: 100px;
  background-color: ${({ theme }) => theme.colors.headerBg};

  @media (max-width: 768px) {
    height: 50px;
  }
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
`;

const ToolTip = styled.div`
  position: relative;
`;

const Message = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  padding: 1rem;
  width: 500px;
  font-size: 0.8rem;
  flex: 1;
  word-break: keep-all;
  background-color: var(--header-bg-color);
  border: 1px dashed var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 240px;
  }
`;

const Header = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo to="/">문제은행구리</Logo>
        <ToolTip>
          <button type="button" onClick={() => setShowTooltip(!showTooltip)}>
            <BiBookReader />
          </button>
          {showTooltip && (
            <Message>
              해당 사이트는 프론트엔드로만 구현되어 데이터가 서버에 저장되지
              않습니다. 모든 데이터는 브라우저를 새로 고침하거나 페이지를
              이동하면 삭제되며, 일회성으로만 사용 가능합니다.
            </Message>
          )}
        </ToolTip>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;