import React from "react";
import { Typography, Divider } from "antd";
import { ExerciseHeaderTopic, ExerciseQuestion } from "@src/types/interface";

const { Title, Text, Paragraph } = Typography;

interface Props {
  questionsExercise: ExerciseQuestion[];
  writeExerciseTitle: ExerciseHeaderTopic | null;
}

const PreviewWrite: React.FC<Props> = ({
  questionsExercise,
  writeExerciseTitle,
}) => {
  return (
    <div>
      <Title level={4} style={{ color: "#007BFF" }}>
        Đề bài: {writeExerciseTitle?.name}
      </Title>

      {writeExerciseTitle?.text && (
        <Paragraph style={{ whiteSpace: "pre-line" }}>
          {writeExerciseTitle.text}
        </Paragraph>
      )}

      <Divider />

      {questionsExercise.map((question, idx) => (
        <div key={idx} style={{ marginBottom: 32 }}>
          <Text strong>
            Câu {idx + 1}: {question.prompt}
          </Text>
          <div
            style={{ borderBottom: "1px solid #ddd", margin: "40px 0 12px" }}
          />

          <Paragraph>
            <Text strong>Đáp án:</Text>{" "}
            {question.answer?.text || "(chưa có đáp án)"}
          </Paragraph>
          {question.answer?.explain && (
            <Paragraph>
              <Text strong>Lời giải:</Text> {question.answer.explain}
            </Paragraph>
          )}
        </div>
      ))}
    </div>
  );
};

export default PreviewWrite;
