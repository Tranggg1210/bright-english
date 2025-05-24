"use client";

import "./style.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordSuccess from "@public/images/forgot-password-success.png";
import DialogComponent from "@src/components/atoms/dialog";
import ModalComponent from "@src/components/atoms/modal";
import ResetPassword from "./reset-password";
import ChangeInfor from "./change-infor";
import LocalStorage from "@src/helpers/local-storage";
import CookieStorage from "@src/helpers/cookies";

interface SettingProps {
  showSetting: boolean;
  setShowSetting: (value: boolean) => void;
}

const SettingComponent = ({ showSetting, setShowSetting }: SettingProps) => {
  const [activeNav, setActiveNav] = useState<"infor" | "changePassword">(
    "infor"
  );
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleCloseDialog = () => {
    setShowDialog(false);
    LocalStorage.removeLocalStorage(undefined, true);
    CookieStorage.removeCookie(undefined, true);
    router.push("/auth");
  };

  return (
    <>
      <ModalComponent
        isShow={showSetting}
        setIsShow={() => {
          setActiveNav("infor");
          setShowSetting(false);
        }}
        titleModal="Cài đặt"
      >
        <div className="space-y-4 setting">
          {/* Navigation */}
          <div className="flex gap-3 setting__nav">
            <button
              onClick={() => setActiveNav("infor")}
              className={`py-2 px-4 rounded-full ${
                activeNav === "infor"
                  ? "setting__nav--active"
                  : "setting__nav--item"
              }`}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setActiveNav("changePassword")}
              className={`py-2 px-4 rounded-full ${
                activeNav === "changePassword"
                  ? "setting__nav--active"
                  : "setting__nav--item"
              }`}
            >
              Đổi mật khẩu
            </button>
          </div>

          {/* Content */}
          <div>
            {activeNav === "infor" && <ChangeInfor isOpen={showSetting} />}
            {activeNav === "changePassword" && (
              <ResetPassword setShowDialog={setShowDialog} setShowSetting={setShowSetting} />
            )}
          </div>
        </div>
      </ModalComponent>

      <DialogComponent
        bgRight="#3fcb8c"
        colorButtonRight="#fff"
        handleButtonRight={handleCloseDialog}
        image={ForgotPasswordSuccess}
        setIsOpen={handleCloseDialog}
        isDisableCloseModalInOverlay
        description="Vui lòng đăng nhập lại để tiếp tục sử dụng ứng dụng"
        textButtonRight="Đồng ý"
        title="Đổi mật khẩu thành công"
        show={showDialog}
      />
    </>
  );
};

export default SettingComponent;
