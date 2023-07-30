import React from "react";
import "./HomePage.css";
import Navbar from "../../components/sidebar/Navbar";
import NewsOutline from "../../components/newsOutline/NewsOutline";

function HomePage() {
  return (
    <div className="homeLayout">
      <div className="content">
        <div className="content-header">
            <div className="content-header-line"></div>
            <div>Latest</div>
        </div>
        <div className="news-cont">
            <NewsOutline/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
