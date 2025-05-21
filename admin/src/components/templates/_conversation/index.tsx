"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useRouter } from "next/navigation";
import { ConversationType } from "@src/types/interface";
import { toast } from "react-toastify";
import _ from "lodash";
import { getListTopic } from "@src/services/topic";
import { deleteConversation, getListConversation } from "@src/services/conversation";
import ConversationManagementUI from "./ui";

function ConversationManagement() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const { userInfor } = useAppSelector((state) => state.auth);
  const { topics } = useAppSelector((state) => state.topics);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const deleteConversationItem = useRef<ConversationType | null>(null);

  useEffect(() => {
    if (_.isEmpty(userInfor)) {
      loaderData();
    };
  }, [page, userInfor]);

  const loaderData = async () => {
    try {
      const params = {
        limit: 10,
        page: 1,
      };
      const res = await dispatch(getListConversation(params)).unwrap();
      setConversations(res.data.conversations);
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
      toast.error("Không thể lấy danh sách bài hội thoại!");
    }
  };

  const handleEdit = (value: ConversationType) => {
    router.push(`/conversation/actions?q=${value._id}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleDelete = (values: ConversationType) => {
    deleteConversationItem.current = values;
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!(deleteConversationItem && deleteConversationItem.current)) return;
      await dispatch(
        deleteConversation({ _id: deleteConversationItem.current?._id })
      ).unwrap();
      toast.dismiss();
      toast.success("Xóa bài hội thoại thành công!");
      setIsConfirmOpen(false);
      loaderData();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Xóa bài hội thoại thất bại!");
    }
  };

  return (
    <ConversationManagementUI
      conversations={conversations}
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

export default ConversationManagement;
