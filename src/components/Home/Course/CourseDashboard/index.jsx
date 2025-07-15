import React, { useState } from 'react';
import CourseTitle from "@/components/Home/Course/CourseDashboard/CourseTitle/index.jsx";
import CourseList from "@/components/Home/Course/CourseDashboard/CourseList/index.jsx";

const PAGE_SIZE = 3; // 每页显示课程数

const CourseDashboard = () => {
    const [page, setPage] = useState(1); // MUI Pagination页码从1开始

    // 课程数据应从CourseList导入或上层传递，这里假设CourseList支持page/pageSize props
    return (
        <div>
            <CourseTitle />
            <CourseList page={page} pageSize={PAGE_SIZE} />
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-blue-400 text-gray-700 hover:text-white transition-colors"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >上一页</button>
                <span className="px-2">第 {page} 页</span>
                <button
                    className="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-blue-400 text-gray-700 hover:text-white transition-colors"
                    onClick={() => setPage(page + 1)}
                    disabled={page === 10}
                >下一页</button>
            </div>
        </div>
    );
};

export default CourseDashboard;
