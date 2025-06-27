import React from 'react';

    const CourseTitle = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">我的课程</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative flex h-10">
                        <input
                            type="text"
                            placeholder="搜索课程"
                            className="pl-4 pr-4 py-2 border border-gray-200 rounded-l-lg text-sm w-64"
                        />
                        <button className="!rounded-button rounded-l-none bg-primary text-white px-4 flex items-center justify-center border-l-0">
                            <i className="fas fa-search text-sm"></i>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <button
                                className="!rounded-button border border-gray-200 px-3 py-2 text-sm flex items-center space-x-2 whitespace-nowrap"
                            >
                                <i className="fas fa-filter text-gray-500"></i>
                                <span>筛选</span>
                            </button>
                            <div
                                id="filterDropdown"
                                className="hidden absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-20"
                            >
                                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input type="checkbox" className="mr-2" /> 进行中课程
                                    </label>
                                </div>
                                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input type="checkbox" className="mr-2" /> 已结课程
                                    </label>
                                </div>
                                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input type="checkbox" className="mr-2" /> 待开课程
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div className="relative">
                                <button
                                    className="!rounded-button border border-gray-200 px-3 py-2 text-sm flex items-center space-x-2 whitespace-nowrap"
                                >
                                    <i className="fas fa-clock text-gray-500"></i>
                                    <span>按时间排序</span>
                                    <i className="fas fa-chevron-down text-gray-400 ml-2"></i>
                                </button>
                                <div
                                    id="timeSortDropdown"
                                    className="hidden absolute left-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg p-2 z-20"
                                >
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center">
                                        <i className="fas fa-sort-amount-down text-gray-400 mr-2"></i>
                                        <span>降序</span>
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center">
                                        <i className="fas fa-sort-amount-up text-gray-400 mr-2"></i>
                                        <span>升序</span>
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    className="!rounded-button border border-gray-200 px-3 py-2 text-sm flex items-center space-x-2 whitespace-nowrap"
                                >
                                    <i className="fas fa-star text-gray-500"></i>
                                    <span>按评价排序</span>
                                    <i className="fas fa-chevron-down text-gray-400 ml-2"></i>
                                </button>
                                <div
                                    id="ratingSortDropdown"
                                    className="hidden absolute left-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg p-2 z-20"
                                >
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center">
                                        <i className="fas fa-sort-amount-down text-gray-400 mr-2"></i>
                                        <span>降序</span>
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center">
                                        <i className="fas fa-sort-amount-up text-gray-400 mr-2"></i>
                                        <span>升序</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CourseTitle;
