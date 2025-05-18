import React from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ConversationManagementProps, ConversationType } from "@src/types/interface";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Delete from "@public/images/delete.png";
import { formatDateToVN } from "@src/utils/format-time";

function ConversationManagementUI({
  handleEdit,
  total,
  page,
  handlePageChange,
  handleDelete,
  conversations,
  isConfirmOpen,
  setIsConfirmOpen,
  confirmAction,
}: ConversationManagementProps) {
  const router = useRouter();

  const handleAdd = () => {
    router.push(`/conversation/actions`);
  };

  const columns: TableProps<ConversationType>["columns"] = [
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
      title: "Ngày tạo",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => <span>{formatDateToVN(text)}</span>,
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
          Quản lý hội thoại
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Thêm bài hội thoại
        </Button>
      </div>
      <Table<ConversationType>
        columns={columns}
        dataSource={conversations}
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
            Xóa bài hội thoại
          </p>
          <p className="font-normal text-secondarys text-[14px] mb-3">
            Bạn có chắc chắn muốn xóa bài hội thoại này không?
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default ConversationManagementUI;
