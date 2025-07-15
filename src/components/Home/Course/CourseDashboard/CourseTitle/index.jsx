import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faChevronDown, faClock, faStar, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
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
                            <FontAwesomeIcon icon={faSearch} className="text-base" />
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
                            <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2" />
                            筛选
                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 ml-2 text-xs" />
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
                            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-2" />
                            按时间排序
                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 ml-2 text-xs" />
                        </button>

                        {openDropdown === "time" && (
                            <div className="absolute left-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <FontAwesomeIcon icon={faArrowDown} className="text-gray-400 mr-2" />
                                    降序
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <FontAwesomeIcon icon={faArrowUp} className="text-gray-400 mr-2" />
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
                            <FontAwesomeIcon icon={faStar} className="text-gray-500 mr-2" />
                            按评价排序
                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 ml-2 text-xs" />


                        </button>

                        {openDropdown === "rating" && (
                            <div className="absolute left-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <FontAwesomeIcon icon={faArrowDown} className="text-gray-400 mr-2" />
                                    降序
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                    <FontAwesomeIcon icon={faArrowUp} className="text-gray-400 mr-2" />
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
