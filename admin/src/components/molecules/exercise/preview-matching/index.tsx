import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import { ExerciseHeaderTopic, ExerciseQuestion } from "@src/types/interface";

interface MatchingItem {
  content?: string;
  image?: string;
}

interface Props {
  questionsExercise: ExerciseQuestion[];
  matchExerciseTitle: ExerciseHeaderTopic | null;
}

const PreviewMatching: React.FC<Props> = ({
  matchExerciseTitle,
  questionsExercise,
}) => {
  return (
    <div>
      <h3 style={{ marginBottom: 8, color: "#007BFF" }}>
        Câu 1: {matchExerciseTitle?.name}
      </h3>
      {matchExerciseTitle?.text && (
        <p style={{ marginBottom: 16, color: "#000" }}>
          {matchExerciseTitle?.text}
        </p>
      )}
      <Row gutter={24}>
        <Col span={12}>
          {questionsExercise?.[0]?.dataLeft?.map(
            (item: MatchingItem, idx) => (
              <div
                key={idx}
                style={{
                  height: 180,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  padding: 8,
                  marginBottom: 24,
                }}
              >
                {item.content ? (
                  <span style={{ marginLeft: 8, color: "#000" }}>
                    {item.content}
                  </span>
                ) : (
                  <Image
                    src={item.image || ""}
                    alt={`left-${idx}`}
                    width={180}
                    height={180}
                    style={{
                      marginLeft: 8,
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                )}
              </div>
            )
          )}
        </Col>

        <Col span={12}>
          {questionsExercise?.[0]?.dataRight?.map((item: MatchingItem, idx) => (
            <div
              key={idx}
              style={{
                height: 180,
                border: "1px solid #ccc",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                padding: 8,
                marginBottom: 24,
              }}
            >
              {item.content ? (
                <span style={{ marginLeft: 8, color: "#000" }}>
                  {item.content}
                </span>
              ) : (
                <Image
                  src={item.image || ""}
                  alt={`right-${idx}`}
                  width={180}
                  height={180}
                  style={{
                    marginLeft: 8,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              )}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default PreviewMatching;
