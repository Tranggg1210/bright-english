import React from "react";
import {
  Space,
  Table,
  TableProps,
  Tooltip,
  Modal,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { GrammarManagementProps, GrammarType } from "@src/types/interface";
import Image from "next/image";
import Warning from "@public/images/warning.png";
import Delete from "@public/images/delete.png";

function TopicManagementUI({
  handleEdit,
  confirmAction,
  confirmTitle,
  isConfirmOpen,
  setIsConfirmOpen,
  grammars,
  handleAdd,
  handleDelete,
  handlePageChange,
  page,
  total
}: GrammarManagementProps) {
  const columns: TableProps<GrammarType>["columns"] = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
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
          Quản lý ngữ pháp
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Thêm bài
        </Button>
      </div>
      <Table<GrammarType>
        columns={columns}
        dataSource={grammars}
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
