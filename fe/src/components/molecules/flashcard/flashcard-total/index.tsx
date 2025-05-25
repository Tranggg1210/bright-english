"use client";

import Image from "next/image";
import "./style.scss";
import { Book } from "@src/components/svgs";
import ButtonComponent from "@src/components/atoms/button";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import {
  getListVocabularyByTopicId,
  resetListVocabularyByTopicId,
} from "@src/services/flashcard";
import useNotification from "@src/hooks/useNotification";
import { useRouter } from "next/navigation";

interface FlashcardTotalProps {
  total: number;
  learned: number;
  name?: string;
  isRecently?: boolean;
  id?: string;
}

function FlashcardTotal({
  total = 0,
  isRecently = false,
  learned = 0,
  name = "",
  id = "",
}: FlashcardTotalProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { notify } = useNotification();

  const handleReset = async () => {
    try {
      await dispatch(
        resetListVocabularyByTopicId({
          id: id,
        })
      ).unwrap();
      await dispatch(
        getListVocabularyByTopicId({
          id: id,
          params: {},
        })
      ).unwrap();
    } catch (error) {
      notify("error", "Lỗi không thể học lại!");
    }
  };

  const handleClickButton = () => {
    if(learned === total){
      handleReset()
    }else{
      router.push(`/study-flashcard/${id}?n=${name}`)
    }
  }

  return (
    <div className="flashcard-total">
      {isRecently && <h2 className="h1-title">{name}</h2>}
      <div className="flashcard-total__wapper">
        <div className="book-container">
          <Image src={Book} alt="icon" width={64} height={64} />
        </div>
        <div className="book-text">
          <h3 className="bc-title">Kết quả học tập hiện tại</h3>
          <div className="bc-content">
            <p>{total} từ vựng</p>
            <p>Số thẻ chưa học: {total - learned}</p>
            <p>Số từ vựng đã học: {learned}</p>
          </div>
        </div>
      </div>
      <div className="btn-wapper">
        <ButtonComponent
          background="#ff8400"
          borderRadius="48px"
          color="#fff"
          fontSize="14px"
          onClick={handleClickButton}
          padding="11px 24px"
          title={learned === total ? "HỌC LẠI" : "HỌC NGAY"}
        />
      </div>
    </div>
  );
}

export default FlashcardTotal;
