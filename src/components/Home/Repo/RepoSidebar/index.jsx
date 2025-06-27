import React from 'react';

const RepoSidebar = () => {
    return (
        <div className="w-[240px] bg-white border-r border-gray-200 p-4 shadow-lg">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-medium mb-2">我的仓库</div>
                    <button

                        className="px-3 py-1 text-sm text-primary hover:bg-blue-50 rounded-button whitespace-nowrap flex items-center"
                    >
                        <i className="fas fa-cog mr-1"></i>管理
                    </button>

                    {/* 管理弹窗 */}
                    <div
                        id="manageDialog"
                        className="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center"
                    >
                        <div className="bg-white rounded-lg w-[500px] p-6 h-[600px] overflow-y-scroll">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">管理收藏夹</h3>
                                <button

                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* 每一项收藏夹区域 */}
                                {[
                                    { icon: 'fa-graduation-cap', title: '课程', id: 'favoriteCourse', type: 'course' },
                                    { icon: 'fa-pencil-alt', title: '教学设计', id: 'favoriteDesign', type: 'design' },
                                    { icon: 'fa-book', title: '教学资源', id: 'favoriteResourcePack', type: 'resourcePack' },
                                ].map((section) => (
                                    <div key={section.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium flex items-center">
                                                <i className={`fas ${section.icon} mr-2 text-primary`}></i>{section.title}
                                            </h4>
                                            <button
                                                data-type={section.type}
                                                className="text-sm text-primary hover:text-primary/90 flex items-center"
                                            >
                                                <i className="fas fa-plus mr-1"></i>新建收藏夹
                                            </button>
                                        </div>
                                        <div className="space-y-2" id={section.id}></div>
                                    </div>
                                ))}
                            </div>

                            {/* 新建收藏夹弹窗 */}
                            <div className="modal-backdrop" id="modalBackdrop" style={{ display: 'none' }}>
                                <div className="bg-white/95 rounded-xl shadow-lg w-[480px] p-6 backdrop-blur-sm">
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-semibold text-primary" id="modalTitle">新建收藏夹</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-primary mb-2">名称</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    maxLength="20"
                                                    id="newFavoriteName"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700"
                                                    placeholder="请输入收藏夹名称"
                                                />
                                                <div className="absolute right-3 bottom-3 text-sm text-gray-400">
                                                    <span className="character-count">0</span>/20
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 pt-2">
                                            <button
                                                id="cancelButton"
                                                className="flex-1 px-6 py-2.5 border border-primary text-primary bg-white/90 hover:bg-blue-50 transition-all duration-200 rounded-button whitespace-nowrap hover:shadow-md"
                                            >
                                                取消
                                            </button>
                                            <button className="flex-1 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 rounded-button whitespace-nowrap hover:shadow-md">
                                                确定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 侧边栏菜单 */}
                <div className="space-y-2">
                    {[
                        { icon: 'fa-graduation-cap', label: '课程', active: true },
                        { icon: 'fa-pencil-alt', label: '教学设计' },
                        { icon: 'fa-book', label: '教学资源' },
                    ].map((item, idx) => (
                        <div key={idx} className={`relative submenu ${item.active ? 'active' : ''}`}>
                            <button
                                id="repoCourseSelector"
                                className={`w-full text-left px-4 py-2 rounded-button ${
                                    item.active ? 'bg-primary bg-opacity-10' : 'hover:bg-gray-100'
                                } text-gray-600 flex items-center justify-between submenu-btn`}
                            >
                                <div>
                                    <i className={`fas ${item.icon} mr-2`}></i>{item.label}
                                </div>
                                <i className="fas fa-chevron-down text-xs transform transition-transform"></i>
                            </button>
                            <div className="mt-1 pl-6 space-y-1 submenu-content"></div>
                        </div>
                    ))}

                    <div className="relative submenu">
                        <button
                            id="myLike"

                            className="w-full text-left px-4 py-2 rounded-button text-gray-600 hover:bg-gray-100 flex items-center justify-between submenu-btn"
                        >
                            <div>
                                <i className="fas fa-thumbs-up"></i> 我的点赞
                            </div>
                        </button>
                        <div className="mt-1 pl-6 space-y-1 submenu-content"></div>
                    </div>

                    <div className="mt-2">
                        <button

                            id="mySubmission"
                            className="w-full text-left px-4 py-2 rounded-button text-gray-600 hover:bg-gray-100 flex items-center justify-between"
                        >
                            <div>
                                <i className="fas fa-upload mr-2"></i>我的投稿
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoSidebar;
