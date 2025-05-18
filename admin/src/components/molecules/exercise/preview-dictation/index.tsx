import React from "react";
import { Typography, Divider } from "antd";
import { ExerciseHeaderTopic, ExerciseQuestion } from "@src/types/interface";

const { Title, Text, Paragraph } = Typography;

interface Props {
  questionsExercise: ExerciseQuestion[];
  dictationExerciseTitle: ExerciseHeaderTopic | null;
}

const PreviewDictation: React.FC<Props> = ({
  questionsExercise,
  dictationExerciseTitle,
}) => {
  return (
    <div>
      <Title level={4} style={{ color: "#007BFF" }}>
        Đề bài: {dictationExerciseTitle?.name || "(chưa có tiêu đề)"}
      </Title>

      {dictationExerciseTitle?.text && (
        <Paragraph style={{ whiteSpace: "pre-line" }}>
          {dictationExerciseTitle.text}
        </Paragraph>
      )}

      <Divider />

      {questionsExercise.length === 0 && (
        <Paragraph>(Chưa có câu hỏi nào)</Paragraph>
      )}

      {questionsExercise.map((question, idx) => (
        <div key={idx} style={{ marginBottom: 32 }}>
          <Text strong>{`Câu ${idx + 1}:`}</Text>
          <br />

          {question.audio ? (
            <audio controls style={{ marginTop: 8, width: "100%" }}>
              <source src={question.audio} />
              Trình duyệt không hỗ trợ thẻ audio.
            </audio>
          ) : (
            <Text type="secondary">(Chưa có audio)</Text>
          )}

          <div
            style={{ borderBottom: "1px solid #ddd", margin: "40px 0 12px", color: "gray", opacity: "0.5" }}
          >Nhập đáp án</div>

          <Paragraph>
            <Text strong>Đáp án: </Text>
            {question.answer?.text || "(chưa có đáp án)"}
          </Paragraph>

          {question.answer?.explain && (
            <Paragraph>
              <Text strong>Lời giải: </Text>
              {question.answer.explain}
            </Paragraph>
          )}
        </div>
      ))}
    </div>
  );
};

export default PreviewDictation;
