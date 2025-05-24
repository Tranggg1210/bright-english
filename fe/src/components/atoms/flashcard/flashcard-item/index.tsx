import { ITopic } from "@src/types/interface";
import "./style.scss";
import ButtonComponent from "../../button";
import Image from "next/image";
import Logo from "@public/images/testimonials-3.jpg";

function FlashcardItem({ item }: { item: ITopic }) {
  return (
    <div className="flashcard-item">
      <h2>{item.name}</h2>
      <div className="num-vocab">📚 {item?.numVocab || 0} từ vựng</div>
      <div className="flex justify-between items-center gap-2">
        <div className="author">
            <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image src={Logo} alt="icon" width={40} height={40}/>
            </div>
            <p>Bright English</p>
        </div>
        <ButtonComponent
          background="#ff8400"
          borderRadius="48px"
          color="#fff"
          fontSize="10px"
          onClick={() => {}}
          padding="6px 16px"
          title="HỌC NGAY"
        />
      </div>
    </div>
  );
}

export default FlashcardItem;
