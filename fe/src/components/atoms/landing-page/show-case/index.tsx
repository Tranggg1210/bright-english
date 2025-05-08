import "./style.scss";
import scImage1 from "@public/images/bg-showcase-1.jpg";
import scImage2 from "@public/images/bg-showcase-2.jpg";
import scImage3 from "@public/images/bg-showcase-3.jpg";
import Image from "next/image";

function ShowCase() {
  return (
    <div className="landing-show-case">
      <section className="show-case">
        <div className="show-case-item">
          <div className="show-case-content">
            <h1 className="h1-title">Học Tiếng Anh Dễ Dàng Mỗi Ngày</h1>
            <p className="p-desc">
              Bright English giúp bạn biến việc học tiếng Anh thành thói quen
              đơn giản. Dù chỉ 10 phút mỗi ngày, bạn vẫn có thể cải thiện từ
              vựng, phản xạ và kỹ năng giao tiếp một cách tự nhiên.
            </p>
          </div>
          <div className="show-case-img">
            <Image src={scImage1} alt="show case image 1" />
          </div>
        </div>
        <div className="show-case-item">
          <div className="show-case-img">
            <Image src={scImage2} alt="show case image 1" />
          </div>
          <div className="show-case-content">
            <h1 className="h1-title">
              {" "}
              Đa Dạng Bài Tập, Không Bao Giờ Nhàm Chán
            </h1>
            <p className="p-desc">
              Từ flashcard, điền từ, nghe chép chính tả đến luyện nói với AI –
              mỗi ngày đều là một trải nghiệm mới mẻ. Bạn sẽ không còn thấy việc
              học tiếng Anh là khô khan nữa!
            </p>
          </div>
        </div>
        <div className="show-case-item">
          <div className="show-case-content">
            <h1 className="h1-title">Học Theo Chủ Đề Gần Gũi, Thực Tế</h1>
            <p className="p-desc">
              Từ công việc, du lịch đến sở thích hằng ngày – các bài học được
              thiết kế theo chủ đề quen thuộc, giúp bạn áp dụng tiếng Anh vào
              đời sống dễ dàng và tự nhiên hơn.
            </p>
          </div>
          <div className="show-case-img">
            <Image src={scImage3} alt="show case image 1" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShowCase;
