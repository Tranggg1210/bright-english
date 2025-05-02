import React from "react";
import {
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Select,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { UserManagementProps, UserType } from "@src/types/interface";
import { formatDateToVN } from "@src/utils/format-time";
import { toast } from "react-toastify";
import Image from "next/image";
import Warning from "@public/images/warning.png";
import Delete from "@public/images/delete.png";

function UserManagementUI({
  handleAddUser,
  handleEdit,
  handleDelete,
  handleLockOrUnLock,
  users,
  page,
  handlePageChange,
  totalUsers,
  currentUser,
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
}: UserManagementProps) {
  const columns: TableProps<UserType>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      render: (text) => <span>{formatDateToVN(text)}</span>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      key: "isLocked",
      dataIndex: "isLocked",
      render: (isLocked: boolean) => {
        const tag = isLocked ? "Khóa" : "Hoạt động";
        const color = isLocked ? "red" : "green";
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

          <Tooltip title="Xoá">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>

          <Tooltip title={record.isLocked ? "Mở khóa" : "Khóa"}>
            {record.isLocked ? (
              <UnlockOutlined
                style={{ color: "green", cursor: "pointer" }}
                onClick={() => handleLockOrUnLock(record)}
              />
            ) : (
              <LockOutlined
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleLockOrUnLock(record)}
              />
            )}
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="users-management">
      <div className="w-full flex justify-between gap-2">
        <h1 className="title text-primary mb-3">Quản lý người dùng</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddUser}
          style={{ marginBottom: 16 }}
        >
          Thêm người dùng
        </Button>
      </div>
      <Table<UserType>
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: 10,
          total: totalUsers,
          onChange: handlePageChange,
        }}
      />
      <Modal
        title={currentUser ? "Cập nhật người dùng" : "Thêm người dùng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentUser ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        style={{ top: 10 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Ảnh đại diện">
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              placeholder="Nhập email của bạn"
              disabled={!!currentUser?.email}
            />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên của bạn" />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dob">
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder="Nhập ngày sinh của bạn"
            />
          </Form.Item>

          <Form.Item label="Vai trò" name="role" initialValue={"user"}>
            <Select placeholder="Chọn vai trò">
              <Select.Option value="admin">Quản trị viên</Select.Option>
              <Select.Option value="user">Người dùng</Select.Option>
            </Select>
          </Form.Item>

          {!currentUser && (
            <>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Nhập mật khẩu của bạn" />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu của bạn" />
              </Form.Item>
            </>
          )}
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

export default UserManagementUI;
