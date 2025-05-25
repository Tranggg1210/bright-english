"use client";

import "./style.scss";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IVocabulary } from "@src/types/interface";
import { shuffleArray } from "@src/utils/shuffle-array";
import { getListVocabularyByTopicId } from "@src/services/flashcard";
import useNotification from "@src/hooks/useNotification";
import Session from "@src/helpers/session";
import Loading from "@src/components/atoms/loading";
import ButtonComponent from "@src/components/atoms/button";
import StudyFlashcardItem from "@src/components/atoms/flashcard/study-flashcard-item";
import ReportModal from "@src/components/organisms/report-modal";
import DialogComponent from "@src/components/atoms/dialog";
import WaningIcon from "@public/images/warning.png";
import useCounter from "@src/hooks/useCounter";
import { updateUserVocabulary } from "@src/services/user-vocabulary";
import LocalStorage from "@src/helpers/local-storage";
import MotionLayout from "@src/components/layouts/motion-layout";

function StudyFlashcard() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const searchParmas = useSearchParams();
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<IVocabulary[] | null>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [exit, setExit] = useState(false);
  const { count, decrease, increase } = useCounter();
  const lastCount = useRef<number>(0);

  const loaderFlashcards = async () => {
    try {
      const localFl = Session.getSession("list-flashcard", null);
      lastCount.current = count;

      if (localFl) {
        setFlashcards(localFl);
        return;
      }

      setLoading(true);

      const res = await dispatch(
        getListVocabularyByTopicId({
          id: Array.isArray(params.id) ? params.id[0] : params.id || "",
          params: {},
        })
      ).unwrap();

      if (res?.data && Array.isArray(res.data)) {
        const newListFl = res.data.filter((item: IVocabulary) => !item.isLearn);
        const shuffled = shuffleArray(newListFl);
        const listFl: any = shuffled.slice(0, 10);

        Session.setSession("list-flashcard", listFl);
        setFlashcards(listFl);
      } else {
        setFlashcards([]);
      }
    } catch (error) {
      setFlashcards(null);
      notify("error", "Lỗi không thể lấy danh sách từ vựng của chủ đề!");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => {
    const localRecently: any = LocalStorage.getLocalStorage(
      "recently-flashcard",
      null
    );

    if (localRecently) {
      LocalStorage.setLocalStorage("recently-flashcard", {
        ...localRecently,
        learned: localRecently.learned + count,
      });
    }

    Session.removeSession("list-flashcard");
    Session.removeSession("word-count");

    return router.push(
      `/detail-flashcard/${params.id}?n=${searchParmas.get("n")}`
    );
  };

  const handleSubmit = async () => {
    const currentCard = flashcards?.[count];
    if (!currentCard) return;

    try {
      if (count < lastCount.current) {
        setTimeout(() => {
          setIsFlipped(false);
          increase();
        }, 100);
        return;
      }

      await dispatch(
        updateUserVocabulary({
          vocabId: currentCard._id,
          isLearn: true,
        })
      );

      const isLastCard = count === flashcards.length - 1;

      if (isLastCard) {
        const localRecently: any = LocalStorage.getLocalStorage(
          "recently-flashcard",
          null
        );

        if (localRecently) {
          LocalStorage.setLocalStorage("recently-flashcard", {
            ...localRecently,
            learned: localRecently.learned + 10,
          });
        }

        Session.removeSession("list-flashcard");
        Session.removeSession("word-count");

        return router.push(`/study-flashcard-success`);
      }

      setTimeout(() => {
        lastCount.current++;
        setIsFlipped(false);
        increase();
      }, 100);
    } catch (error) {
      notify("error", "Không thể đánh dấu đã học thẻ!");
    }
  };

  const handleBack = () => {
    setTimeout(() => {
      setIsFlipped(false);
      decrease();
    }, 100);
  };

  useEffect(() => {
    loaderFlashcards();
  }, []);

  return (
    <div className="study-flashcard">
      {loading && <Loading />}
      <div className="sf-container">
        <div className="sfc-header">
          <ReportModal />
          <h1 className="h1-title">{searchParmas.get("n")}</h1>
          <ButtonComponent
            background="#fde8e8"
            borderRadius="48px"
            color="#ff5c5c"
            fontSize="14px"
            onClick={() => setExit(true)}
            padding="10px 16px"
            title="THOÁT"
          />
        </div>
        <div className="sfc-body">
          {flashcards && flashcards.length > 0 && (
            <MotionLayout key={count}>
              <StudyFlashcardItem
                isFlipped={isFlipped}
                item={flashcards?.[count]}
                setIsFlipped={setIsFlipped}
              />
            </MotionLayout>
          )}
        </div>
        <div className="sfc-footer">
          {!isFlipped ? (
            <ButtonComponent
              background="#ff8400"
              borderRadius="48px"
              color="#fff"
              fontSize="14px"
              onClick={() => setIsFlipped((pre) => !pre)}
              padding="12px 16px"
              title="Nhấn để lật thẻ"
            />
          ) : (
            <div className="actions-btn">
              <ButtonComponent
                background="#ebebf0"
                borderRadius="48px"
                color="rgb(193 193 193)"
                fontSize="14px"
                onClick={handleBack}
                padding="12px 14px"
                title="Quay lại"
              />
              <ButtonComponent
                background="#ff8400"
                borderRadius="48px"
                color="#fff"
                fontSize="14px"
                onClick={handleSubmit}
                padding="12px 14px"
                title="Tiếp tục"
              />
            </div>
          )}
        </div>
      </div>
      <DialogComponent
        bgRight="rgb(254, 192, 72)"
        colorButtonRight="#fff"
        handleButtonRight={handleExit}
        image={WaningIcon}
        setIsOpen={setExit}
        show={exit}
        textButtonRight="Rời khỏi"
        title="Rời khỏi"
        bgLeft="#ebebf0"
        colorButtonLeft="rgb(193 193 193)"
        textButtonLeft="Hủy"
        handleCloseModal={() => setExit(false)}
        description="Bạn có chắc chắn muốn rời khỏi phiên học không?"
      />
    </div>
  );
}

export default StudyFlashcard;
