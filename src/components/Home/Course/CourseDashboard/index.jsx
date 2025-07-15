import React, { useState } from 'react';
import CourseTitle from "@/components/Home/Course/CourseDashboard/CourseTitle/index.jsx";
import CourseList from "@/components/Home/Course/CourseDashboard/CourseList/index.jsx";
import { Pagination } from "@mui/material";

const PAGE_SIZE = 3; // 每页显示课程数

const CourseDashboard = () => {
    const [page, setPage] = useState(1); // MUI Pagination页码从1开始

    // 课程数据应从CourseList导入或上层传递，这里假设CourseList支持page/pageSize props
    return (
        <div>
            <CourseTitle />
            <CourseList page={page} pageSize={PAGE_SIZE} />
            <div className="flex justify-center mt-4">
                <Pagination
                    count={10} // 这里建议动态计算总页数
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default CourseDashboard;
