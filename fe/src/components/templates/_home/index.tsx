import "./style.scss";
import ListCardStudy from "@src/components/molecules/home/list-card-study";
import BannerHome from "@src/components/molecules/home/banner";

function Home() {
  return (
    <div className="home-page">
     <BannerHome/>
     <ListCardStudy/>
    </div>
  );
}

export default Home;
