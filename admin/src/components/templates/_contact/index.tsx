"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { useRouter } from "next/navigation";
import { Form } from "antd";
import { ContactType } from "@src/types/interface";
import ContactUI from "./ui";
import _ from "lodash";
import { toast } from "react-toastify";
import { getListContact, updateContact } from "@src/services/contact";

function Contact() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

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
      const res = await dispatch(getListContact(params)).unwrap();
      setContacts(res.data.contacts);
      setTotal(res.data.totalResults);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Không thể lấy danh sách các bài liên hệ!");
    }
  };

  const handleEdit = (value: ContactType) => {
    form.setFieldsValue(value);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values: ContactType = await form.validateFields();
      await dispatch(
        updateContact({
          id: values._id,
          contact: {
            status: values.status,
          },
        })
      ).unwrap();
      toast.dismiss();
      toast.success(
        values.status === "unread"
          ? "Chưa đọc"
          : values.status === "read"
          ? "Đã đọc"
          : "Đã trả lời"
      );

      setIsModalOpen(false);
      await loaderData();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Thay đổi trạng thái liên hệ thất bại!");
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <ContactUI
      contacts={contacts}
      form={form}
      handleCancel={handleCancel}
      handleOk={handleOk}
      isModalOpen={isModalOpen}
      handleEdit={handleEdit}
      page={page}
      total={total}
      handlePageChange={handlePageChange}
    />
  );
}

export default Contact;
