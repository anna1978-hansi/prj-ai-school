import React from 'react';
import DashboardCalendar from "@/components/Home/Course/DashboardCalendar/index.jsx";
import CourseDashboard from "@/components/Home/Course/CourseDashboard/index.jsx";


const Couse = () => {
  return (
    <div className='bg-sky-50 h-screen'>
      <div className="w-[70vw] mx-auto flex flex-col gap-5">
        <DashboardCalendar />
        <CourseDashboard />
      </div>
    </div>
  );
};

export default Couse;
