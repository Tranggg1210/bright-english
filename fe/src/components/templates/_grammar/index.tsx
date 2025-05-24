"use client";

import "./style.scss";
import Loading from "@src/components/atoms/loading";
import GrammarContent from "@src/components/molecules/grammar/grammar-content";
import SidebarGrammar from "@src/components/molecules/grammar/grammar-sidebar";
import EmptyPage from "@src/components/organisms/_empty-page";
import { useAppDispatch } from "@src/hooks/useHookReducers";
import useNotification from "@src/hooks/useNotification";
import { getListGrammar } from "@src/services/grammar";
import { IGrammar } from "@src/types/interface";
import React, { useEffect, useState } from "react";

function Grammar() {
  const [loading, setLoading] = useState(false);
  const [grammars, setGrammars] = useState<IGrammar[] | null>([]);
  const [grammarActiveIndex, setGrammarActiveIndex] = useState<number>(0);
  const { notify } = useNotification();
  const dispatch = useAppDispatch();

  const loaderListGrammar = async () => {
    try {
      setLoading(true);

      const res = await dispatch(
        getListGrammar({
          limit: 100,
          page: 1,
        })
      ).unwrap();
      if (res) {
        setGrammars(res?.data?.grammars || []);
      }
    } catch (error) {
      console.log(error);
      setGrammars(null);
      notify("error", "Lỗi không thể lấy danh sách các bài ngữ pháp!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loaderListGrammar();
  }, []);

  return (
    <div className="grammar">
      {loading && <Loading />}
      {grammars ? (
        <div className="grammar-container">
          <SidebarGrammar
            grammars={grammars}
            grammarActiveIndex={grammarActiveIndex}
            setGrammarActiveIndex={setGrammarActiveIndex}
          />
          <GrammarContent grammarItem={grammars?.[grammarActiveIndex]}/>
        </div>
      ) : (
        <EmptyPage
          title="Không thể tải dữ liệu"
          description="Có vẻ như hệ thống gặp sự cố khi lấy các bài ngữ pháp. Thử kiểm tra kết nối mạng hoặc tải lại trang nhé."
          showButton={false}
        />
      )}
    </div>
  );
}

export default Grammar;
