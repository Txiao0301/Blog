import React from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// 注册所有需要的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

const StatisticsSection: React.FC = () => (
  <>
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
                legend: { position: 'top' }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: '小时' }
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
                legend: { position: 'right' }
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
                legend: { display: false }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: { display: true, text: '掌握程度 (%)' }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  </>
);

export default StatisticsSection;