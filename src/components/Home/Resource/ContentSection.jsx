import React, { useState, useRef, useEffect } from 'react';
import ResourceCard from './ResourceCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CARD_GAP = 24; // gap-6 = 1.5rem = 24px

function getMinCardWidth() {
    const w = window.innerWidth;
    if (w < 640) return 200;
    if (w < 1200) return 320;
    return 400;
}

const ContentSection = ({ title, items, lazy = true }) => {
    const [page, setPage] = useState(0);
    const [cardsPerRow, setCardsPerRow] = useState(1);
    const [minCardWidth, setMinCardWidth] = useState(getMinCardWidth());
    const containerRef = useRef(null);

    // 动态计算每行可容纳的卡片数和minCardWidth
    useEffect(() => {
        function updateLayout() {
            const minWidth = getMinCardWidth();
            setMinCardWidth(minWidth);
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const n = Math.max(1, Math.floor((width + CARD_GAP) / (minWidth + CARD_GAP)));
                setCardsPerRow(n);
            }
        }
        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    // 分页逻辑：每页只显示一行
    const totalPages = Math.ceil(items.length / cardsPerRow);
    const pagedItems = items.slice(page * cardsPerRow, page * cardsPerRow + cardsPerRow);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };
    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    // 翻页时如果当前页超出最大页，自动回到最后一页
    useEffect(() => {
        if (page > totalPages - 1) setPage(Math.max(0, totalPages - 1));
    }, [cardsPerRow, totalPages, page]);

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
            <div ref={containerRef} className="grid gap-6" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))` }}>
                {pagedItems.map(item => (
                    <ResourceCard key={item.id} {...item} lazy={lazy} />
                ))}
            </div>
        </div>
    );
};

export default ContentSection;
