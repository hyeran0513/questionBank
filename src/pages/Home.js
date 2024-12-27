import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayAds from "../components/DisplayAds";
import styled from "styled-components";
import { BiGame } from "react-icons/bi";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListItem = styled.div``;

const Title = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Utility = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledSelect = styled.select`
  padding: 0 0.5rem;
  height: 40px;
  line-height: 38px;
  border: 1px solid #333;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  height: 40px;
  line-height: 38px;
  background-color: var(--primary-color);
  border-radius: 4px;
  color: #fff;
  transition: background-color ease 0.3s, border ease 0.3s, color ease 0.3s;

  &:hover {
    background-color: #fff;
    border: 1px dashed var(--primary-color);
    color: var(--primary-color);
  }

  &:disabled {
    background-color: #999;
    color: #fff;
    border: 1px solid #999;
  }
`;

const Home = () => {
  const [selectedRound, setSelectedRound] = useState();
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate(`/exam/${selectedRound}`);
  };

  return (
    <>
      <List>
        <ListItem>
          <Title>ADSP 시험 선택</Title>

          <Utility>
            <StyledSelect
              id="roundSelect"
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
            >
              <option value="">-- 선택 --</option>
              <option value="round39">39회 기출문제</option>
            </StyledSelect>

            <StyledButton type="button" onClick={handleStartExam} disabled={!selectedRound}>
              <BiGame /> 문제 해설 보기
            </StyledButton>
          </Utility>
        </ListItem>

        <DisplayAds />
      </List>
    </>
  );
};

export default Home;
