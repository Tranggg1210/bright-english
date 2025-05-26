"use client";

import "./style.scss";
import { ReactNode } from "react";
import HeaderComponent from "@src/components/organisms/header";
import Sidebar from "@src/components/organisms/sidebar";
import { usePathname } from "next/navigation";

type MainLayoutProps = {
  main: ReactNode;
};

const MainLayout = ({ main }: MainLayoutProps) => {
  const pathName = usePathname();

  const isShowHeader = !(pathName.includes("/study-flashcard") || pathName.includes("/detail-exercise"));
  const isShowSidebar = !(pathName.includes("/study-flashcard"));

  return (
    <div className="main-layout">
      {isShowSidebar && (
        <div className="main-layout__sidebar">
          <Sidebar />
        </div>
      )}

      <div className="main-layout__content"
        style={{
          marginLeft: isShowSidebar ? 0 : "16px"
        }}
      >
        {isShowHeader && <HeaderComponent />}
        <div className="container-page">{main}</div>
      </div>
    </div>
  );
};

export default MainLayout;
