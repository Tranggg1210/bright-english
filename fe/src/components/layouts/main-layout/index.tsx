"use client";

import "./style.scss";
import { ReactNode } from "react";
import HeaderComponent from "@src/components/organisms/header";
import Sidebar from "@src/components/organisms/sidebar";

type MainLayoutProps = {
  main: ReactNode;
};

const MainLayout = ({ main }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <div className="main-layout__sidebar">
        <Sidebar />
      </div>

      <div className="main-layout__content">
        <HeaderComponent />
        <div className="container-page">{main}</div>
      </div>
    </div>
  );
};

export default MainLayout;
