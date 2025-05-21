import LocalStorage from "@src/helpers/local-storage";
import "./style.scss";
import { useRouter } from "next/navigation";

const Banner: React.FC = () => {
  const router = useRouter();

  const handleSubmitBtn = () => {
    if (LocalStorage.getLocalStorage("access-token", null)) {
      router.push("/app");
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="landing-banner">
      <section className={`banner container-center`}>
        <div className="width-page">
          <h1>Bright English</h1>
          <h2>Học tiếng Anh dễ hiểu – vui vẻ – hiệu quả</h2>
          <div className="h-20">
            <button className="ld-banner-btn" onClick={handleSubmitBtn}>
              {LocalStorage.getLocalStorage("access-token", null)
                ? "TRẢI NGHIỆM"
                : "ĐĂNG NHẬP"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
