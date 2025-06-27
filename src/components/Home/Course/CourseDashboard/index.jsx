import React from 'react';
import CourseTitle from "@/components/Home/Course/CourseDashboard/CourseTitle/index.jsx";
import CourseList from "@/components/Home/Course/CourseDashboard/CourseList/index.jsx";

import {Pagination} from "@mui/material";

    const CourseDashboard = () => {
    return (
        <div>
            <CourseTitle/>
            <CourseList/>
            <Pagination count={10} disabled />
        </div>
    );
};

export default CourseDashboard;
