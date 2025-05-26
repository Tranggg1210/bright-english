import "./style.scss";
import { Formik, Form, Field } from "formik";
import { Form as BsForm } from "react-bootstrap";
import { useEffect, useState } from "react";
import ButtonComponent from "@src/components/atoms/button";

type Question = {
  _id: string;
  prompt: string;
  answer: {
    text: string;
    explain: string;
  };
};

type WriteAnswer = {
  questionId: string;
  userAnswers: {
    content: string;
    isCorrect?: boolean;
  }[];
};

type Props = {
  questions: Question[];
  onChangeAnswers: (answers: WriteAnswer[]) => void;
  handleSubmit: () => void;
  isLearned?: boolean;
  writeAnswers: WriteAnswer[];
};

export default function WriteExercise({
  questions,
  onChangeAnswers,
  handleSubmit,
  isLearned,
  writeAnswers = [],
}: Props) {
  const getInitialValues = () => {
    return questions.reduce((acc, q) => {
      const matchedAnswer = writeAnswers?.find((a) => a.questionId === q._id);
      const content = matchedAnswer?.userAnswers?.[0]?.content || "";
      acc[q._id] = content;
      return acc;
    }, {} as Record<string, string>);
  };

  const [formValues, setFormValues] = useState<Record<string, string>>(
    getInitialValues()
  );
  const [prevIsLearned, setPrevIsLearned] = useState(isLearned);

  // Reset form khi học lại
  useEffect(() => {
    if (prevIsLearned && !isLearned) {
      const resetValues = questions.reduce((acc, q) => {
        acc[q._id] = "";
        return acc;
      }, {} as Record<string, string>);
      setFormValues(resetValues);

      const emptyAnswers: WriteAnswer[] = questions.map((q) => ({
        questionId: q._id,
        userAnswers: [{ content: "", isCorrect: undefined }],
      }));
      onChangeAnswers(emptyAnswers);
    }
    setPrevIsLearned(isLearned);
  }, [isLearned, prevIsLearned, questions, onChangeAnswers]);

  // Đẩy answer lần đầu
  useEffect(() => {
    if (writeAnswers?.length === 0) {
      const mapped: WriteAnswer[] = questions.map((q) => ({
        questionId: q._id,
        userAnswers: [
          {
            content: formValues[q._id] || "",
            isCorrect: undefined,
          },
        ],
      }));
      onChangeAnswers(mapped);
    }
  }, [questions, writeAnswers, onChangeAnswers]);

  const isAllEmpty = questions.every((q) => !formValues[q._id]?.trim());

  return (
    <div className="write-exercise">
      <Formik initialValues={formValues} enableReinitialize onSubmit={() => {}}>
        {({ handleChange, setFieldValue }) => (
          <Form className="space-y-4">
            {questions.map((q, index) => {
              const userInput = formValues[q._id] || "";
              const matched = writeAnswers.find((a) => a.questionId === q._id);
              const isSubmitted =
                matched?.userAnswers?.[0]?.isCorrect !== undefined;
              const isCorrect = matched?.userAnswers?.[0]?.isCorrect === true;

              return (
                <div key={q._id} className="mb-4">
                  <p className="font-semibold mb-2">
                    Câu {index + 1}: {q.prompt}
                  </p>

                  <Field
                    as={BsForm.Control}
                    name={q._id}
                    type="text"
                    placeholder="Nhập đáp án"
                    className={`border-0 border-bottom rounded-0 shadow-none ${
                      isSubmitted
                        ? isCorrect
                          ? "!border-[#33b469] !text-[#33b469]"
                          : "border-danger text-danger"
                        : "border-[#e5e7eb] text-[#3f4254]"
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value;
                      handleChange(e);
                      setFormValues((prev) => {
                        const updated = { ...prev, [q._id]: val };

                        // Cập nhật lại listAnswer
                        const newAnswers: WriteAnswer[] = questions.map(
                          (q) => ({
                            questionId: q._id,
                            userAnswers: [
                              {
                                content: updated[q._id] || "",
                                isCorrect: matched?.userAnswers?.[0]?.isCorrect,
                              },
                            ],
                          })
                        );
                        onChangeAnswers(newAnswers);

                        return updated;
                      });
                      setFieldValue(q._id, val); // sync lại formik nếu có reset
                    }}
                    value={userInput}
                    disabled={isSubmitted}
                  />

                  {isSubmitted && !isCorrect && (
                    <div className="mt-1 text-danger small text-explain">
                      Đáp án đúng: <strong>{q.answer.text}</strong>
                      {q.answer.explain && (
                        <div
                          dangerouslySetInnerHTML={{ __html: q.answer.explain }}
                        ></div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="btn-actions">
              <ButtonComponent
                background="#ff8400"
                borderRadius="48px"
                color="#fff"
                fontSize="14px"
                onClick={handleSubmit}
                padding="10px 24px"
                title={isLearned ? "Làm lại" : "Nộp bài"}
                className="btn-submit-exercise"
                type="submit"
                disabled={isAllEmpty}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
