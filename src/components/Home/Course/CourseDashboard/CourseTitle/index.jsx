import React, { useState, useRef, useEffect } from 'react';

const CourseTitle = () => {
    const [openDropdown, setOpenDropdown] = useState(null); // 'filter' | 'time' | 'rating' | null

    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="mb-8" ref={wrapperRef}>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">我的课程</h1>

                <div className="flex items-center gap-3">
                    {/* 搜索栏 */}
                    <div className="flex rounded-lg overflow-hidden border border-gray-300">
                        <input
                            type="text"
                            placeholder="搜索课程"
                            className="px-4 py-2 w-64 text-sm focus:outline-none"
                        />
                        <button className="bg-blue-600 text-white px-4 flex items-center justify-center hover:bg-blue-700 transition">
                            <i className="fas fa-search text-base"></i>
                        </button>
                    </div>

                    {/* 筛选 */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "filter" ? null : "filter")
                            }
                            className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition"
                        >
                            <i className="fas fa-filter text-gray-500 mr-2"></i>
                            筛选
                            <i className="fas fa-chevron-down text-gray-400 ml-2 text-xs"></i>
                        </button>

                        {openDropdown === "filter" && (
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                                {["进行中课程", "已结课程", "待开课程"].map((label) => (
                                    <div
                                        key={label}
                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <label className="flex items-center text-sm text-gray-700">
                                            <input type="checkbox" className="mr-2" />
                                            {label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 按时间排序 */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "time" ? null : "time")
                            }
                            className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition"
                        >
                            <i className="fas fa-clock text-gray-500 mr-2"></i>
                            按时间排序
                            <i className="fas fa-chevron-down text-gray-400 ml-2 text-xs"></i>
                        </button>

                        {openDropdown === "time" && (
                            <div className="absolute left-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <i className="fas fa-arrow-down text-gray-400 mr-2"></i>
                                    降序
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <i className="fas fa-arrow-up text-gray-400 mr-2"></i>
                                    升序
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 按评价排序 */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "rating" ? null : "rating")
                            }
                            className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition"
                        >
                            <i className="fas fa-star text-gray-500 mr-2"></i>
                            按评价排序
                            <i className="fas fa-chevron-down text-gray-400 ml-2 text-xs"></i>
                        </button>

                        {openDropdown === "rating" && (
                            <div className="absolute left-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <i className="fas fa-arrow-down text-gray-400 mr-2"></i>
                                    降序
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <i className="fas fa-arrow-up text-gray-400 mr-2"></i>
                                    升序
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseTitle;
