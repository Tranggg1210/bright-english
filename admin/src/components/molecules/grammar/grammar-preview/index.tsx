"use client";

import { Modal } from "antd";
import React from "react";
import "./style.scss";

interface PreviewGrammarModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    title: string;
    description?: string;
    content: string;
    source?: string;
  };
}

const PreviewGrammarModal: React.FC<PreviewGrammarModalProps> = ({
  open,
  onClose,
  data,
}) => {
  const { title, description, content, source } = data;
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title="Xem trước bài ngữ pháp"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>

        {description && <p className="italic text-gray-600">{description}</p>}

        <div
          className="leading-relaxed text-base text-gray-800 list-decimal list-inside"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <p className="text-sm text-gray-500 border-t pt-2">
          <span className="font-medium">Nguồn tham khảo:</span> {source}
        </p>
      </div>
    </Modal>
  );
};

export default PreviewGrammarModal;
