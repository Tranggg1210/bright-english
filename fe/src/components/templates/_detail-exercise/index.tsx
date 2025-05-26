"use client";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useEffect, useRef, useState } from "react";
import { IExercise, MatchedPair } from "@src/types/interface";
import { useParams, useRouter } from "next/navigation";
import {
  getExerciseById,
  getLogByExerciseId,
  updateLogsById,
} from "@src/services/exercise";
import useNotification from "@src/hooks/useNotification";
import Loading from "@src/components/atoms/loading";
import _ from "lodash";
import MatchingExercise from "@src/components/molecules/exercise/matching-exercise";
import ButtonComponent from "@src/components/atoms/button";
import WriteExercise from "@src/components/molecules/exercise/write-exercise";
import MotionLayout from "@src/components/layouts/motion-layout";
import Image from "next/image";
import { ArrowLeft } from "@src/components/svgs";
import DictationExercise from "@src/components/molecules/exercise/dictation-exercise";
import MultipleChoiceExercise from "@src/components/molecules/exercise/multiple-choice-exercise";

function DetailExerise() {
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const [exercise, setExercise] = useState<IExercise | null>(null);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [matchedPairs, setMatchedPairs] = useState<MatchedPair[]>([]);
  const [writeAnswers, setWriteAnswers] = useState<
    {
      questionId: string;
      userAnswers: {
        content: string;
        isCorrect?: boolean;
      }[];
    }[]
  >([]);

  const [dictationAnswers, setDictationAnswers] = useState<
    {
      questionId: string;
      userAnswers: {
        content: string;
        isCorrect?: boolean;
      }[];
    }[]
  >([]);

  const [answers, setAnswers] = useState<
    {
      questionId: string;
      userAnswers: {
        content: string;
        isCorrect?: boolean;
      }[];
    }[]
  >([]);

  const logsExer = useRef<any>(null);
  const isLearned = useRef<boolean>(false);

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
        isLearned.current =
          !_.isEmpty(logs?.data?.log) && logs?.data?.log?.status !== null;
        logsExer.current = logs?.data?.log || {};

        if (res?.data?.exercise?.type === "match") {
          const matchedPairs =
            logs?.data?.log?.questions?.[0]?.userAnswers?.[0]?.content || [];
          setMatchedPairs(matchedPairs);
        }

        if (res?.data?.exercise?.type === "write") {
          const writeAnswers =
            logs?.data?.log?.questions?.map((q: any) => ({
              questionId: q.questionId,
              userAnswers: q.userAnswers,
            })) || [];

          setWriteAnswers(writeAnswers);
        }

        if (res?.data?.exercise?.type === "dictation") {
          const dictationAnswers =
            logs?.data?.log?.questions?.map((q: any) => ({
              questionId: q.questionId,
              userAnswers: q.userAnswers,
            })) || [];

          setDictationAnswers(dictationAnswers);
        }
      }

      if(res?.data?.exercise?.type === "multiple_choice") {
        const multipleAnswers =
          logs?.data?.log?.questions?.map((q: any) => ({
            questionId: q.questionId,
            userAnswers: q.userAnswers,
          })) || [];
        setAnswers(multipleAnswers);
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

  const submitLog = async (logData: any) => {
    const res = await dispatch(
      updateLogsById({
        id: logsExer.current._id,
        data: logData,
      })
    ).unwrap();

    logsExer.current = res?.data?.log || logsExer.current;
    isLearned.current = true;
  };

  const handleLogs = async () => {
    try {
      if (!exercise?.questions?.length) return;

      switch (exercise.type) {
        case "match": {
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
                userAnswers: [{ content: newData, isCorrect: allCorrect }],
              },
            ],
            status: allCorrect,
          };

          await submitLog(logData);
          setMatchedPairs(newData);
          break;
        }

        case "write":
        case "dictation": {
          const answersData =
            exercise.type === "write" ? writeAnswers : dictationAnswers;
          const result = exercise.questions.map((q) => {
            const matched = answersData.find((a) => a.questionId === q._id);
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

          const allCorrect = result.every(
            (item) => item.userAnswers[0].isCorrect
          );
          const logData = { questions: result, status: allCorrect };

          await submitLog(logData);
          if (exercise.type === "write") {
            setWriteAnswers(result);
          } else {
            setDictationAnswers(result);
          }
          break;
        }

        case "multiple_choice": {
          const allCorrect = answers.every(
            (item) => item.userAnswers[0].isCorrect
          );
          const logData = { questions: answers, status: allCorrect };

          await submitLog(logData);
          setAnswers(answers);
          break;
        }

        default:
          notify("error", "Loại bài tập không hợp lệ!");
      }
    } catch (error) {
      console.log(error);
      notify("error", "Không thể nộp bài tập!");
    }
  };

  const handleReset = () => {
    if (isLearned.current) {
      setMatchedPairs([]);
      setWriteAnswers([]);
      setDictationAnswers([]);
      setAnswers([]);
      isLearned.current = false;
    }
  };

  const handleSubmit = async () => {
    if (isLearned.current) {
      handleReset();
    } else {
      await handleLogs();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="detail-exerise">
      {exercise ? (
        <MotionLayout>
          <>
            <div
              className="exercise-close"
              onClick={() => router.push("/exercises")}
            >
              <Image src={ArrowLeft} alt="Back" width={24} height={24} />
            </div>
            <div className="exercise-title">
              <span className="emoji">📒</span>
              <h2>{exercise.name}</h2>
              <span className="emoji">✍️</span>
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
                  dataLeft={exercise.questions[0].dataLeft || []}
                  dataRight={exercise.questions[0].dataRight || []}
                  setMatchedPairs={setMatchedPairs}
                  matchedPairs={matchedPairs}
                  isLearned={isLearned.current}
                  handleSubmit={handleSubmit}
                />
              )}
              {exercise.type === "write" && (
                <WriteExercise
                  questions={exercise.questions || []}
                  onChangeAnswers={(answers) => setWriteAnswers(answers)}
                  handleSubmit={handleSubmit}
                  isLearned={isLearned.current}
                  writeAnswers={writeAnswers}
                />
              )}
              {exercise.type === "dictation" && (
                <DictationExercise
                  questions={exercise.questions || []}
                  onChangeAnswers={(answers) => setDictationAnswers(answers)}
                  handleSubmit={handleSubmit}
                  isLearned={isLearned.current}
                  writeAnswers={dictationAnswers}
                />
              )}
              {exercise.type === "multiple_choice" && (
                <MultipleChoiceExercise
                  questions={exercise.questions}
                  onChangeAnswers={setAnswers}
                  handleSubmit={handleSubmit}
                  isLearned={isLearned.current}
                  multipleAnswers={answers}
                  resetFlag={answers.length === 0 && !isLearned.current}
                />
              )}
            </div>
          </>
        </MotionLayout>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DetailExerise;
