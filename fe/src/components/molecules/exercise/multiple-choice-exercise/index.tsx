import "./style.scss";
import { useState, useEffect } from "react";
import ButtonComponent from "@src/components/atoms/button";

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
  handleSubmit: () => void;
  isLearned?: boolean;
  multipleAnswers: Answer[];
  resetFlag: boolean;
  onResetDone?: () => void; 
};

export default function MultipleChoiceExercise({
  questions,
  onChangeAnswers,
  handleSubmit,
  isLearned = false,
  multipleAnswers = [],
  resetFlag,
  onResetDone,
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      questions.reduce((acc, q) => {
        const matched = multipleAnswers.find((a) => a.questionId === q._id);
        acc[q._id] = matched?.userAnswers?.[0]?.content || "";
        return acc;
      }, {} as Record<string, string>)
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset khi resetFlag thay đổi
  useEffect(() => {
    if (resetFlag) {
      setSelectedOptions({});
      setIsSubmitted(false);
      onResetDone?.();
    }
  }, [resetFlag, onResetDone]);

  const handleOptionClick = (questionId: string, content: string) => {
    if (isSubmitted || isLearned) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: content,
    }));
  };

  const handleFinalSubmit = () => {
    const answers: Answer[] = questions.map((q) => {
      const selectedId = selectedOptions[q._id];
      const isCorrect =
        q.answer.options.find((o) => o.id === selectedId)?.isCorrect || false;
      return {
        questionId: q._id,
        userAnswers: [{ content: selectedId, isCorrect }],
      };
    });
    onChangeAnswers(answers);
    handleSubmit();
    setIsSubmitted(true);
  };

  const isAllEmpty = questions.every((q) => !selectedOptions[q._id]);

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

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`custom-btn 
                        ${
                          isShowResult
                            ? isCorrect
                              ? "correct"
                              : isSelected
                              ? "wrong"
                              : ""
                            : ""
                        }
                        ${!isShowResult && isSelected ? "selected" : ""}
                      `}
                      onClick={() => handleOptionClick(q._id, opt.id)}
                      disabled={isShowResult}
                    >
                      <span
                        className="front"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>{opt.text}</span>
                        {(isShowResult && (isCorrect || isSelected)) && (
                          <span aria-label={isCorrect ? "Correct" : "Wrong"}>
                            {isCorrect ? "✅" : isSelected ? "❌" : ""}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {isLearned && !submittedCorrect && (
                <div className="mt-1 text-danger small">
                  Đáp án đúng:{" "}
                  <strong>{q.answer.options.find((o) => o.isCorrect)?.text}</strong>
                  {q.answer.explain && (
                    <div
                      dangerouslySetInnerHTML={{ __html: q.answer.explain }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="btn-container">
        <ButtonComponent
          background="#ff8400"
          borderRadius="48px"
          color="#fff"
          fontSize="14px"
          onClick={handleFinalSubmit}
          padding="10px 24px"
          title={isLearned ? "Làm lại" : "Nộp bài"}
          className="btn-submit-exercise"
          type="button"
          disabled={isAllEmpty || isSubmitted}
        />
      </div>
    </div>
  );
}
