import "./style.scss";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@public/images/logo.png";

function Header() {
  const router = useRouter();
  return (
    <div className="landing-header">
      <header className="container-center header">
        <div className="width-page">
          <Link href={"/app"}>
            <Image src={Logo} alt="logo" />
          </Link>
          <div className="flex justify-center items-center gap-4">
            <button
              className="btn btn-sign-up"
              onClick={() => router.push("/login")}
            >
              ĐĂNG NHẬP
            </button>
            <button
              className="btn btn-sign-up !opacity-80"
              onClick={() => router.push("/login")}
            >
              TRẢI NGHIỆM {">>"}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
