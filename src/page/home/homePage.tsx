import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaChartBar, FaBook, FaMicrophone, FaFileAlt, FaClock, FaBalanceScale, FaFilePdf, FaFileWord, FaFileExcel, FaWeixin, FaWeibo, FaQq, FaEnvelope } from 'react-icons/fa';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './homePage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const HomePage = () => {
  const [exams, setExams] = useState([
    {
      id: 'exam1',
      name: '2024年国家公务员考试',
      date: '2024-11-28',
      tag: '国家考试',
      days: 62,
      hours: 15,
      minutes: 28,
      seconds: 46
    },
    {
      id: 'exam2',
      name: '2024年省考联考',
      date: '2024-03-30',
      tag: '省级考试',
      days: 128,
      hours: 10,
      minutes: 45,
      seconds: 22
    },
    {
      id: 'exam3',
      name: '2024年事业单位考试',
      date: '2024-05-15',
      tag: '事业单位',
      days: 174,
      hours: 8,
      minutes: 12,
      seconds: 33
    }
  ]);

  // 图表数据
  const trendChartData = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        label: '学习时间 (小时)',
        data: [2.5, 3.2, 2.8, 3.5, 4.0, 5.2, 4.5],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const subjectChartData = {
    labels: ['行测', '申论', '面试', '常识'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#9b59b6',
          '#e74c3c'
        ]
      }
    ]
  };

  const knowledgeChartData = {
    labels: ['数量关系', '判断推理', '资料分析', '言语理解', '常识判断'],
    datasets: [
      {
        label: '掌握程度 (%)',
        data: [75, 82, 90, 78, 65],
        backgroundColor: '#3498db',
        borderWidth: 0
      }
    ]
  };

  // 更新倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setExams(prevExams => 
        prevExams.map(exam => {
          let { days, hours, minutes, seconds } = exam;
          
          seconds--;
          if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
              minutes = 59;
              hours--;
              if (hours < 0) {
                hours = 23;
                days--;
                if (days < 0) {
                  days = hours = minutes = seconds = 0;
                }
              }
            }
          }
          
          return {
            ...exam,
            days,
            hours,
            minutes,
            seconds
          };
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div>    
    {/* 头部导航 */}
      {/* <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <FaGraduationCap className="logo-icon" />
              公考<span>助手</span>
            </div>
            <nav>
              <ul>
                <li><a href="#" className="active">首页</a></li>
                <li><a href="#">统计分析</a></li>
                <li><a href="#">学习计划</a></li>
                <li><a href="#">错题本</a></li>
                <li><a href="#">备考资料</a></li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <button className="btn btn-login">登录</button>
              <button className="btn btn-register">注册</button>
            </div>
          </div>
        </div>
      </header> */}
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
          <div className="section-title">
            <h2>考试倒计时</h2>
            <p>实时掌握各考试倒计时，科学规划备考时间</p>
          </div>
          
          {/* 多考试倒计时容器 */}
          <div className="exams-container">
            {exams.map(exam => (
              <div key={exam.id} className="exam-card">
                <div className="exam-tag">{exam.tag}</div>
                <div className="exam-header">
                  <div className="exam-title">{exam.name}</div>
                  <div className="exam-date">{exam.date}</div>
                </div>
                <div className="countdown-timer">
                  <div className="countdown-unit">
                    <div className="countdown-value">{exam.days}</div>
                    <div className="countdown-label">天</div>
                  </div>
                  <div className="countdown-unit">
                    <div className="countdown-value">{exam.hours.toString().padStart(2, '0')}</div>
                    <div className="countdown-label">时</div>
                  </div>
                  <div className="countdown-unit">
                    <div className="countdown-value">{exam.minutes.toString().padStart(2, '0')}</div>
                    <div className="countdown-label">分</div>
                  </div>
                  <div className="countdown-unit">
                    <div className="countdown-value">{exam.seconds.toString().padStart(2, '0')}</div>
                    <div className="countdown-label">秒</div>
                  </div>
                </div>
                <button className="exam-btn">查看备考计划</button>
              </div>
            ))}
          </div>

          {/* 统计分析模块 */}
          <div className="section-title">
            <h2>学习数据分析</h2>
            <p>您的学习进度和科目分布统计</p>
          </div>
          
          <div className="statistics-section">
            {/* 学习趋势图 */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">学习时间趋势</div>
              </div>
              <div className="chart-container">
                <Line 
                  data={trendChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: '小时'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            {/* 科目分布图 */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">科目学习分布</div>
              </div>
              <div className="chart-container">
                <Doughnut 
                  data={subjectChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            {/* 学习数据统计 */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">学习数据概览</div>
              </div>
              <div className="stat-grid">
                <div className="stat-item">
                  <div className="stat-value">36</div>
                  <div className="stat-label">学习天数</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">124</div>
                  <div className="stat-label">学习小时</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">86%</div>
                  <div className="stat-label">完成进度</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">72%</div>
                  <div className="stat-label">正确率</div>
                </div>
              </div>
            </div>
            
            {/* 知识点掌握情况 */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">知识点掌握情况</div>
              </div>
              <div className="chart-container">
                <Bar 
                  data={knowledgeChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: '掌握程度 (%)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;