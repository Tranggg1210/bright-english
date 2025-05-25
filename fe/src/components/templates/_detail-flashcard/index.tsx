"use client";

import "./style.scss";

import FlashcarDetail from "@src/components/atoms/flashcard/flahscard-detail";
import Loading from "@src/components/atoms/loading";
import FlashcardTotal from "@src/components/molecules/flashcard/flashcard-total";
import EmptyPage from "@src/components/organisms/_empty-page";
import LocalStorage from "@src/helpers/local-storage";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import useNotification from "@src/hooks/useNotification";
import {
  getListVocabularyByTopicId,
  resetListVocabularyByTopicId,
} from "@src/services/flashcard";
import { IVocabulary } from "@src/types/interface";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Reset from "@public/images/reset.png";
import Image from "next/image";

function DetailFlashcard() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchParmas = useSearchParams();
  const { notify } = useNotification();

  const [flashcards, setFlashcards] = useState<IVocabulary[] | null>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState({
    learned: 0,
    total: 0,
  });

  const loaderFlashcards = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        getListVocabularyByTopicId({
          id: Array.isArray(params.id) ? params.id[0] : params.id || "",
          params: {},
        })
      ).unwrap();

      if (res && res?.data) {
        setFlashcards(res.data);

        const learned =
          res.data.filter((item: IVocabulary) => item.isLearn)?.length || 0;

        setTotal({
          learned: learned,
          total: res.data.length || 0,
        });

        LocalStorage.setLocalStorage("recently-flashcard", {
          learned: learned,
          total: res.data.length || 0,
          name: searchParmas.get("n"),
        });
      }
    } catch (error) {
      setFlashcards(null);
      notify("error", "Lỗi không thể lấy danh sách từ vựng của chủ đề!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await resetListVocabularyByTopicId({
        id: Array.isArray(params.id) ? params.id[0] : params.id || "",
      });
      await loaderFlashcards();
    } catch (error) {
      notify("error", "Lỗi không thể học lại!");
    }
  };

  useEffect(() => {
    loaderFlashcards();
  }, []);

  const filteredFlashcards = flashcards?.filter(
    (item) =>
      item.word.toLowerCase().includes(searchText.toLowerCase()) ||
      item.translate.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="detail-flashcard">
      {loading && <Loading />}

      <h1 className="h1-title">{searchParmas.get("n") || "Không xác định"}</h1>
      <FlashcardTotal total={total.total} learned={total.learned} />

      {flashcards ? (
        <div className="df-wapper">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm từ hoặc nghĩa của từ"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input-search"
          />
          <div className="dfw-header">
            <h1 className="h1-title">
              Danh sách từ vựng ({flashcards?.length || 0} từ)
            </h1>
            {total.learned !== 0 && (
              <div className="dfw-icon" onClick={handleReset}>
                <Image src={Reset} alt="icon" width={24} height={24} />
              </div>
            )}
          </div>

          <div className="detail-flashcard__wapper">
            {filteredFlashcards && filteredFlashcards.length > 0 ? (
              filteredFlashcards.map((item) => (
                <FlashcarDetail item={item} key={item._id} />
              ))
            ) : (
              <p style={{ padding: "12px", fontStyle: "italic" }}>
                Không tìm thấy từ nào khớp 😢
              </p>
            )}
          </div>
        </div>
      ) : (
        <EmptyPage
          title="Oops! Không thể tải danh sách từ vựng 😢"
          btnTitle="QUAY LẠI TRANG CHỦ"
          description="Có chút trục trặc khi tải danh sách từ vựng của chủ đề. Bạn thử quay lại trang chủ hoặc ghé lại sau vài phút nhé! Mọi thứ sẽ ổn thôi 💪"
          showButton={false}
        />
      )}
    </div>
  );
}

export default DetailFlashcard;
