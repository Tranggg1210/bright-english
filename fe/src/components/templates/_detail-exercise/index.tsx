"use client";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useEffect, useRef, useState } from "react";
import { IExercise, MatchedPair } from "@src/types/interface";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  getExerciseById,
  getLogByExerciseId,
  updateLogsById,
} from "@src/services/exercise";
import useNotification from "@src/hooks/useNotification";
import Loading from "@src/components/atoms/loading";
import _ from "lodash";
import MatchingExercise from "@src/components/molecules/exercise/matching-exercise";
import WriteExercise from "@src/components/molecules/exercise/write-exercise";
import MotionLayout from "@src/components/layouts/motion-layout";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@src/components/svgs";
import DictationExercise from "@src/components/molecules/exercise/dictation-exercise";
import MultipleChoiceExercise from "@src/components/molecules/exercise/multiple-choice-exercise";
import ReportModal from "@src/components/organisms/report-modal";
import ButtonComponent from "@src/components/atoms/button";
import Session from "@src/helpers/session";

function DetailExercise() {
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const { userInfor } = useAppSelector((state) => state.auth);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [exercise, setExercise] = useState<IExercise | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<MatchedPair[]>([]);
  const [writeAnswers, setWriteAnswers] = useState<any[]>([]);
  const [dictationAnswers, setDictationAnswers] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dislabelButton, setDislabelButton] = useState(false);
  const logsExer = useRef<any>(null);
  const [isLearned, setIsLearned] = useState(false);

  useEffect(() => {
    const loaderExercise = async () => {
      try {
        setLoading(true);
        const res: any = await dispatch(
          getExerciseById({ _id: params.id })
        ).unwrap();
        const logs = await dispatch(
          getLogByExerciseId({ _id: `${params.id}` })
        ).unwrap();

        if (logs?.data) {
          const log = logs.data.log || {};
          setIsLearned(
            !_.isEmpty(log) && log.status !== null && log.questions.length > 0
          );
          logsExer.current = log;

          const setAnswersByType = (setter: any) =>
            setter(
              log.questions?.map((q: any) => ({
                questionId: q.questionId,
                userAnswers: q.userAnswers,
              })) || []
            );

          switch (res?.data?.exercise?.type) {
            case "match":
              setMatchedPairs(
                log?.questions?.[0]?.userAnswers?.[0]?.content || []
              );
              break;
            case "write":
              setAnswersByType(setWriteAnswers);
              break;
            case "dictation":
              setAnswersByType(setDictationAnswers);
              break;
            case "multiple_choice":
              setAnswersByType(setAnswers);
              break;
          }
        }

        if (res?.data) setExercise(res.data.exercise);
      } catch (error) {
        notify("error", "Không thể tải bài tập!");
      } finally {
        setLoading(false);
      }
    };

    if (!_.isEmpty(userInfor)) loaderExercise();
  }, [userInfor]);

  useEffect(() => {
    if (!exercise) return;

    switch (exercise.type) {
      case "match":
        setDislabelButton(matchedPairs.length === 0);
        break;
      case "write":
        setDislabelButton(
          writeAnswers.every((a) => !a.userAnswers?.[0]?.content?.trim())
        );
        break;
      case "dictation":
        setDislabelButton(
          dictationAnswers.every((a) => !a.userAnswers?.[0]?.content?.trim())
        );
        break;
      case "multiple_choice":
        setDislabelButton(answers.every((a) => !a.userAnswers?.length));
        break;
      default:
        setDislabelButton(true);
    }
  }, [exercise, matchedPairs, writeAnswers, dictationAnswers, answers]);

  const submitLog = async (logData: any) => {
    const res = await dispatch(
      updateLogsById({ id: logsExer.current._id, data: logData })
    ).unwrap();
    logsExer.current = res?.data?.log || logsExer.current;
    setIsLearned(true);
  };

  const handleLogs = async () => {
    if (!exercise?.questions?.length) return;

    try {
      let logData;
      switch (exercise.type) {
        case "match": {
          const question = exercise.questions[0];
          if (matchedPairs.length !== (question?.dataLeft?.length || 0)) {
            return notify(
              "error",
              "Vui lòng hoàn thành tất cả các cặp trước khi nộp bài!"
            );
          }

          const newData = matchedPairs.map(({ left, right }) => ({
            left,
            right,
            isCorrect: left.key === right.key,
          }));

          logData = {
            questions: [
              {
                questionId: question._id,
                userAnswers: [
                  {
                    content: newData,
                    isCorrect: newData.every((p) => p.isCorrect),
                  },
                ],
              },
            ],
            status: newData.every((p) => p.isCorrect),
          };
          setMatchedPairs(newData);
          break;
        }
        case "write":
        case "dictation": {
          const currentAnswers =
            exercise.type === "write" ? writeAnswers : dictationAnswers;

          const result = exercise.questions.map((q) => {
            const matched = currentAnswers.find((a) => a.questionId === q._id);
            const userText =
              matched?.userAnswers?.[0]?.content?.trim().toLowerCase() || "";
            const correctText = q.answer.text.trim().toLowerCase();
            return {
              questionId: q._id,
              userAnswers: [
                { content: userText, isCorrect: userText === correctText },
              ],
            };
          });

          logData = {
            questions: result,
            status: result.every((r) => r.userAnswers[0].isCorrect),
          };
          if (exercise.type === "write") setWriteAnswers(result);
          else setDictationAnswers(result);
          break;
        }
        case "multiple_choice": {
          logData = {
            questions: answers,
            status: answers.every((a) => a.userAnswers[0].isCorrect),
          };
          setIsSubmitted(true);
          break;
        }
        default:
          return notify("error", "Loại bài tập không hợp lệ!");
      }
      await submitLog(logData);
    } catch (error) {
      console.error(error);
      notify("error", "Không thể nộp bài tập!");
    }
  };

  const handleReset = () => {
    if (!isLearned) return;
    setMatchedPairs([]);
    setWriteAnswers([]);
    setDictationAnswers([]);
    setAnswers([]);
    setIsLearned(false)
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    if (isLearned) handleReset();
    else await handleLogs();
  };

  const handleNextExercise = () => {
    const listEx = Session.getSession("list-exercise");

    if (listEx.length > 0) {
      const currentExIndex = listEx.findIndex(
        (item: string) => item === String(params.id)
      );

      if (currentExIndex === -1 || currentExIndex === listEx.length - 1) {
        notify("info", "Bạn đã học xong tất cả bài tập của chủ đề!");
      } else {
        router.push(
          `/detail-exercise/${listEx[currentExIndex + 1]}?i=${
            currentExIndex + 1
          }`
        );
      }
    }
  };

  const handleBackExercise = () => {
    const listEx = Session.getSession("list-exercise");

    if (listEx.length > 0) {
      const currentExIndex = listEx.findIndex(
        (item: string) => item === String(params.id)
      );

      if (currentExIndex === -1 || currentExIndex === 0) {
        notify("info", "Bạn đang ở bài đầu tiên của chủ đề!");
      } else {
        router.push(
          `/detail-exercise/${listEx[currentExIndex - 1]}?i=${
            currentExIndex - 1
          }`
        );
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="detail-exerise">
      {exercise ? (
        <MotionLayout>
          <div className="exercise-main">
            <div className="exercise-header">
              <div className="exercise-title">
                <span className="emoji">📒</span>
                <h2>{exercise.name}</h2>
              </div>
              <ReportModal />
            </div>
            <div className="exercise-content">
              {exercise.text && (
                <div className="exercise-text-box">
                  <span className="emoji">✨</span>
                  <p>{exercise.text}</p>
                </div>
              )}
              {exercise.type === "match" && (
                <MatchingExercise
                  {...{
                    dataLeft: exercise.questions[0].dataLeft || [],
                    dataRight: exercise.questions[0].dataRight || [],
                    matchedPairs,
                    setMatchedPairs,
                    isLearned: isLearned,
                  }}
                />
              )}

              {exercise.type === "write" && (
                <WriteExercise
                  questions={exercise.questions}
                  onChangeAnswers={setWriteAnswers}
                  isLearned={isLearned}
                  writeAnswers={writeAnswers}
                />
              )}

              {exercise.type === "dictation" && (
                <DictationExercise
                  questions={exercise.questions}
                  onChangeAnswers={setDictationAnswers}
                  isLearned={isLearned}
                  writeAnswers={dictationAnswers}
                />
              )}

              {exercise.type === "multiple_choice" && (
                <MultipleChoiceExercise
                  questions={exercise.questions}
                  onChangeAnswers={setAnswers}
                  isLearned={isLearned}
                  multipleAnswers={answers}
                  resetFlag={answers.length === 0 && !isLearned}
                  isSubmitted={isSubmitted}
                />
              )}
            </div>
            <div className="btn-container">
              {Number(searchParams.get("i")) > 0 && (
                <div className="exercise-close" onClick={handleBackExercise}>
                  <Image src={ArrowLeft} alt="Back" width={24} height={24} />
                </div>
              )}
              <ButtonComponent
                background="#ff8400"
                borderRadius="48px"
                color="#fff"
                fontSize="14px"
                onClick={handleSubmit}
                padding="10px 24px"
                title={isLearned ? "Làm lại" : "Nộp bài"}
                className="btn-submit-exercise"
                type="submit"
                disabled={dislabelButton}
              />
              {Number(searchParams.get("i")) <
                Number(Session.getSession("list-exercise").length - 1) && (
                <div className="exercise-close" onClick={handleNextExercise}>
                  <Image src={ArrowRight} alt="Back" width={24} height={24} />
                </div>
              )}
            </div>
          </div>
        </MotionLayout>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DetailExercise;
