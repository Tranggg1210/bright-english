"use client";

import "./style.scss";
import useNotification from "@src/hooks/useNotification";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { getListTopic } from "@src/services/flashcard";
import Loading from "@src/components/atoms/loading";
import EmptyPage from "@src/components/organisms/_empty-page";
import { useRouter } from "next/navigation";
import { ITopic } from "@src/types/interface";
import FlashcardItem from "@src/components/atoms/flashcard/flashcard-item";
import LocalStorage from "@src/helpers/local-storage";
import FlashcardTotal from "@src/components/molecules/flashcard/flashcard-total";

function Flashcard() {
  const { notify } = useNotification();
  const [errOrLoading, setErrOrLoading] = useState({
    loading: false,
    error: false,
  });
  const [flashcard, setFlashcard] = useState<ITopic[]>([]);
  const [flashcardRecently, setFlashcardRecently] = useState<any>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loaderDataTopic = async () => {
    try {
      setErrOrLoading((prev) => ({
        ...prev,
        loading: true,
      }));

      const res = await dispatch(
        getListTopic({
          limit: 19,
        })
      ).unwrap();
      setFlashcard(res?.data?.topics || []);
      if(LocalStorage.getLocalStorage('recently-flashcard')){
        setFlashcardRecently(LocalStorage.getLocalStorage('recently-flashcard'));
      }
    } catch (error) {
      console.log(error);
      setErrOrLoading((prev) => ({
        ...prev,
        error: true,
      }));
      notify("error", "Lỗi không thể lấy dang sách flashcard");
    } finally {
      setErrOrLoading((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    loaderDataTopic();
  }, []);

  return (
    <div className="flashcard">
      {errOrLoading.loading && <Loading />}
      {errOrLoading.error ? (
        <EmptyPage
          title="Oops! Không thể tải danh sách chủ đề 😢"
          btnTitle="QUAY LẠI TRANG CHỦ"
          description="Có chút trục trặc khi tải danh sách chủ đề. Bạn thử quay lại trang chủ hoặc ghé lại sau vài phút nhé! Mọi thứ sẽ ổn thôi 💪"
          showButton
          handleClick={() => router.push("/app")}
        />
      ) : (
        <>
          {
            <>
              {flashcardRecently && (
                <div className="flashcard-recently">
                  <h1 className="h1-title">Gần đây</h1>
                  <FlashcardTotal
                    learned={flashcardRecently.learned}
                    total={flashcardRecently.total}
                    name={flashcardRecently.name}
                    id={flashcardRecently.id}
                    isRecently
                  />
                </div>
              )}
            </>
          }
          <h1 className="h1-title">Danh sách chủ đề 🤓📚✨</h1>
          <div className="flashcard-container">
            {flashcard?.length > 0 &&
              flashcard.map((item) => (
                <FlashcardItem item={item} key={item._id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Flashcard;
