import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BiSolidCheckboxChecked, BiCheckbox } from "react-icons/bi";
import DisplayAds from "../components/DisplayAds";
import parse from "html-react-parser";
import { BiSolidBulb } from "react-icons/bi";

const ExamHead = styled.div`
  margin-bottom: 3rem;
`;

const ExamTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  word-break: keep-all;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ListItem = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -14px;
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 8px solid red;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${({ active }) =>
    active &&
    `
    &::before {
      opacity: 1;
    }
  `}
`;

const Utility = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 30px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  svg {
    font-size: 2rem;
  }

  ${({ disabled }) =>
    disabled &&
    `
    color: #999;
    cursor: not-allowed;

    svg {
      color: #999;
    }
  `}
`;

const CustomCheckboxInput = styled.input`
  display: none;
`;

const Question = styled.div`
  margin-bottom: 1.2rem;
  font-weight: bold;
  font-size: 1.2rem;
  word-break: keep-all;
`;

const View = styled.div`
  position: relative;
  margin: 2rem 0 1.2rem;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 4px;

  &::after {
    content: "보기";
    position: absolute;
    top: -10px;
    left: 10px;
    padding: 0.2rem 0.8rem;
    background-color: #eaeaea;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const ViewImg = styled.img`
  margin-bottom: 1.5rem;
  aspect-ratio: 1 / 1;
  border: 1px solid #eaeaea;
  border-radius: 4px;
`;

const Answer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  word-break: keep-all;
`;

const Explanation = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--header-bg-color);
  border-radius: 8px;
`;

const Exam = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showOnlyAnswer, setShowOnlyAnswer] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [metadata, setMetadata] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { type, round } = useParams();
  const [score, setScore] = useState(0);

  // 숫자 키와 해당하는 동그라미 번호 문자를 매핑
  const circleNum = { 1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤" };

  // 특정 URL에서 데이터를 가져와서 상태 업데이트
  const fetchData = async (url, setState) => {
    const response = await fetch(url);
    const data = await response.json();
    setState(data);
  };

  // 체크박스 리스트를 정의하는 배열
  const CheckboxList = [
    {
      id: "showAnswer",
      state: showAnswer,
      setState: setShowAnswer,
      label: "정답 보기",
    },
    {
      id: "showOnlyAnswer",
      state: showOnlyAnswer,
      setState: setShowOnlyAnswer,
      label: "정답 문항만 보기",
    },
    {
      id: "showWrongAnswer",
      state: showWrongAnswer,
      setState: setShowWrongAnswer,
      label: "틀린 문제만 보기",
    },
  ];

  useEffect(() => {
    const baseUrl = `${process.env.PUBLIC_URL}/data/${type}/${round}`;

    fetchData(`${baseUrl}/questions.json`, setQuestions);
    fetchData(`${baseUrl}/answers.json`, setAnswers);
    fetchData(`${baseUrl}/metadata.json`, setMetadata);
  }, [type, round]);

  // 옵션 선택 이벤트
  const handleOptionChange = (questionId, value) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: value };

      let newScore = 0;

      questions.forEach((q) => {
        const answer = answers.find((a) => a.questionId === q.id);
        if (newAnswers[q.id] === answer?.answer) {
          newScore++;
        }
      });

      setScore(newScore);

      return newAnswers;
    });
  };


  // 질문(q)과 정답(answer)을 기반으로 선택지와 스타일을 렌더링
  const renderAnswers = (q, answer) => {
    return q.options.map((option, index) => {
      const isCorrect = answer?.answer === index + 1;
      const isSelected = selectedAnswers[q.id] === index + 1;
      if (showOnlyAnswer && !isCorrect) return null;

      return (
        <li key={index}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              color: isSelected
                ? "red"
                : isCorrect && showAnswer
                ? "green"
                : "black",
            }}
          >
            <input
              type="radio"
              name={`question-${q.id}`}
              value={index + 1}
              onChange={() => handleOptionChange(q.id, index + 1)}
              style={{ marginRight: "0.5rem" }}
            />
            {circleNum[index + 1]} {option}
          </label>
        </li>
      );
    });
  };

  // 필요한 데이터가 아직 로드되지 않은 경우 로딩 메시지 표시
  if (!metadata || !questions || !answers) return <p>Loading...</p>;

  return (
    <>
      {/* 시험 정보 */}
      <ExamHead>
        <ExamTitle>{metadata.title}</ExamTitle>
        <div>{metadata.date}</div>
      </ExamHead>

      {/* 유틸리티 */}
      <Utility>
        <Score>
          <BiSolidBulb /> 정답 {score}
        </Score>

        <CheckboxContainer>
          {CheckboxList.map(({ id, state, setState, label }) => (
            <div key={id}>
              <CustomCheckboxInput
                type="checkbox"
                id={id}
                checked={state}
                disabled={
                  (id === "showWrongAnswer" && showOnlyAnswer) ||
                  (id === "showOnlyAnswer" && showWrongAnswer)
                }
                onChange={() => setState(!state)}
              />
              <Label
                htmlFor={id}
                disabled={
                  (id === "showWrongAnswer" && showOnlyAnswer) ||
                  (id === "showOnlyAnswer" && showWrongAnswer)
                }
              >
                {state ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
                {label}
              </Label>
            </div>
          ))}
        </CheckboxContainer>
      </Utility>

      {/* 문항 목록 */}
      <List>
        {questions
          .filter((q) => {
            // '틀린 문제만 보기'가 활성화된 경우, 답이 틀린 문제만 노출
            if (showWrongAnswer) {
              const answer = answers.find((a) => a.questionId === q.id);
              return selectedAnswers[q.id] !== answer?.answer;
            }

            return true; // '틀린 문제만 보기'가 비활성화된 경우 모든 문제를 표시
          })
          .map((q) => {
            const answer = answers.find((a) => a.questionId === q.id);

            // 현재 문항의 정답 여부 계산
            const isCorrect = selectedAnswers[q.id] === answer?.answer;

            return (
              <ListItem key={q.id} active={isCorrect}>
                {/* 문항 */}
                <Question>
                  {q.id}. {q.question}
                </Question>

                {/* 보기 */}
                {q.view && <View>{parse(q.view)}</View>}

                {/* 이미지 */}
                {q.viewImg && (
                  <ViewImg
                    src={`${process.env.PUBLIC_URL}/images/${type}/${round}/${q.viewImg}`}
                    alt="Exam Image"
                  />
                )}

                {/* 객관식 */}
                <Answer>
                  {q.type === "single" && renderAnswers(q, answer)}
                </Answer>

                {/* 주관식 */}
                {q.type === "subjective" &&
                  answer &&
                  (showAnswer || showOnlyAnswer) && (
                    <div style={{ color: "red" }}>{parse(answer.answer)}</div>
                  )}

                {/* 해설 */}
                {answer?.explanation && (showAnswer || showOnlyAnswer) && (
                  <Explanation>{answer.explanation}</Explanation>
                )}
              </ListItem>
            );
          })}
      </List>

      {/* 광고 */}
      <DisplayAds />
    </>
  );
};

export default Exam;
