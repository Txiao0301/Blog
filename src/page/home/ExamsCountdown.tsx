import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../mock/homePage';

// 计算距离考试时间的天、时、分、秒
function getCountdown(targetDate: string | number | Date) {
    const now = new Date().getTime();
    const end = new Date(targetDate).getTime();
    let diff = Math.max(0, Math.floor((end - now) / 1000));
    const days = Math.floor(diff / (24 * 3600));
    diff %= 24 * 3600;
    const hours = Math.floor(diff / 3600);
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return { days, hours, minutes, seconds };
}

const ExamsCountdown: React.FC = () => {
    const [exams, setExams] = useState<any[] | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        axios.post('/getExams', { data: { userId: 'user123' } }).then(res => {
            if (res.data.success && Array.isArray(res.data.data)) {
                // 初始化倒计时字段
                const examsWithCountdown = res.data.data.map((exam: any) => ({
                    ...exam,
                    ...getCountdown(exam.date)
                }));
                setExams(examsWithCountdown);

                timer = setInterval(() => {
                    setExams(prevExams =>
                        prevExams
                            ? prevExams.map(exam => ({
                                ...exam,
                                ...getCountdown(exam.date)
                            }))
                            : prevExams
                    );
                }, 1000);
            } else {
                setExams([]); // 保证为数组，避免后续 map 报错
                console.info('失败: ' + res.data.message);
            }
        });
        return () => {
            if (timer) clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <div className="section-title">
                <h2>考试倒计时</h2>
                <p>实时掌握各考试倒计时，科学规划备考时间</p>
            </div>
            <div className="exams-container">
                {!exams ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>正在加载考试数据...</div>
                ) : exams.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>暂无考试数据</div>
                ) : (
                    exams.map(exam => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default ExamsCountdown;