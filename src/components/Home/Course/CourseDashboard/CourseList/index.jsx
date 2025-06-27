import CourseCard from "@/components/Home/Course/CourseDashboard/CourseCard/index.jsx";

const courses = [
    {
        image: '/images/math.jpg',
        title: '高等数学',
        description: '培养学生的数学思维能力和解决问题的能力',
        students: 48,
        rating: 4.8,
        status: '进行中',
        access: '公开'
    },
    {
        image: '/images/statistics.jpg',
        title: '概率论与数理统计',
        description: '探索概率规律，理解概率问题',
        students: 42,
        rating: 4.6,
        status: '进行中',
        access: '公开'
    },
    {
        image: '/images/algebra.jpg',
        title: '线性代数',
        description: '掌握线性代数基础知识，培养逻辑能力',
        students: 45,
        rating: 4.7,
        status: '进行中',
        access: '公开'
    }
];

const CourseList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
            ))}
        </div>
    );
};

export default CourseList;
