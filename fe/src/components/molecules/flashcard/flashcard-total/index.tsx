import Image from "next/image";
import "./style.scss";
import { Book } from "@src/components/svgs";
import ButtonComponent from "@src/components/atoms/button";

interface FlashcardTotalProps {
  total: number;
  learned: number;
  name?: string;
  isRecently?: boolean;
}

function FlashcardTotal({
  total = 0,
  isRecently = false,
  learned = 0,
  name = "",
}: FlashcardTotalProps) {
  return (
    <div className="flashcard-total">
      {isRecently && <h2 className="h1-title">{name}</h2>}
      <div className="flashcard-total__wapper">
        <div className="book-container">
          <Image src={Book} alt="icon" width={64} height={64}/>
        </div>
        <div className="book-text">
          <h3 className="bc-title">Kết quả học tập hiện tại</h3>
          <div className="bc-content">
            <p>{total} từ vựng</p>
            <p>Số thẻ chưa học: {total - learned}</p>
            <p>Số từ vựng đã học: {learned}</p>
          </div>
        </div>
      </div>
      <div className="btn-wapper">
        <ButtonComponent
          background="#ff8400"
          borderRadius="48px"
          color="#fff"
          fontSize="14px"
          onClick={() => {}}
          padding="11px 24px"
          title="HỌC NGAY"
        />
      </div>
    </div>
  );
}

export default FlashcardTotal;
