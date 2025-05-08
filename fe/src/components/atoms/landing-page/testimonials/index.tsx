import "./style.scss";
import tesImage1 from "@public/images/testimonials-1.jpg";
import tesImage2 from "@public/images/testimonials-2.jpg";
import tesImage3 from "@public/images/testimonials-3.jpg";
import Image from "next/image";

function Testimonials() {
  return (
    <div className="landing-testimonials">
      <section className="testimonials container-center">
        <div className="width-page">
          <h1 className="h1-title">Mọi người đang nói gì...</h1>
          <div className="testimonials-container">
            <div className="testimonial-item">
              <div className="avatar">
                <Image src={tesImage1} alt="avatar" />
              </div>
              <h3>Lê Ánh</h3>
              <p>
                {" "}
                Từ ngày dùng Bright English, mình học từ vựng dễ nhớ hẳn. Mỗi
                ngày chỉ học 15 phút mà nhớ lâu cực kỳ!
              </p>
            </div>
            <div className="testimonial-item">
              <div className="avatar">
                <Image src={tesImage2} alt="avatar" />
              </div>
              <h3>Minh</h3>
              <p>
                Mình thích phần luyện nghe và nói với AI nhất. Cảm giác như đang
                trò chuyện thật luôn, không ngại phát âm sai nữa.
              </p>
            </div>
            <div className="testimonial-item">
              <div className="avatar">
                <Image src={tesImage3} alt="avatar" />
              </div>
              <h3>Phương Anh</h3>
              <p>
                Bài tập đa dạng mà không bị nhàm chán, học theo chủ đề nên áp
                dụng được ngay trong cuộc sống.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
