"use client";

import Image from "next/image";
import "./style.scss";
import { IGrammar } from "@src/types/interface";
import { Book } from "@src/components/svgs";
import { formatDateToVN } from "@src/utils/format-time";
import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

function SidebarGrammar({
  grammars,
  grammarActiveIndex,
  setGrammarActiveIndex,
}: {
  grammars: IGrammar[];
  grammarActiveIndex: number;
  setGrammarActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderList = () => (
    <>
      {grammars.map((item, index) => (
        <div
          className={`sidebar-grammar-item ${
            grammarActiveIndex === index ? "sidebar-grammar-active" : ""
          }`}
          key={item._id}
          onClick={() => {
            setGrammarActiveIndex(index);
            handleClose(); // Đóng offcanvas khi chọn item
          }}
          style={{ cursor: "pointer" }}
        >
          <Image src={Book} alt="icon" />
          <h2 className="sgi-title">{item.title}</h2>
          {item?.updatedAt && (
            <div className="sgi-date">Ngày tạo: {formatDateToVN(item.updatedAt)}</div>
          )}
        </div>
      ))}
    </>
  );

  if (!grammars || grammars.length === 0) return null;

  return (
    <>
      {/* Mobile */}
      <div className="gs-mobile">
        <Button className="btn-primary gs-mobile-btn m-2" onClick={handleShow}>
          ☰
        </Button>

        <Offcanvas show={show} onHide={handleClose} className="sidebar-grammar">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Danh sách ngữ pháp</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{renderList()}</Offcanvas.Body>
        </Offcanvas>
      </div>

      {/* Desktop */}
      <div className="gs-desktop">
        <div className="sidebar-grammar">{renderList()}</div>
      </div>
    </>
  );
}

export default SidebarGrammar;
