"use client";

import Image from "next/image";
import "./style.scss";
import SuccessImage from "@public/images/study-flashcard-success-item.png";
import LocalStorage from "@src/helpers/local-storage";
import ButtonComponent from "@src/components/atoms/button";
import { useRouter } from "next/navigation";
import Session from "@src/helpers/session";
import { useEffect, useState } from "react";

function StudyFlashcardSucess() {
  const router = useRouter();
  const [localRecently, setLocalRecently] = useState<{
    id: string;
    name: string;
    total: number;
    learned: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = LocalStorage.getLocalStorage("recently-flashcard", null);
      setLocalRecently(data);
    }
  }, []);

  const handleBack = () => {
    if (!localRecently) return;
    router.push(`/detail-flashcard/${localRecently.id}?n=${localRecently.name}`);
  };

  const handleContinue = () => {
    if (!localRecently) return;
    Session.removeSession("list-flashcard");
    Session.removeSession("word-count");
    router.push(`/study-flashcard/${localRecently.id}?n=${localRecently.name}`);
  };

  const renderMessage = () => {
    if (!localRecently) return <p>Bạn đã học tất cả thẻ từ vựng của chủ đề</p>;

    const { total = 0, learned = 0, name = "" } = localRecently;

    if (total <= learned) {
      return <p>Bạn đã học tất cả thẻ từ vựng của chủ đề {name}</p>;
    }

    return (
      <p>
        Bạn đã học được {learned} thẻ trong chủ đề <b>{name}</b> và còn{" "}
        <b>{total - learned}</b> thẻ để hoàn thiện.
      </p>
    );
  };

  return (
    <div className="study-flashcard-sucess">
      <div className="content">
        <Image src={SuccessImage} alt="icon" />
        <h1 className="h1-title">Thật tuyệt vời</h1>
        {renderMessage()}

        <div className="btn-actions">
          <ButtonComponent
            background="#fff3e0"
            borderRadius="48px"
            color="#ff8400"
            fontSize="16px"
            onClick={handleBack}
            padding="12px 16px"
            title="QUAY LẠI CHỦ ĐỀ"
          />
          {localRecently &&
            localRecently.total > localRecently.learned && (
              <ButtonComponent
                background="#ff8400"
                borderRadius="48px"
                color="#fff"
                fontSize="16px"
                onClick={handleContinue}
                padding="12px 16px"
                title="TIẾP TỤC HỌC"
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default StudyFlashcardSucess;
