import { ITopic } from "@src/types/interface";
import "./style.scss";
import ButtonComponent from "../../button";
import Image from "next/image";
import Logo from "@public/images/testimonials-3.jpg";
import { useRouter } from "next/navigation";
import LocalStorage from "@src/helpers/local-storage";

function FlashcardItem({ item }: { item: ITopic }) {
  const router = useRouter();

  return (
    <div className="flashcard-item"
      style={{
        backgroundColor: LocalStorage.getLocalStorage('recently-flashcard', null) ? "#fff" : "#fffbea"
      }}
    >
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
          fontSize="12px"
          onClick={() => router.push(`/detail-flashcard/${item._id}?n=${item.name}`)}
          padding="6px 16px"
          title="HỌC NGAY"
        />
      </div>
    </div>
  );
}

export default FlashcardItem;
