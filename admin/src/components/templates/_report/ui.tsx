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
import {  ReportManagementProps, ReportType } from "@src/types/interface";
import TextArea from "antd/es/input/TextArea";

function ContactUI({
  handleEdit,
  handleCancel,
  handleOk,
  isModalOpen,
  form,
  total,
  page,
  handlePageChange,
  reports
}: ReportManagementProps) {
  const columns: TableProps<ReportType>["columns"] = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
          Quản lý báo cáo
        </h1>
      </div>
      <Table<ReportType>
        columns={columns}
        dataSource={reports}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: handlePageChange,
        }}
      />
      <Modal
        title="Cập nhật bài báo cáo"
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
          <Form.Item label="Họ tên" name="fullname">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Tiêu đề" name="title">
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
