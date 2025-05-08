import "./style.scss";

function Features() {
  return (
    <div className="landing-features">
      <section className="features container-center">
        <div className="width-page">
          <div className="feature-item">
            <div className="icon">💡</div>
            <h1 className="h1-title">Học từ vựng</h1>
            <p className="p-desc">
              Ghi nhớ từ nhanh hơn nhờ hình ảnh, phiên âm và ví dụ sinh động.
            </p>
          </div>
          <div className="feature-item">
            <div className="icon">📝</div>
            <h1 className="h1-title">Làm bài tập</h1>
            <p className="p-desc">
              Nhiều dạng bài như trắc nghiệm, nối từ, nghe chép, viết
              câu.
            </p>
          </div>
          <div className="feature-item">
            <div className="icon">🤖</div>
            <h1 className="h1-title">Luyện nói AI</h1>
            <p className="p-desc">
              Tự luyện phản xạ tiếng Anh thật như giao tiếp với người bản xứ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
