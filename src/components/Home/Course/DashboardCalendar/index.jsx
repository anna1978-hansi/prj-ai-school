// src/components/DashboardCalendar.js

import React from 'react';
import Calendar from 'react-calendar';
// 引入 react-calendar 的默认样式，你也可以自定义
import 'react-calendar/dist/Calendar.css';
import BasicDateCalendar from "@/components/Calendar/calendar.jsx";

// 为了让默认样式更好看，我们可以创建一些自定义 CSS 来覆盖它
// 例如，在你的主 CSS 文件 (如 index.css) 中添加下面 "步骤 3" 的样式

const DashboardCalendar = () => {


    // 模拟的近期任务数据
    const recentTasks = [
        { id: 1, title: '线性代数教案设计', dueDate: '截止时间: 2025-03-19' },
        { id: 2, title: '高等数学 aip 制作', dueDate: '截止时间: 2025-03-20' },
    ];

    // 模拟的本月安排数据
    const monthSchedule = {
        courses: 0,
        pendingPlans: 0,
        completedPlans: 0,
    }

    return (
        // 使用 Flexbox 创建整体布局
        <div className="flex  p-4 md:p-8 space-x-8 rounded-lg">

            <BasicDateCalendar/>

            {/* ----------- 右侧信息栏 ----------- */}
            <div className="w-full md:w-1/3 space-y-6">
                {/* 本月安排 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">本月安排</h3>
                        <a href="#" className="text-sm text-blue-600 hover:underline">查看全部</a>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                            课程授课 {monthSchedule.courses} 次
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                            待完善备课计划 {monthSchedule.pendingPlans} 次
                        </li>
                        <li className="flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                            已完善备课计划 {monthSchedule.completedPlans} 次
                        </li>
                    </ul>
                </div>

                {/* 近期任务 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">近期任务</h3>
                        <a href="#" className="text-sm text-blue-600 hover:underline">查看全部</a>
                    </div>
                    <div className="space-y-4">
                        {recentTasks.map(task => (
                            <div key={task.id} className="bg-blue-50 p-4 rounded-lg">
                                <p className="font-semibold text-gray-800">{task.title}</p>
                                <p className="text-sm text-gray-500 mt-1">{task.dueDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCalendar;
