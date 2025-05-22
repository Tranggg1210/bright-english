import { ITopic } from "@src/types/interface";
import "./style.scss";
import ButtonComponent from "../../button";

function FlashcardItem({ item }: { item: ITopic }) {
  return (
    <div className="flashcard-item">
      <h2>{item.name}</h2>
      <div className="mt-3">
        <ButtonComponent
          background="#ff8400"
          borderRadius="48px"
          color="#fff"
          fontSize="10px"
          onClick={() => {}}
          padding="6px 16px"
          title="HỌC NGAY"
          width="100%"
        />
      </div>
    </div>
  );
}

export default FlashcardItem;
