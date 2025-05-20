"use client";

import "./style.scss";
import { Accordion } from "react-bootstrap";

export default function FAQPage() {
  const faqList = [
    {
      question: "Làm sao để tạo tài khoản?",
      answer: `Bạn chỉ cần nhấn nút <strong>Đăng ký</strong> ở góc phải trên màn hình, <br />
    điền đầy đủ thông tin và xác nhận email là xong.`,
    },
    {
      question: "Tôi quên mật khẩu thì sao?",
      answer: `Vào trang đăng nhập, chọn mục <strong>Quên mật khẩu</strong>, <br />
    rồi làm theo hướng dẫn để nhận email khôi phục mật khẩu.`,
    },
    {
      question: "Làm sao để thay đổi thông tin cá nhân?",
      answer: `Vào phần <strong>Tài khoản</strong> sau khi đăng nhập, <br />
    chọn <strong>Chỉnh sửa thông tin</strong> để cập nhật tên, số điện thoại, ảnh đại diện...`,
    },
    {
      question: "Ứng dụng hỗ trợ những ngôn ngữ nào?",
      answer: `Hiện tại Bright English chỉ hỗ trợ tiếng Việt. <br />
    Các ngôn ngữ khác sẽ được cập nhật trong tương lai.`,
    },
    {
      question: "Làm thế nào để báo lỗi hoặc hỗ trợ?",
      answer: `Bạn có thể gửi phản hồi trực tiếp qua phần <strong>Hỗ trợ</strong> trong ứng dụng, <br />
    hoặc email cho mình tại <a href="mailto:nguyenthitrang.ttd@gmail.com">nguyenthitrang.ttd@gmail.com</a>.`,
    },
    {
      question: "Tôi có thể học offline không?",
      answer: `Hiện tại ứng dụng cần kết nối internet để học và lưu tiến trình, <br />
    mình sẽ bổ sung tính năng học offline trong các bản cập nhật sau.`,
    },
    {
      question: "Có cần phải trả phí khi sử dụng ứng dụng không?",
      answer: `Bạn có thể dùng miễn phí hầu hết các chức năng. <br />
    Một số tính năng nâng cao sẽ có trả phí nếu bạn muốn dùng thêm.`,
    },
    {
      question: "Làm sao để luyện phát âm cùng AI?",
      answer: `Khi học từ vựng hoặc luyện nói, bạn nhấn vào biểu tượng micro để ghi âm giọng nói. <br />
    AI sẽ chấm điểm và góp ý giúp bạn phát âm chuẩn hơn.`,
    },
    {
      question: "Tôi có thể dùng ứng dụng trên điện thoại không?",
      answer: `Có chứ! Ứng dụng hoạt động tốt trên trình duyệt điện thoại. <br />
    Phiên bản mobile app sẽ ra mắt trong thời gian tới.`,
    },
  ];

  return (
    <div className="faq-page">
      <h4 className="h1-title">❓ Câu hỏi thường gặp</h4>

      {faqList.map((item, index) => (
        <div className="faq-item" key={index}>
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
