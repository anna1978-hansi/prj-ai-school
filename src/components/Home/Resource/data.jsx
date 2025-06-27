// 热门榜单数据
export const hotCourses = [
    { id: 1, title: 'UI 设计系统入门到精通' },
    { id: 2, title: '交互设计师成长之路' },
    { id: 3, title: '产品设计方法论精讲' },
];

export const hotDesigns = [
    { id: 1, title: '企业级后台管理系统设计' },
    { id: 2, title: '电商 APP UI 设计方案' },
    { id: 3, title: '教育平台界面设计' },
];

export const hotResources = [
    { id: 1, title: 'iOS 组件库完整版' },
    { id: 2, title: 'Material Design 图标包' },
    { id: 3, title: '设计系统模板套件' },
];

// Banner 数据
export const bannerSlides = [
    {
        id: 1,
        title: 'Element+ Design System',
        description: '汇聚卓越资源,开启无限教学可能!',
        imageUrl: 'https://ai-public.mastergo.com/ai/img_res/58f7edff2d2340ea9638442cd8c0181c.jpg'
    },
    // 为轮播添加更多项
    {
        id: 2,
        title: 'Another Awesome Resource',
        description: '探索更多未知的设计领域。',
        imageUrl: 'https://ai-public.mastergo.com/ai/img_res/58f7edff2d2340ea9638442cd8c0181c.jpg'
    },
    {
        id: 3,
        title: 'Community Shared Content',
        description: '与全球设计师共同成长。',
        imageUrl: 'https://ai-public.mastergo.com/ai/img_res/58f7edff2d2340ea9638442cd8c0181c.jpg'
    }
];


// 内容卡片数据 (为简化，所有区域使用相同结构)
const generateMockData = (prefix, count) =>
    Array.from({ length: count }, (_, i) => ({
        id: `${prefix}-${i + 1}`,
        imageUrl: `https://plus.unsplash.com/premium_photo-1663089685129-de2f6c0a0c64?q=80&w=2940&auto=format&fit=crop`,
        title: `${prefix} Title ${i + 1}`,
        author: `Author ${i + 1}`,
        avatarUrl: `https://i.pravatar.cc/40?u=author${i+1}`,
        views: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 1000) + 50,
    }));

export const coursesData = generateMockData('精品课程', 6);
export const designsData = generateMockData('教学设计', 6);
export const resourcesData = generateMockData('海量资源', 6);


// 收藏夹数据
export const favoritesData = [
    { id: 'fav-1', name: 'UI/UX灵感' },
    { id: 'fav-2', name: '我的项目素材' },
    { id: 'fav-3', name: '默认收藏夹' },
    { id: 'fav-4', name: '待整理资源' },
];
