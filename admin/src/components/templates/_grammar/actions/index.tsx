"use client";

import "./style.scss";
import { Button, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { GrammarType } from "@src/types/interface";
import PreviewGrammarModal from "@src/components/molecules/grammar/grammar-preview";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import {
  createGrammar,
  getGrammarById,
  updateGrammar,
} from "@src/services/grammar";
import _ from "lodash";

function GrammarAction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [grammar, setGrammar] = useState<GrammarType>({
    title: "",
    description: "",
    content: "",
    source: "",
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const loaderGrammarById = async () => {
    try {
      const {
        data,
      }: {
        data: {
          grammar: GrammarType;
        };
      } = await dispatch(
        getGrammarById({
          _id: searchParams.get("q"),
        })
      ).unwrap();

      if (data && !_.isEmpty(data)) {
        setGrammar(data.grammar);
      }
    } catch {
      toast.dismiss();
      toast.error("Không thể lấy dữ liệu của bài ngữ pháp!");
      router.back();
    }
  };

  useEffect(() => {
    const id = searchParams.get("q");
    if (id) {
      loaderGrammarById();
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    setGrammar((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!grammar.title || !grammar.content) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    try {
      const { _id, createdAt, updatedAt,__v, ...newGrammar } = grammar;
      if (searchParams.get("q")) {
        await dispatch(
          updateGrammar({
            id: searchParams.get("q") || _id || "",
            grammar: newGrammar,
          })
        ).unwrap();
        toast.success("Cập nhật bài ngữ pháp thành công!");
      } else {
        await dispatch(createGrammar(newGrammar)).unwrap();
        toast.success("Tạo bài ngữ pháp thành công!");
      }
      router.push("/grammar");
    } catch {
      toast.error("Đã có lỗi xảy ra khi lưu bài ngữ pháp!");
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Button
            type="default"
            icon={<LeftOutlined />}
            onClick={() => router.push("/grammar")}
          />
          <h1 className="font-bold text-[24px] text-primary">
            {searchParams.get("q") ? "Chỉnh sửa ngữ pháp" : "Tạo bài ngữ pháp"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            disabled={!grammar.title || !grammar.content}
            onClick={handleSave}
          >
            Lưu
          </Button>
          <Button
            onClick={() => setIsPreviewOpen(true)}
            disabled={!grammar.title || !grammar.content}
          >
            Xem trước
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Tiêu đề bài ngữ pháp <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Nhập tiêu đề..."
            value={grammar.title}
            onChange={(e) => handleChange("title", e.target.value)}
            minLength={2}
            maxLength={500}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Mô tả ngắn
          </label>
          <Input.TextArea
            rows={3}
            maxLength={500}
            placeholder="Mô tả không bắt buộc..."
            value={grammar.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-sm text-gray-700">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={grammar.content}
            onChange={(value) => handleChange("content", value)}
            className="custom-quill"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Nguồn tham khảo
          </label>
          <Input
            placeholder="Ví dụ: Oxford, Cambridge, v.v."
            value={grammar.source}
            onChange={(e) => handleChange("source", e.target.value)}
          />
        </div>
      </div>

      <PreviewGrammarModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={grammar}
      />
    </div>
  );
}

export default GrammarAction;
