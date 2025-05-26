"use client";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useEffect, useState } from "react";
import { IExercise, MatchedPair, MatchItem } from "@src/types/interface";
import { useParams, useRouter } from "next/navigation";
import { getExerciseById, getLogByExerciseId } from "@src/services/exercise";
import useNotification from "@src/hooks/useNotification";
import Loading from "@src/components/atoms/loading";
import _, { get } from "lodash";
import MatchingExercise from "@src/components/molecules/exercise/matching-exercise";
import ButtonComponent from "@src/components/atoms/button";

function DetailExerise() {
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const [exercise, setExercise] = useState<IExercise | null>(null);
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [matchedPairs, setMatchedPairs] = useState<MatchedPair[]>([]);

  const loaderExercise = async () => {
    try {
      setLoading(true);
      const res: any = await dispatch(
        getExerciseById({
          _id: params.id,
        })
      ).unwrap();

      const logs = await dispatch(
        getLogByExerciseId({ _id: `${params.id}` })
      ).unwrap();

      console.log("logs", logs);

      if (res && res?.data) {
        setExercise(res?.data?.exercise);
      }
    } catch (error) {
      notify("error", "Không thể tải bài tập!");
      // router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(userInfor)) {
      loaderExercise();
    }
  }, [userInfor]);

  const handleSubmit = () => {
    if (exercise && exercise.questions && exercise.questions.length > 0) {
      if (exercise.type === "match") {
        if (
          matchedPairs.length === exercise?.questions?.[0]?.dataLeft?.length
        ) {
          setMatchedPairs((prev) =>
            prev.map(({ left, right }) => ({
              left,
              right,
              isCorrect: left.key === right.key,
            }))
          );

          notify("success", "Nộp bài thành công!");
          // router.back();
        } else {
          notify(
            "error",
            "Vui lòng hoàn thành tất cả các cặp trước khi nộp bài!"
          );
        }
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="detail-exerise">
      {exercise ? (
        <div className="exercise-card">
          <div className="exercise-header">
            <span className="emoji">📘</span>
            <h2>{exercise.name}</h2>
          </div>

          {exercise.text && (
            <div className="exercise-text-box">
              <span className="emoji">✨</span>
              <p>{exercise.text}</p>
            </div>
          )}

          {exercise.type === "match" && (
            <div className="exercise-content">
              <MatchingExercise
                dataLeft={exercise.questions[0].dataLeft || []}
                dataRight={exercise.questions[0].dataRight || []}
                setMatchedPairs={setMatchedPairs}
                matchedPairs={matchedPairs}
              />
            </div>
          )}

          <div className="exercise-actions">
            <ButtonComponent
              background="#ff8400"
              borderRadius="48px"
              color="#fff"
              fontSize="14px"
              onClick={handleSubmit}
              padding="12px 24px"
              title="Nộp bài"
              width="100%"
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DetailExerise;
