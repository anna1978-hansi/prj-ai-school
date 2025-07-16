import React from 'react';
import HotListCard from './HotListCard.jsx';
import { hotCourses, hotDesigns, hotResources } from './data.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchSection = () => {
    return (
        <div className="text-center mt-8 mb-12">
            <h1 className="text-2xl font-medium mb-4">汇聚卓越资源,开启无限教学可能!</h1>
            <div>
                <div className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        className="w-full h-12 pl-12 pr-4 text-gray-700 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="搜索资源或创作者..."
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {/* Search results container can be conditionally rendered later */}
            </div>
            <div className="flex justify-center flex-wrap mt-4 gap-8">
                <HotListCard title="热门课程" items={hotCourses} />
                <HotListCard title="热门设计" items={hotDesigns} />
                <HotListCard title="热门资源" items={hotResources} />
            </div>
        </div>
    );
};

export default SearchSection;
