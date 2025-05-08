import React from "react";
import {
  Space,
  Table,
  TableProps,
  Tooltip,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { TopicType, VocabularyManagementProps, VocabularyType } from "@src/types/interface";
import { toast } from "react-toastify";
import Image from "next/image";
import Warning from "@public/images/warning.png";
import Delete from "@public/images/delete.png";

function VocabularyManagementUI({
  handleEdit,
  handleDelete,
  page,
  handlePageChange,
  handleCancel,
  handleOk,
  isModalOpen,
  fileList,
  handleChange,
  form,
  uploadButton,
  confirmAction,
  confirmTitle,
  isConfirmOpen,
  setIsConfirmOpen,
  currentVocabulary,
  handleAdd,
  total,
  vocabularies,
  topics
}: VocabularyManagementProps) {
  const columns: TableProps<VocabularyType>["columns"] = [
    {
      title: "Tên chủ đề",
      dataIndex: "topicId",
      key: "topicId",
    },
    {
      title: "Từ",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Nghĩa của từ",
      dataIndex: "translate",
      key: "translate",
    },
    {
      title: "Phiên âm",
      dataIndex: "transcription",
      key: "transcription",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <EditOutlined
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Tooltip title="Xoá">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="Vocabularys-management">
      <div className="w-full flex justify-between gap-2">
        <h1 className="font-bold text-[24px] text-primary mb-3">Quản lý từ vựng</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Thêm từ vựng
        </Button>
      </div>
      <Table<VocabularyType>
        columns={columns}
        dataSource={vocabularies}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: handlePageChange,
        }}
      />
      <Modal
        title={currentVocabulary ? "Cập nhật từ vựng" : "Thêm từ vựng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentVocabulary ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        style={{ top: 10 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Ảnh minh họa từ">
            <Upload
              name="file"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              maxCount={1}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  toast.error("Chỉ được upload ảnh!");
                  return Upload.LIST_IGNORE;
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);

                return false;
              }}
              style={{
                height: "102px",
              }}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Từ"
            name="word"
            rules={[
              { required: true, message: "Vui lòng nhập từ vựng bạn muốn thêm!" },
            ]}
          >
            <Input
              placeholder="Nhập từ vựng của bạn"
              disabled={!!currentVocabulary?.word}
            />
          </Form.Item>

          <Form.Item
            label="Nghĩa của từ"
            name="translate"
            rules={[{ required: true, message: "Vui lòng nhập nghĩa của từ!" }]}
          >
            <Input placeholder="Nhập nghĩa của từ của bạn" />
          </Form.Item>

          <Form.Item
            label="Phiên âm của từ"
            name="transcription"
          >
            <Input placeholder="Nhập phiên âm của từ của bạn" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input placeholder="Nhập mô tả của từ của bạn" />
          </Form.Item>

          <Form.Item label="Chủ đề" name="topicId" initialValue={topics?.[0]?._id}>
            <Select placeholder="Chọn chủ đề">
              {
                topics.map((item: TopicType) => 
                  <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isConfirmOpen}
        onOk={async () => {
          setIsConfirmOpen(false);
          await confirmAction();
        }}
        centered
        width={336}
        onCancel={() => setIsConfirmOpen(false)}
        closable={false}
        style={{ borderRadius: "32px" }}
        footer={
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            <Button
              onClick={() => setIsConfirmOpen(false)}
              style={{
                height: "48px",
                borderRadius: "48px",
                width: "50%",
              }}
            >
              HỦY
            </Button>
            <Button
              type="primary"
              onClick={confirmAction}
              style={{
                height: "48px",
                borderRadius: "48px",
                width: "50%",
                background: confirmTitle.isDelete ? "#dc3545" : "#FFC535"
              }}
            >
              XÁC NHẬN
            </Button>
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Image
            src={confirmTitle.isDelete ? Delete : Warning}
            alt="minh họa"
            style={{ width: 80, height: 80, marginBottom: 16 }}
          />
          <p className="font-bold text-secondarys text-[18px] ">
            {confirmTitle.title}
          </p>
          <p className="font-normal text-secondarys text-[14px] mb-3">
            {confirmTitle.subTitle}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default VocabularyManagementUI;
