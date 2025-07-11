import React from 'react';
import DashboardCalendar from "@/components/Home/Course/DashboardCalendar/index.jsx";
import CourseDashboard from "@/components/Home/Course/CourseDashboard/index.jsx";


const Couse = () => {
  return (
    <div className='bg-sky-50 h-full'>
      <div className="w-[60vw] mx-auto flex flex-col gap-5 justify-center ">
        <DashboardCalendar />
        <div className='ml-15'>
          <CourseDashboard />
        </div>
      </div>
    </div>
  );
};

export default Couse;
