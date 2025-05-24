import "./style.scss";

import { useAppDispatch, useAppSelector } from "@src/hooks/useHookReducers";
import { IUser } from "@src/types/interface";
import { ChartIcon, Logout, Setting } from "@src/components/svgs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserInfor } from "@src/services/auth";
import useBreadcrumb from "@src/hooks/useBreadcrumb";
import Image from "next/image";
import AvartarDefault from "@public/images/avatar-default.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import DialogComponent from "@src/components/atoms/dialog";
import LocalStorage from "@src/helpers/local-storage";
import CookieStorage from "@src/helpers/cookies";
import ButtonComponent from "@src/components/atoms/button";
import _ from "lodash";
import SettingComponent from "../setting";

const HeaderComponent = () => {
  const breadcrumb = useBreadcrumb();
  const router = useRouter();
  const [logout, setLogout] = useState(false);
  const [setting, setSetting] = useState(false);
  const dispatch = useAppDispatch();
  const userInfor: IUser | null = useAppSelector(
    (state) => state.auth.userInfor
  );

  const handleLogin = () => {
    router.push("/auth");
  };

  const handleLogout = () => {
    LocalStorage.removeLocalStorage(undefined, true);
    CookieStorage.removeCookie(undefined, true);
    dispatch(updateUserInfor({}));
    setLogout(false);
    router.push("/app");
  };

  return (
    <header className="header container-page">
      <div className="header-left">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "8px",
          }}
          className="header-left__title"
        >
          <h1 className="header-title">{breadcrumb?.title || "Trang chủ"}</h1>
        </div>
      </div>
      <div className="header-right">
        {_.isEmpty(userInfor) ||
        !LocalStorage.getLocalStorage("access-token", false) ? (
          <ButtonComponent
            background="#ff8400"
            borderRadius="48px"
            color="#fff"
            fontSize="14px"
            onClick={handleLogin}
            padding="12px 24px"
            title="Đăng nhập"
          />
        ) : (
          <div className="header-right__wapper">
            <div
              className="progress-icon"
              onClick={() => router.push("/progress")}
            >
              <Image src={ChartIcon} alt="icon" />
            </div>
            <Dropdown>
              <Dropdown.Toggle
                as="div"
                className="header-user"
                id="dropdown-basic"
              >
                {userInfor ? (
                  <Image
                    src={userInfor.avatar || AvartarDefault}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src={AvartarDefault}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item href="#/action-1"  onClick={() => setSetting(true)}>
                  <Image src={Setting} alt="" /> <span>Cài đặt</span>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => setLogout(true)}
                >
                  <Image src={Logout} alt="" /> <span>Đăng xuất</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>

      <SettingComponent showSetting={setting} setShowSetting={setSetting} />

      <DialogComponent
        show={logout}
        setIsOpen={setLogout}
        image={Logout}
        title={"Đăng xuất"}
        description="Bạn có chắc chắn muốn đăng xuất không?"
        textButtonLeft="Hủy"
        textButtonRight="Đăng xuất"
        colorButtonLeft="#8b90a7"
        colorButtonRight="#fff"
        handleCloseModal={() => setLogout(false)}
        handleButtonRight={handleLogout}
        bgRight="#f44336"
        bgLeft="#ebebf0"
      />
    </header>
  );
};

export default HeaderComponent;
