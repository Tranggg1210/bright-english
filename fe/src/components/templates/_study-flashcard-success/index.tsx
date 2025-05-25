"use client";

import Image from "next/image";
import "./style.scss";
import SuccessImage from "@public/images/study-flashcard-success-item.png";
import LocalStorage from "@src/helpers/local-storage";
import ButtonComponent from "@src/components/atoms/button";
import { useRouter } from "next/navigation";
import Session from "@src/helpers/session";

function StudyFlashcardSucess() {
  const router = useRouter();
  const localRecently: any = LocalStorage.getLocalStorage(
    "recently-flashcard",
    null
  );

  const handleBack = () => {
    router.push(
      `/detail-flashcard/${localRecently.id}?n=${localRecently.name}`
    );
  };

  const handleContinue = () => {
    Session.removeSession("list-flashcard");
    Session.removeSession("word-count");
    router.push(`/study-flashcard/${localRecently.id}?n=${localRecently.name}`);
  };

  return (
    <div className="study-flashcard-sucess">
      <div className="content">
        <Image src={SuccessImage} alt="icon" />
        <h1 className="h1-title">Thật tuyệt vời</h1>
        {localRecently ? (
          localRecently.total === localRecently.learned ? (
            <p>
              Bạn đã học tất cả thẻ từ vựng của chủ đề {localRecently?.name}
            </p>
          ) : (
            <p>
              Bạn đã học được {localRecently.learned} của chủ đề{" "}
              {localRecently?.name} và bạn còn{" "}
              {localRecently.total - localRecently.learned} để hoàn thiện chủ
              đề.
            </p>
          )
        ) : (
          <p>Bạn đã học tất cả thẻ từ vựng của chủ đề</p>
        )}

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
          {localRecently.total !== localRecently.learned && (
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
