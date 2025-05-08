import React, { useState } from "react";
import {
  Space,
  Table,
  TableProps,
  Tooltip,
  Modal,
  Form,
  Input,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { TopicManagementProps, TopicType } from "@src/types/interface";
import Image from "next/image";
import Warning from "@public/images/warning.png";
import Delete from "@public/images/delete.png";

function TopicManagementUI({
  handleEdit,
  handleDelete,
  handleCancel,
  handleOk,
  isModalOpen,
  form,
  confirmAction,
  confirmTitle,
  isConfirmOpen,
  setIsConfirmOpen,
  handleAddTopic,
  topics,
  currentTopic,
}: TopicManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const columns: TableProps<TopicType>["columns"] = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên chủ đề",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    <div className="users-management">
      <div className="w-full flex justify-between gap-2">
        <h1 className="font-bold text-[24px] text-primary mb-3">
          Quản lý chủ đề
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddTopic}
          style={{ marginBottom: 16 }}
        >
          Thêm chủ đề
        </Button>
      </div>
      <Table<TopicType>
        columns={columns}
        dataSource={topics.slice((currentPage - 1) * 10, currentPage * 10)}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: topics.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      <Modal
        title={currentTopic ? "Cập nhật chủ đề" : "Thêm chủ đề"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentTopic ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên chủ đề"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên chủ đề của bạn!" },
              { min: 2, message: "Tên chủ đề phải có ít nhất 2 ký tự!" },
              { max: 45, message: "Tên chủ đề không được vượt quá 45 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập tên chủ đề của bạn" />
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
                background: confirmTitle.isDelete ? "#dc3545" : "#FFC535",
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

export default TopicManagementUI;
