import CourseCard from "@/components/Home/Course/CourseDashboard/CourseCard/index.jsx";

const courses = [
    {
        image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80',
        title: '高等数学',
        description: '培养学生的数学思维能力和解决问题的能力',
        students: 48,
        rating: 4.8,
        status: '进行中',
        access: '公开'
    },
    {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '概率论与数理统计',
        description: '探索概率规律，理解概率问题',
        students: 42,
        rating: 4.6,
        status: '进行中',
        access: '公开'
    },
    {
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '线性代数',
        description: '掌握线性代数基础知识，培养逻辑能力',
        students: 45,
        rating: 4.7,
        status: '进行中',
        access: '公开'
    }
];

const CourseList = ({ page = 1, pageSize = 3 }) => {
    // 计算当前页要显示的课程
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pagedCourses = courses.slice(start, end);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {pagedCourses.map((course, index) => (
                <CourseCard key={index + start} {...course} />
            ))}
        </div>
    );
};

export default CourseList;