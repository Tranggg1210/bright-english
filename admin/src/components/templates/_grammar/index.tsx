"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { GrammarType } from "@src/types/interface";
import TopicManagementUI from "./ui";
import _ from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteGrammar, getListGrammar } from "@src/services/grammar";

function GrammarManagement() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [grammars, setGrammars] = useState<GrammarType[]>([]);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState({
    title: "",
    subTitle: "",
    isDelete: true,
  });

  useEffect(() => {
    if (!_.isEmpty(userInfor)) {
      loaderData();
    }
  }, [userInfor, page]);

  const loaderData = async () => {
    try {
      const params = {
        limit: 10,
        page: 1,
      };
      const res = await dispatch(getListGrammar(params)).unwrap();
      if (!_.isEmpty(res.data)) {
        setGrammars(res.data.grammars);
        setTotal(res.data.totalResults);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Không thể lấy danh sách chủ đề!");
    }
  };

  const handleAdd = () => {
    router.push(`/grammar/actions`);
  };

  const handleEdit = (value: GrammarType) => {
    router.push(`/grammar/actions?q=${value._id}`);
  };

  const handleDelete = (value: GrammarType) => {
    setConfirmTitle({
      title: "Xóa bài ngữ pháp",
      subTitle: `Bạn có chắc chắn muốn xóa bài ${value.title} này không?`,
      isDelete: true,
    });
    setConfirmAction(() => async () => {
      try {
        await dispatch(deleteGrammar({ _id: value._id })).unwrap();
        toast.dismiss();
        toast.success("Xóa bài ngữ pháp thành công!");
        setIsConfirmOpen(false);
        loaderData();
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Xóa bài ngữ pháp thất bại!");
      }
    });
    setIsConfirmOpen(true);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <TopicManagementUI
      confirmAction={confirmAction}
      confirmTitle={confirmTitle}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      isConfirmOpen={isConfirmOpen}
      setIsConfirmOpen={setIsConfirmOpen}
      grammars={grammars}
      handleAdd={handleAdd}
      handlePageChange={handlePageChange}
      page={page}
      total={total}
    />
  );
}

export default GrammarManagement;
