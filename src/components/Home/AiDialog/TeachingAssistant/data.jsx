// data.js

// 导航栏链接数据
export const navLinks = [
    { id: 'courses', href: '#', text: '课程' },
    { id: 'repo', href: '#', text: '个人仓库' },
    {
        id: 'tools',
        href: '#',
        text: '教学工具',
        active: true,
        dropdown: [
            { id: 'ai-assistant', href: '#', text: 'AI 教学助手' },
            { id: 'analysis', href: '#', text: '学情分析' },
            { id: 'lesson-plan', href: '#', text: '教案生成' },
        ]
    },
    { id: 'community', href: '#', text: '资源社区' },
];

// 用户信息数据
export const userProfile = {
    name: '张丽华',
    title: '副教授',
    avatar: '../img/userpicture.jpg' // 请确保路径正确
};

// 消息通知数据
export const notifications = [
    {
        id: 1,
        avatar: 'https://ai-public.mastergo.com/ai/img_res/9c78b8d5012e0874c4f7a65f31db7424.jpg',
        title: '陈思琪的项目反馈',
        content: '请查看最新的设计稿并给出修改建议',
        time: '10 分钟前',
        isRead: false
    },
    {
        id: 2,
        avatar: 'https://ai-public.mastergo.com/ai/img_res/a5b772bb25cfa145d2ed594ba505526e.jpg',
        title: '张经理的会议提醒',
        content: '下午 3 点产品评审会，请准时参加',
        time: '30 分钟前',
        isRead: false
    },
    {
        id: 3,
        avatar: 'https://ai-public.mastergo.com/ai/img_res/42156b957d95a06c9f432ff7f3278d83.jpg',
        title: '王设计师的文件共享',
        content: '新版本品牌规范文档已更新',
        time: '1 小时前',
        isRead: false
    }
];

// 对话历史数据
export const chatHistory = [
    { id: 'chat1', title: '关于“函数与导数”的教学设计' },
    { id: 'chat2', title: '如何分析学生期中考试成绩' },
    { id: 'chat3', title: '生成“三角函数”的课堂练习题' },
];

// 教学设计表单默认数据
export const teachingDesignData = {
    theme: 'AI学情分析',
    objectives: '1. 理解学情分析的基本概念。\n2. 掌握使用AI工具进行数据分析的方法。',
    content: '学情分析的重要性、数据收集与整理、AI分析工具介绍、案例实操。',
    keyPoints: 'AI工具的实际操作与数据解读。',
    expectedOutcomes: '学生能够独立完成一次简单的学情分析报告。',
    classHours: '6',
    activities: '课堂讲授 - 2课时\n小组讨论 - 1课时\n上机实操 - 2课时\n成果汇报 - 1课时',
    exercises: '请根据提供的虚拟成绩单，撰写一份学情分析简报。',
    aiResources: '推荐资源：Coursera《教育数据挖掘入门》',
    localResources: [
        { id: 'res1', name: '案例生成绩单.xlsx' },
        { id: 'res2', name: '分析报告模板.docx' },
    ]
};
