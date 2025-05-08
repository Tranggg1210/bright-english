"use client";

import { Form, UploadProps, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { VocabularyType } from "@src/types/interface";
import {
  createVocabulary,
  deleteVocabulary,
  getListVocabulary,
  updateVocabulary,
} from "@src/services/vocabulary";
import { getListTopic } from "@src/services/topic";
import VocabularyManagementUI from "./ui";

function VocabularyManagement() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [vocabularies, setVocabularies] = useState<VocabularyType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<VocabularyType | null>(null);
  const { userInfor } = useAppSelector((state) => state.auth);
  const { topics } = useAppSelector((state) => state.topics);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState({
    title: "",
    subTitle: "",
    isDelete: true,
  });

  useEffect(() => {
    if (currentWord?.image) {
      setFileList([
        {
          uid: "xxx",
          name: "image.png",
          status: "done",
          url: currentWord.image,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [currentWord]);

  useEffect(() => {
    if (_.isEmpty(userInfor)) router.push("/login");
    loaderData(page);
  }, [page]);

  const loaderData = async (page: number) => {
    try {
      const params = { sortBy: "word:asc", limit: 10, page };
      const res = await dispatch(getListVocabulary(params)).unwrap();
      const { vocabularies, totalResults } = res.data;

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

      if (_.isEmpty(vocabularies)) return;

      setVocabularies(vocabularies);
      setTotal(totalResults);
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Không thể lấy danh sách từ vựng!");
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleEdit = (value: VocabularyType) => {
    setIsModalOpen(true);
    setCurrentWord(value);
    form.setFieldsValue(value);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
    setCurrentWord(null);
    setFileList([]);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values: VocabularyType = await form.validateFields();

      const vocabulary: any = {
        word: values.word,
        topicId: values.topicId,
        translate: values.translate,
      };

      if (values.transcription) {
        vocabulary.transcription = values.transcription;
      }

      if (values.description) {
        vocabulary.description = values.description;
      }

      if (fileList[0]?.originFileObj) {
        vocabulary.image = fileList[0].originFileObj;
      }

      if (currentWord) {
        await dispatch(
          updateVocabulary({ id: currentWord._id, vocabulary })
        ).unwrap();
        toast.dismiss();
        toast.success("Cập nhật từ vựng thành công!");
      } else {
        await dispatch(createVocabulary(vocabulary)).unwrap();
        toast.dismiss();
        toast.success("Thêm từ vựng thành công!");
      }

      setIsModalOpen(false);
      loaderData(page);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(
        currentWord ? "Cập nhật từ vựng thất bại!" : "Thêm từ vựng thất bại!"
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (value: VocabularyType) => {
    setConfirmTitle({
      title: "Xóa từ vựng",
      subTitle: `Bạn có chắc chắn muốn xóa từ vựng ${value.word} này không?`,
      isDelete: true,
    });
    setConfirmAction(() => async () => {
      try {
        await dispatch(deleteVocabulary({ _id: value._id })).unwrap();
        toast.dismiss();
        toast.success("Xóa từ vựng thành công!");
        setIsConfirmOpen(false);
        loaderData(page);
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Xóa từ vựng thất bại!");
      }
    });
    setIsConfirmOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <VocabularyManagementUI
      currentVocabulary={currentWord}
      fileList={fileList}
      form={form}
      handleAdd={handleAdd}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleOk={handleOk}
      handlePageChange={handlePageChange}
      isModalOpen={isModalOpen}
      page={page}
      total={total}
      uploadButton={uploadButton}
      topics={topics}
      confirmAction={confirmAction}
      confirmTitle={confirmTitle}
      isConfirmOpen={isConfirmOpen}
      setIsConfirmOpen={setIsConfirmOpen}
      vocabularies={vocabularies}
    />
  );
}

export default VocabularyManagement;
