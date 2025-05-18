"use client";

import { useAppDispatch } from "@src/hooks/useHookReducers";
import {
  createExercise,
  getExerciseById,
  updateExercise,
} from "@src/services/exercise";
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
import _ from "lodash";
import WriteForm from "@src/components/molecules/exercise/write-form";
import PreviewWrite from "@src/components/molecules/exercise/preview-write";

function WriteExercise() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<ExerciseHeaderTopic>({
    name: "",
    topicId: "",
    type: "write",
    text: "",
  });

  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const formRef = useRef<any>(null);

  const loaderExerciseById = async () => {
    try {
      const {
        data,
      }: {
        data: {
          exercise: ExerciseType;
        };
      } = await dispatch(
        getExerciseById({
          _id: searchParams.get("q"),
        })
      ).unwrap();

      if (data && !_.isEmpty(data)) {
        setTitle({
          topicId: data.exercise.topicId,
          type: data.exercise.type,
          name: data.exercise.name,
          text: data?.exercise.text,
        });
        setQuestions(data.exercise.questions);
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
    setIsPreviewOpen(true);
  };

  const isPreviewDisabled = !(title.name && questions?.length > 0);

  const handleSave = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sanitizedQuestions = questions.map(({ _id, ...rest }) => rest);

      const newExercise: ExerciseType = {
        ...title,
        questions: sanitizedQuestions,
      };

      if (searchParams.get("q")) {
        await dispatch(
          updateExercise({
            id: searchParams.get("q") || "",
            exercise: newExercise,
          })
        );
        toast.success("Chỉnh sửa bài tập thành công!");
      } else {
        await dispatch(createExercise(newExercise));
        toast.success("Tạo bài tập thành công!");
      }

      setTimeout(() => {
        router.push("/exercise");
      }, 500);
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
            {searchParams.get("q") ? "Chỉnh sửa bài tập" : "Tạo bài tập"}
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

      <CommonExercise exerciseTitle={title} onChange={setTitle} type="write" />
      <WriteForm
        ref={formRef}
        exerciseQuestion={questions}
        onChange={setQuestions}
      />

      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        footer={null}
        width={800}
      >
        <PreviewWrite
          questionsExercise={questions}
          writeExerciseTitle={title}
        />
      </Modal>
    </div>
  );
}

export default WriteExercise;
