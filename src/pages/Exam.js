import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BiSolidCheckboxChecked, BiCheckbox } from "react-icons/bi";
import DisplayAds from "../components/DisplayAds";
import parse from "html-react-parser";

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Utility = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CustomCheckboxWrapper = styled.div``;

const Label = styled.label`
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  svg {
    font-size: 2rem;
  }
`;

const CustomCheckboxInput = styled.input`
  display: none;
`;

const CustomCheckbox = styled.span``;

const ListItem = styled.div``;

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
    display: inline-block;
    padding: 0.2rem 0.8rem;
    background-color: #eaeaea;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const ViewImg = styled.img`
  margin-bottom: 1.5rem;
  aspect-radio: 1 / 1;
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
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState();
  const [metadata, setMetadata] = useState();
  const { round } = useParams();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/2023/${round}/questions.json`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });

    fetch(`${process.env.PUBLIC_URL}/data/2023/${round}/answers.json`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      });

    fetch(`${process.env.PUBLIC_URL}/data/2023/${round}/metadata.json`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMetadata(data);
      });
  }, [round]);

  if (!metadata || !questions || !answers) return <p>Loading...</p>;

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleShowOnlyAnswer = () => {
    setShowOnlyAnswer(!showOnlyAnswer);
  };
  return (
    <>
      <ExamHead>
        <ExamTitle>{metadata.title}</ExamTitle>
        <div>{metadata.date}</div>
      </ExamHead>

      <DisplayAds />

      <Utility>
        <CheckboxContainer>
          <CustomCheckboxWrapper>
            <CustomCheckboxInput
              type="checkbox"
              id="showAnswer"
              checked={showAnswer}
              onChange={handleShowAnswer}
            />
            <Label htmlFor="showAnswer">
              {showAnswer ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
              <CustomCheckbox checked={showAnswer} />
              정답 보기
            </Label>
          </CustomCheckboxWrapper>

          <CustomCheckboxWrapper>
            <CustomCheckboxInput
              type="checkbox"
              id="showOnlyAnswer"
              checked={showOnlyAnswer}
              onChange={handleShowOnlyAnswer}
            />
            <Label htmlFor="showOnlyAnswer">
              {showOnlyAnswer ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
              <CustomCheckbox checked={showOnlyAnswer} />
              정답 문항만 보기
            </Label>
          </CustomCheckboxWrapper>
        </CheckboxContainer>
      </Utility>

      <List>
        {questions.map((q) => {
          const answer = answers.find((a) => a.questionId === q.id);
          const viewContent = typeof q.view === "string" ? q.view : "";

          return (
            <ListItem key={q.id}>
              <Question>
                {q.id}. {q.question}
              </Question>

              {viewContent && <View>{parse(viewContent)}</View>}
              {q.viewImg && (
                <ViewImg
                  src={`${process.env.PUBLIC_URL}/images/adsp/2023/${round}/${q.viewImg}`}
                  alt="Exam Image"
                />
              )}

              <Answer>
                {q.type === "single" &&
                  q.options.map((option, index) => {
                    const isCorrect = answer?.answer === index + 1;

                    if (showOnlyAnswer && !isCorrect) return null;

                    return (
                      <li
                        key={index}
                        style={{
                          color:
                            (showAnswer || showOnlyAnswer) && isCorrect
                              ? "red"
                              : "black",
                        }}
                      >
                        {index + 1}. {option}
                      </li>
                    );
                  })}

                {q.type === "subjective" && answer && (showAnswer || showOnlyAnswer) && (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {parse(answer?.answer)}
                  </div>
                )}
              </Answer>

              {answer.explanation && (showAnswer || showOnlyAnswer) && (
                <Explanation>{answer.explanation}</Explanation>
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Exam;