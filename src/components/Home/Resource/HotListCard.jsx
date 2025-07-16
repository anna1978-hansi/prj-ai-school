import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
const HotListCard = ({ title, items, icon }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm w-80">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium flex items-center gap-2">
                    <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">{title}</span>
                    <FontAwesomeIcon icon={faFire} className="text-orange-500 text-sm" />
                </h3>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <a key={item.id} href="#" className="flex items-center gap-3 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                        <span className={index === 0 ? 'text-primary font-medium' : 'text-gray-400 font-medium'}>
                            {index + 1}
                        </span>
                        <span className="flex-1 text-sm truncate">{item.title}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default HotListCard;
