import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  height: 100px;
  background-color: ${({ theme }) => theme.colors.footerBg};
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
  height: 100%;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterInner>ⓒ 2024. kimhyeran. All rights reserved.</FooterInner>
    </FooterWrapper>
  );
};

export default Footer;