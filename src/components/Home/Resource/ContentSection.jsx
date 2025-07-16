import React, { useState } from 'react';
import ResourceCard from './ResourceCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const ContentSection = ({ title, items, lazy = true }) => {
    // 新增分页逻辑
    const [page, setPage] = useState(0);
    const pageSize = 3;
    const totalPages = Math.ceil(items.length / pageSize);
    const pagedItems = items.slice(page * pageSize, page * pageSize + pageSize);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };
    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">{title}</h2>
                <div className="flex space-x-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors disabled:opacity-40"
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors disabled:opacity-40"
                        onClick={handleNext}
                        disabled={page === totalPages - 1}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagedItems.map(item => (
                    <ResourceCard key={item.id} {...item} lazy={lazy} />
                ))}
            </div>
        </div>
    );
};

export default ContentSection;
