import React from 'react';
import './homePage.css';
import ExamsCountdown from './ExamsCountdown';
import StatisticsSection from './StatisticsSection';

const HomePage = () => {
  return (
    <div>
      {/* 英雄区域 */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>高效备考，轻松上岸</h1>
            <p>提供最新公务员考试资讯、备考策略与实用技巧，助您一举成功</p>
          </div>
        </div>
      </section>
      {/* 主要内容区域 */}
      <main className="main-content">
        <div className="container">
          <ExamsCountdown />
          <StatisticsSection />
        </div>
      </main>
    </div>
  );
};

export default HomePage;