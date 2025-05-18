"use client";

import { useAppDispatch } from "@src/hooks/useHookReducers";
import { createExercise, getExerciseById, updateExercise } from "@src/services/exercise";
import {
  ExerciseHeaderTopic,
  ExerciseQuestion,
  ExerciseType,
} from "@src/types/interface";
import { Button, Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { LeftOutlined } from "@ant-design/icons";
import CommonExercise from "@src/components/organisms/exercise/header";
import MatchingForm, {
  MatchingFormRef,
} from "@src/components/molecules/exercise/matching-form";
import PreviewMatching from "@src/components/molecules/exercise/preview-matching";
import _ from "lodash";
import { shuffleArray } from "@src/utils/shuffle-array";

function MatchExercise() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [matchExerciseTitle, setMatchExerciseTiTle] =
    useState<ExerciseHeaderTopic>({
      name: "",
      topicId: "",
      type: "match",
      text: "",
    });

  const [questionsExercise, setQuestionsExercise] = useState<
    ExerciseQuestion[]
  >([]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const formRef = useRef<MatchingFormRef>(null);

  const loaderExerciseById = async () => {
    try {
      const { data }: { data: {
        exercise: ExerciseType
      } } = await dispatch(
        getExerciseById({
          _id: searchParams.get("q"),
        })
      ).unwrap();

      if (data && !_.isEmpty(data)) {
        setMatchExerciseTiTle({
          topicId: data.exercise.topicId,
          type: data.exercise.type,
          name: data.exercise.name,
          text: data?.exercise.text,
        });
        setQuestionsExercise(data.exercise.questions);
      }
    } catch {
      toast.dismiss();
      toast.error("Không thể lấy dữ liệu của bài tập!");
      router.back();
    }
  };

  useEffect(() => {
    if (searchParams.get("q")) {
      loaderExerciseById();
    }
  }, []);

  const handlePreview = () => {
    if (!formRef.current) return;
    const values = formRef.current.getFormValues?.();
    if (values?.dataLeft?.length && values?.dataRight?.length) {
      setIsPreviewOpen(true);
    }
  };

  const isPreviewDisabled = !(
    matchExerciseTitle &&
    questionsExercise?.length > 0 &&
    (questionsExercise?.[0]?.dataLeft?.length ?? 0) > 1
  );

  const handleSave = async() => {
    try {
      const newExercise: ExerciseType = {
        ...matchExerciseTitle,
        questions: questionsExercise?.map((item) => ({
          prompt: "",
          answer: [],
          audio: "",
          content: [],
          dataLeft: shuffleArray(item.dataLeft || []),
          dataRight: shuffleArray(item.dataRight || []),
        })),
      };

      if (searchParams.get("q")) {
        await dispatch(updateExercise({
          id: searchParams.get('q') || "",
          exercise: newExercise
        }));
        toast.success("Chỉnh sửa bài tập thành công!");
      }else{
        await dispatch(createExercise(newExercise));
        toast.success("Tạo bài tập thành công!");
      }

      setTimeout(() => {
        router.push("/exercise");
      }, 500)

    } catch {
      toast.dismiss();
      toast.error(
        searchParams.get("q")
          ? "Lỗi không thể chỉnh sửa bài tập!"
          : "Lỗi không thể tạo bài tập!"
      );
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Button
            type="default"
            icon={<LeftOutlined />}
            onClick={() => router.push("/exercise")}
          />
          <h1 className="font-bold text-[24px] text-primary">
            {matchExerciseTitle ? "Chỉnh sửa bài tập" : "Tạo bài tập"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            onClick={handleSave}
            disabled={isPreviewDisabled}
            style={{ marginLeft: "auto" }}
          >
            Lưu
          </Button>
          <Button
            type="dashed"
            onClick={handlePreview}
            disabled={isPreviewDisabled}
            style={{ marginLeft: "auto" }}
          >
            🔍 Xem trước
          </Button>
        </div>
      </div>

      <CommonExercise
        exerciseTitle={matchExerciseTitle}
        onChange={setMatchExerciseTiTle}
        type="match"
      />
      <MatchingForm
        ref={formRef}
        exerciseQuestion={questionsExercise}
        onChange={setQuestionsExercise}
      />

      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        footer={null}
        width={800}
      >
        <PreviewMatching
          matchExerciseTitle={matchExerciseTitle}
          questionsExercise={questionsExercise}
        />
      </Modal>
    </div>
  );
}

export default MatchExercise;
