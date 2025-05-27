"use client";
import "./style.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CancelX, CheckCorrect } from "@src/components/svgs";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  _id: string;
  prompt: string;
  answer: {
    options: Option[];
    explain?: string;
  };
};

type Answer = {
  questionId: string;
  userAnswers: {
    content: string;
    isCorrect?: boolean;
  }[];
};

type Props = {
  questions: Question[];
  onChangeAnswers: (answers: Answer[]) => void;
  isLearned?: boolean;
  isSubmitted?: boolean;
  multipleAnswers: Answer[];
  resetFlag: boolean;
  onResetDone?: () => void;
};

export default function MultipleChoiceExercise({
  questions,
  onChangeAnswers,
  isLearned = false,
  isSubmitted = false,
  multipleAnswers = [],
  resetFlag,
  onResetDone,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    questions.reduce((acc, q) => {
      const matched = multipleAnswers.find((a) => a.questionId === q._id);
      acc[q._id] = matched?.userAnswers?.[0]?.content || "";
      return acc;
    }, {} as Record<string, string>)
  );

  // Reset lại khi cần
  useEffect(() => {
    if (resetFlag) {
      setSelectedOptions({});
      onResetDone?.();
    }
  }, [resetFlag, onResetDone]);

  // Cập nhật state cho component cha
  useEffect(() => {
    const answers: Answer[] = questions.map((q) => {
      const selectedId = selectedOptions[q._id];
      const isCorrect = q.answer.options.find((o) => o.id === selectedId)?.isCorrect || false;
      return {
        questionId: q._id,
        userAnswers: selectedId ? [{ content: selectedId, isCorrect }] : [],
      };
    });
    onChangeAnswers(answers);
  }, [selectedOptions, questions, onChangeAnswers]);

  const handleOptionClick = (questionId: string, optionId: string) => {
    if (isSubmitted || isLearned) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  return (
    <div className="multiple-choice-exercise">
      <div className="exercise-questions">
        {questions.map((q, index) => {
          const selected = selectedOptions[q._id];
          const matched = multipleAnswers.find((a) => a.questionId === q._id);
          const submittedCorrect = matched?.userAnswers?.[0]?.isCorrect;
          const isShowResult = isSubmitted || isLearned;

          return (
            <div key={q._id} className="mb-4">
              <p className="font-semibold mb-2">
                Câu {index + 1}: {q.prompt}
              </p>

              <div className="form-list-checks">
                {q.answer.options.map((opt) => {
                  const isCorrect = opt.isCorrect;
                  const isSelected = selected === opt.id;

                  const showCorrectIcon = isShowResult && isCorrect;
                  const showWrongIcon = isShowResult && isSelected && !isCorrect;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`custom-btn 
                        ${isShowResult
                          ? isCorrect
                            ? "correct"
                            : isSelected
                            ? "wrong"
                            : ""
                          : ""}
                        ${!isShowResult && isSelected ? "selected" : ""}
                      `}
                      onClick={() => handleOptionClick(q._id, opt.id)}
                      disabled={isShowResult}
                    >
                      <span className="front" style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}>
                        <span>{opt.text}</span>
                        {showCorrectIcon && (
                          <Image src={CheckCorrect} alt="Correct" width={16} height={16} />
                        )}
                        {showWrongIcon && (
                          <Image src={CancelX} alt="Wrong" width={16} height={16} />
                        )}
                        {!isShowResult && isSelected && (
                          <div className="check-box"><div /></div>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {isLearned && !submittedCorrect && (
                <div className="mt-1 text-danger small">
                  Đáp án đúng:{" "}
                  <strong>
                    {q.answer.options.find((o) => o.isCorrect)?.text}
                  </strong>
                  {q.answer.explain && (
                    <div dangerouslySetInnerHTML={{ __html: q.answer.explain }} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
