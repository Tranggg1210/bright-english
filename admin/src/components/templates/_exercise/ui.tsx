import React from "react";
import {
  Button,
  Modal,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ExerciseManagementProps, ExerciseType } from "@src/types/interface";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Delete from "@public/images/delete.png";

function ExerciseManagementUI({
  handleEdit,
  total,
  page,
  handlePageChange,
  exercises,
  handleDelete,
  isConfirmOpen,
  setIsConfirmOpen,
  confirmAction
}: ExerciseManagementProps) {
  const router = useRouter();

  const handleChange = (value: string) => {
    router.push(`/exercise/${value}`);
  };
  const columns: TableProps<ExerciseType>["columns"] = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Đề bài",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại bài tập",
      dataIndex: "type",
      key: "type",
      render: (type: "write" | "match" | "dictation" | "multiple_choice") => {
        const tag =
          type === "write"
            ? "Dạng viết"
            : type === "match"
            ? "Dạng nối"
            : type === "dictation"
            ? "Dạng nghe chép"
            : "Dạng gộp";
        const color =
          type === "write"
            ? "gray"
            : type === "match"
            ? "blue"
            : type === "dictation"
            ? "green"
            : "red";
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
        </Space>
      ),
    },
  ];

  return (
    <div className="users-management">
      <div className="w-full flex justify-between gap-2">
        <h1 className="font-bold text-[24px] text-primary mb-3">
          Quản lý bài tập
        </h1>
        <Select
          placeholder={
            <span>
              <PlusOutlined /> Thêm bài tập
            </span>
          }
          onChange={handleChange}
          style={{ width: 200, marginBottom: 16 }}
        >
          <Select.Option value="write">✍️ Viết</Select.Option>
          <Select.Option value="match">🔗 Nối</Select.Option>
          <Select.Option value="dictation">🎧 Nghe chép</Select.Option>
          <Select.Option value="multiple-choice">✅ Trắc nghiệm</Select.Option>
        </Select>
      </div>
      <Table<ExerciseType>
        columns={columns}
        dataSource={exercises}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: 10,
          total: total,
          onChange: handlePageChange,
        }}
      />
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
                background: "#dc3545",
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
            src={Delete}
            alt="minh họa"
            style={{ width: 80, height: 80, marginBottom: 16 }}
          />
          <p className="font-bold text-secondarys text-[18px] ">
            Xóa bài tập
          </p>
          <p className="font-normal text-secondarys text-[14px] mb-3">
            Bạn có chắc chắn muốn xóa bài tập này không?
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default ExerciseManagementUI;
