"use client";

import "./style.scss";
import Banner from "@src/components/atoms/landing-page/banner";
import Features from "@src/components/atoms/landing-page/features";
import ShowCase from "@src/components/atoms/landing-page/show-case";
import Testimonials from "@src/components/atoms/landing-page/testimonials";
import Header from "@src/components/atoms/landing-page/header";
import Footer from "@src/components/atoms/landing-page/footer";
import VerticalTimeline from "@src/components/atoms/landing-page/timeline";



const LandingPage: React.FC = () => {

  return (
    <div className={`landing-page`}>
      <Header />
      <Banner />
      <Features />
      <ShowCase />
      <Testimonials />
      <VerticalTimeline/>
      <Footer />
    </div>
  );
};

export default LandingPage;
