"use client";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useEffect, useRef, useState } from "react";
import { IExercise, MatchedPair, MatchItem } from "@src/types/interface";
import { useParams, useRouter } from "next/navigation";
import {
  getExerciseById,
  getLogByExerciseId,
  updateLogsById,
} from "@src/services/exercise";
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
  const logsExer = useRef<any>(null);

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

      if (logs && logs?.data) {
        logsExer.current = logs?.data?.log || {};

        if (res?.data?.exercise?.type === "match") {
          const matchedPairs =
            logs?.data?.log?.questions?.[0]?.userAnswers || [];
          setMatchedPairs(matchedPairs);
        }
      }

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

  const handleSubmit = async () => {
    try {
      if (!exercise || !exercise.questions || exercise.questions.length === 0)
        return;

      if (exercise.type === "match") {
        const question = exercise.questions[0];
        const dataLeftLength = question?.dataLeft?.length || 0;

        if (matchedPairs.length !== dataLeftLength) {
          notify(
            "error",
            "Vui lòng hoàn thành tất cả các cặp trước khi nộp bài!"
          );
          return;
        }

        const newData = matchedPairs.map(({ left, right }) => ({
          left,
          right,
          isCorrect: left.key === right.key,
        }));

        const allCorrect = newData.every((pair) => pair.isCorrect);

        const logData = {
          questions: [
            {
              questionId: question._id,
              userAnswers: [
                {
                  content: newData,
                  isCorrect: allCorrect,
                },
              ],
            },
          ],
          status: allCorrect,
        };

        const res = await dispatch(
          updateLogsById({
            id: logsExer.current._id,
            data: logData,
          })
        );

        console.log(res)

        setMatchedPairs(newData);
        notify("success", "Nộp bài thành công!");
      }
    } catch (error) {
      notify("error", "Không thể nộp bài tập!");
      return;
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
