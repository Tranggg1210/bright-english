import React from "react";
import { ConversationType } from "@src/types/interface";
import Image from "next/image";
import { Divider, Typography } from "antd";

const { Title, Paragraph } = Typography;

type SpeakerInfo = {
  name: string;
  avatar: string;
};

type Props = {
  listConver: ConversationType["listConver"];
  listInfor: {
    speakerA: SpeakerInfo;
    speakerB: SpeakerInfo;
  };
  title: {
    name: string;
    description?: string;
    topicId: string;
  };
};

const PreviewConversation = ({ listConver = [], listInfor, title }: Props) => {
  if (!listConver.length)
    return <div style={{ fontStyle: "italic" }}>Chưa có hội thoại nào</div>;

  return (
    <div style={{ padding: 12 }}>
      <Title level={4} style={{ color: "#007BFF" }}>
        Đề bài: {title?.name}
      </Title>

      {title?.description && (
        <Paragraph style={{ whiteSpace: "pre-line" }}>
          {title.description}
        </Paragraph>
      )}

      <Divider />

      {listConver.map((item, i) => {
        const speakerKey = item.speaker as "speakerA" | "speakerB";
        const speaker = listInfor[speakerKey];
        if (!speaker) return null;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              marginBottom: 16,
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            {/* Avatar */}
            <Image
              src={speaker.avatar}
              alt={speaker.name}
              width={40}
              height={40}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />

            {/* Message box */}
            <div
              style={{
                background: "#f0f0f0",
                padding: 12,
                borderRadius: 8,
                flexGrow: 1,
              }}
            >
              {/* Name */}
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: 6,
                  color: "blue",
                }}
              >
                {speaker.name}
              </div>

              {/* Text */}
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                }}
              >
                {item.text}
              </pre>

              {/* Audio */}
              {item.audio && (
                <audio
                  controls
                  src={item.audio}
                  style={{ marginTop: 8, width: "100%" }}
                >
                  Trình duyệt không hỗ trợ audio.
                </audio>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewConversation;
