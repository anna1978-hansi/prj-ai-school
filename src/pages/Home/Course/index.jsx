import React from 'react';
import DashboardCalendar from "@/components/Home/Course/DashboardCalendar/index.jsx";
import CourseDashboard from "@/components/Home/Course/CourseDashboard/index.jsx";


const Couse = () => {
  return (
    <div className='bg-sky-50 min-h-screen'>
      <div className="w-full sm:w-[95vw] xl:w-[75vw] mx-auto flex flex-col gap-5 justify-center px-2 sm:px-0 overflow-x-hidden">

        <DashboardCalendar />
        <div className='ml-15'>
          <CourseDashboard />
        </div>
      </div>
    </div>
  );
};

export default Couse;
