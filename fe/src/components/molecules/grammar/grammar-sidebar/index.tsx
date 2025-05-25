"use client";

import Image from "next/image";
import "./style.scss";
import { IGrammar } from "@src/types/interface";
import { Book } from "@src/components/svgs";
import { formatDateToVN } from "@src/utils/format-time";
import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';

function SidebarGrammar({
  grammars,
  grammarActiveIndex,
  setGrammarActiveIndex,
}: {
  grammars: IGrammar[];
  grammarActiveIndex: number;
  setGrammarActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const renderList = () => (
    <>
      {grammars.map((item, index) => (
        <div
          className={`sidebar-grammar-item ${
            grammarActiveIndex === index ? "sidebar-grammar-active" : ""
          }`}
          key={item._id}
          onClick={() => setGrammarActiveIndex(index)}
        >
          <Image src={Book} alt="icon" />
          <h2 className="sgi-title">{item.title}</h2>
          {item?.updatedAt && (
            <div className="sgi-date">
              Ngày tạo: {formatDateToVN(item.updatedAt)}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return grammars && grammars.length > 0 ? (
    <>
      <div className="gs-mobile">
        <button
          className="btn btn-primary gs-mobile-btn m-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#grammarMenu"
        >
          ☰
        </button>

        <div
          className="offcanvas offcanvas-start sidebar-grammar"
          tabIndex={-1}
          id="grammarMenu"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Danh sách ngữ pháp</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">{renderList()}</div>
        </div>
      </div>

      {/* Desktop */}
      <div className="gs-desktop">
        <div className="sidebar-grammar">{renderList()}</div>
      </div>
    </>
  ) : null;
}

export default SidebarGrammar;
