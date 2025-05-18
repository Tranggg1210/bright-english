"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useRouter } from "next/navigation";
import { ExerciseType } from "@src/types/interface";
import { toast } from "react-toastify";
import { deleteExercise, getListExercise } from "@src/services/exercise";
import _ from "lodash";
import ExerciseManagementUI from "./ui";
import { getListTopic } from "@src/services/topic";

function ExerciseManagement() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const { userInfor } = useAppSelector((state) => state.auth);
  const { topics } = useAppSelector((state) => state.topics);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const deleteExerciseItem = useRef<ExerciseType | null>(null);

  useEffect(() => {
    if (_.isEmpty(userInfor)) router.push("/login");
    loaderData();
  }, [page]);

  const loaderData = async () => {
    try {
      const params = {
        limit: 10,
        page: 1,
      };
      const res = await dispatch(getListExercise(params)).unwrap();
      setExercises(res.data.exercises);
      setTotal(res.data.totalResults);

      const shouldFetchTopics = _.isEmpty(topics);
      if (shouldFetchTopics) {
        await dispatch(
          getListTopic({
            sortBy: "name:asc",
            limit: 19,
            page: 1,
          })
        ).unwrap();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Không thể lấy danh sách bài tập!");
    }
  };

  const handleEdit = (value: ExerciseType) => {
    if(value.type === 'multiple_choice'){
      return router.push(`/exercise/multiple-choice?q=${value._id}`);
    }
    router.push(`/exercise/${value.type}?q=${value._id}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleDelete = (values: ExerciseType) => {
    deleteExerciseItem.current = values;
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!(deleteExerciseItem && deleteExerciseItem.current)) return;
      await dispatch(
        deleteExercise({ _id: deleteExerciseItem.current?._id })
      ).unwrap();
      toast.dismiss();
      toast.success("Xóa bài tập thành công!");
      setIsConfirmOpen(false);
      loaderData();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Xóa bài tập thất bại!");
    }
  };

  return (
    <ExerciseManagementUI
      exercises={exercises}
      handleEdit={handleEdit}
      page={page}
      total={total}
      handlePageChange={handlePageChange}
      handleDelete={handleDelete}
      isConfirmOpen={isConfirmOpen}
      setIsConfirmOpen={setIsConfirmOpen}
      confirmAction={handleConfirmDelete}
    />
  );
}

export default ExerciseManagement;
