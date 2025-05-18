import React from "react";
import { Typography, Divider, Row, Col } from "antd";
import { ExerciseHeaderTopic, ExerciseQuestion } from "@src/types/interface";

const { Title, Text, Paragraph } = Typography;

interface Props {
  questionsExercise: ExerciseQuestion[];
  exerciseTitle: ExerciseHeaderTopic | null;
}

const PreviewMultipleChoice: React.FC<Props> = ({
  questionsExercise,
  exerciseTitle,
}) => {
  return (
    <div>
      <Title level={4} style={{ color: "#007BFF" }}>
        Đề bài: {exerciseTitle?.name}
      </Title>

      {exerciseTitle?.text && (
        <Paragraph style={{ whiteSpace: "pre-line" }}>
          {exerciseTitle.text}
        </Paragraph>
      )}

      <Divider />

      {questionsExercise.map((question, idx) => (
        <div key={`question-${idx}`} style={{ marginBottom: 32 }}>
          <Text strong style={{ fontSize: 16 }}>
            Câu {idx + 1}: {question.prompt}
          </Text>

          <div style={{ height: 12 }} />

          <Row gutter={[16, 16]}>
            {question.answer?.options?.length ? (
              question.answer.options.map((opt: any, i: any) => (
                <Col span={12} key={`q-${idx}-opt-${i}`}>
                  <div
                    style={{
                      border: "1px solid",
                      borderColor: opt.isCorrect ? "green" : "#ccc",
                      borderRadius: 8,
                      padding: "8px 12px",
                      backgroundColor: opt.isCorrect ? "#e6ffe6" : "#fff",
                    }}
                  >
                    <Text style={{ color: opt.isCorrect ? "green" : "black" }}>
                      {opt.text} 
                    </Text>
                  </div>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Text italic>(Chưa có đáp án)</Text>
              </Col>
            )}
          </Row>

          {question.answer?.explain && (
            <Paragraph style={{ marginTop: 12 }}>
              <Text strong>Lời giải:</Text> {question.answer.explain}
            </Paragraph>
          )}
        </div>
      ))}
    </div>
  );
};

export default PreviewMultipleChoice;
