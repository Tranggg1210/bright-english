import "./style.scss";

import { useAppSelector } from "@src/hooks/useHookReducers";
import { IUser } from "@src/types/interface";
import useBreadcrumb from "@src/hooks/useBreadcrumb";
import Image from "next/image";
import AvartarDefault from "@public/images/avatar-default.jpg";

const HeaderComponent = () => {
  const breadcrumb = useBreadcrumb();
  const userInfor: IUser | null = useAppSelector(
    (state) => state.auth.userInfor
  );

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
        <div className="header-user">
          {userInfor ? (
            <Image
              src={userInfor.avatar || AvartarDefault}
              alt="avatar"
              width={40}
              height={40}
            />
          ) : (
            <Image src={AvartarDefault} alt="avatar" width={40} height={40} />
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
