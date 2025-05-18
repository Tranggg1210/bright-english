"use client";

import { Button, Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConversationType } from "@src/types/interface";
import ConversationHeader from "@src/components/organisms/conversation/header";
import PreviewConversation from "@src/components/molecules/conversation/preview-conversation";
import ListInforForm from "@src/components/molecules/conversation/conversation-infor";
import ListConverForm from "@src/components/molecules/conversation/conversation-form";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import {
  createConversation,
  getConversationById,
  updateConversation,
} from "@src/services/conversation";
import { toast } from "react-toastify";
import _ from "lodash";

function ActionsConversation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<{
    name: string;
    description?: string;
    topicId: string;
  }>({
    name: "",
    topicId: "",
    description: "",
  });
  const [conversation, setConversation] = useState<
    ConversationType["listConver"]
  >([]);
  const [listInfor, setListInfor] = useState<ConversationType["listInfor"]>({
    speakerA: {
      avatar: "",
      name: "",
    },
    speakerB: {
      avatar: "",
      name: "",
    },
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const loaderConversationById = async () => {
    try {
      const {
        data,
      }: {
        data: {
          conversation: ConversationType;
        };
      } = await dispatch(
        getConversationById({
          _id: searchParams.get("q"),
        })
      ).unwrap();

      if (data && !_.isEmpty(data)) {
        setTitle({
          topicId: data.conversation.topicId,
          name: data.conversation.name,
          description: data.conversation.description,
        });
        setConversation(data.conversation.listConver);
        setListInfor(data.conversation.listInfor);
      }
    } catch {
      toast.dismiss();
      toast.error("Không thể lấy dữ liệu của bài hội thoại!");
      router.back();
    }
  };

  useEffect(() => {
    if (searchParams.get("q")) {
      loaderConversationById();
    }
  }, []);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const isPreviewDisabled = !(
    title.name &&
    title.topicId &&
    conversation.length > 2 &&
    listInfor.speakerA.name &&
    listInfor.speakerB.name
  );

  const handleSave = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newConversation: ConversationType = {
        ...title,
        listInfor,
        listConver: conversation?.map(({ _id, ...rest }) => rest),
      };

      if (searchParams.get("q")) {
        await dispatch(
          updateConversation({
            id: searchParams.get("q") || "",
            conversation: newConversation,
          })
        );
        toast.success("Chỉnh sửa bài hội thoại thành công!");
      } else {
        await dispatch(createConversation(newConversation));
        toast.success("Tạo bài hội thoại thành công!");
      }

      setTimeout(() => {
        router.push("/conversation");
      }, 500);
    } catch {
      toast.dismiss();
      toast.error(
        searchParams.get("q")
          ? "Lỗi không thể chỉnh sửa bài hội thoại!"
          : "Lỗi không thể tạo bài hội thoại!"
      );
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Button
            type="default"
            icon={<LeftOutlined />}
            onClick={() => router.push("/conversation")}
          />
          <h1 className="font-bold text-[24px] text-primary">
            {searchParams.get("q") ? "Chỉnh sửa hội thoại" : "Tạo hội thoại"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            onClick={handleSave}
            disabled={isPreviewDisabled}
            style={{ marginLeft: "auto" }}
          >
            Lưu
          </Button>
          <Button
            type="dashed"
            onClick={handlePreview}
            disabled={isPreviewDisabled}
            style={{ marginLeft: "auto" }}
          >
            🔍 Xem trước
          </Button>
        </div>
      </div>

      <ConversationHeader value={title} onChange={setTitle} />

      <ListInforForm onChange={setListInfor} value={listInfor} />

      <ListConverForm onChange={setConversation} value={conversation || []} />

      <Modal
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        footer={null}
        width={800}
      >
        <PreviewConversation
          listConver={conversation || []}
          listInfor={listInfor}
          title={title}
        />
      </Modal>
    </div>
  );
}

export default ActionsConversation;
