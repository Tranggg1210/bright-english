"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useRouter } from "next/navigation";
import { Form } from "antd";
import { TopicType } from "@src/types/interface";
import TopicManagementUI from "./ui";
import _ from "lodash";
import { createTopic, deleteTopic, getListTopic, updateTopic } from "@src/services/topic";
import { toast } from "react-toastify";

function TopicManagement() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const {topics} = useAppSelector(state => state.topics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<TopicType | null>(null);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState({
    title: "",
    subTitle: "",
    isDelete: true,
  });

  useEffect(() => {
    if (_.isEmpty(userInfor)) router.push("/login");
    loaderData();
  }, []);

  const loaderData = async () => {
    try {
      const params = {
        limit: 19,
        page: 1,
      };
      await dispatch(getListTopic(params)).unwrap();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Không thể lấy danh sách chủ đề!");
    }
  };


  const handleEdit = (value: TopicType) => {
    setIsModalOpen(true);
    setCurrentTopic(value);
    form.setFieldsValue(value);
  };

  const handleAddTopic = () => {
    setIsModalOpen(true);
    setCurrentTopic(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (currentTopic) {
        await dispatch(updateTopic({
            id: currentTopic._id,
            topic: {
                name: values.name
            }
        })).unwrap();
        toast.dismiss();
        toast.success("Cập nhật chủ đề thành công!");
      } else {
        if(values?.name?.trim() === '') return;

        await dispatch(createTopic(values)).unwrap();
        toast.dismiss();
        toast.success("Thêm chủ đề thành công!");
      }

      setIsModalOpen(false);
      loaderData();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(
        currentTopic
          ? "Cập nhật chủ đề thất bại!"
          : "Thêm chủ đề thất bại!"
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (value: TopicType) => {
    setConfirmTitle({
      title: "Xóa chủ đề",
      subTitle: `Bạn có chắc chắn muốn xóa chủ đề ${value.name} này không?`,
      isDelete: true,
    });
    setConfirmAction(() => async () => {
      try {
        await dispatch(deleteTopic({ _id: value._id })).unwrap();
        toast.dismiss();
        toast.success("Xóa chủ đề thành công!");
        setIsConfirmOpen(false);
        loaderData();
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Xóa chủ đề thất bại!");
      }
    });
    setIsConfirmOpen(true);
  };


  return <TopicManagementUI
    confirmAction={confirmAction}
    confirmTitle={confirmTitle}
    currentTopic={currentTopic}
    form={form}
    handleAddTopic={handleAddTopic}
    handleCancel={handleCancel}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    handleOk={handleOk}
    isConfirmOpen={isConfirmOpen}
    isModalOpen={isModalOpen}
    setIsConfirmOpen={setIsConfirmOpen}
    topics={topics}
  />;
}

export default TopicManagement;
