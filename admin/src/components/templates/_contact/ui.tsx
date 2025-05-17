import React from "react";
import {
  Space,
  Table,
  TableProps,
  Tooltip,
  Modal,
  Form,
  Input,
  Tag,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ContactManagementProps, ContactType } from "@src/types/interface";
import TextArea from "antd/es/input/TextArea";

function ContactUI({
  handleEdit,
  handleCancel,
  handleOk,
  isModalOpen,
  form,
  contacts,
  total,
  page,
  handlePageChange,
}: ContactManagementProps) {
  const columns: TableProps<ContactType>["columns"] = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status: "unread" | "read" | "replied") => {
        const tag =
          status === "read"
            ? "Đã đọc"
            : status === "unread"
            ? "Chưa đọc"
            : "Hoàn thành";
        const color =
          status === "read" ? "yellow" : status === "unread" ? "gray" : "green";
        return <Tag color={color}>{tag}</Tag>;
      },
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
        </Space>
      ),
    },
  ];

  return (
    <div className="users-management">
      <div className="w-full flex justify-between gap-2">
        <h1 className="font-bold text-[24px] text-primary mb-3">
          Quản lý liên hệ
        </h1>
      </div>
      <Table<ContactType>
        columns={columns}
        dataSource={contacts}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: handlePageChange,
        }}
      />
      <Modal
        title="Cập nhật chủ đề"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Cập nhập trạng thái"
        cancelText="Hủy"
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Id" name="_id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Họ tên" name="fullName">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Nội dung" name="message">
            <TextArea disabled />
          </Form.Item>
          <Form.Item label="Trang thái" name="status" initialValue={"unread"}>
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="unread">Chưa đọc</Select.Option>
              <Select.Option value="read">Đã đọc</Select.Option>
              <Select.Option value="replied">Đã trả lời</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ContactUI;
