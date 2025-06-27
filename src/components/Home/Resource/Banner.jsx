import React from 'react';
import { bannerSlides } from './data.jsx';

// 注意: 这个组件需要一个轮播库 (如 Swiper.js) 来实现动态滑动。
// 以下代码仅为静态结构。你需要用 useEffect 来初始化轮播库。
const Banner = () => {
    return (
        <div className="glide mb-12">
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {bannerSlides.map(slide => (
                        <li key={slide.id} className="glide__slide">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 flex items-center justify-between text-white">
                                <div className="max-w-lg">
                                    <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                                    <p className="mb-6 text-gray-100">{slide.description}</p>
                                    <button className="!rounded-button bg-white text-primary px-6 py-2 font-medium hover:bg-gray-50">
                                        立即使用
                                    </button>
                                </div>
                                <img src={slide.imageUrl} className="hidden md:block w-96 object-cover rounded-lg" alt={slide.title} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
                {bannerSlides.map((_, index) => (
                    <button key={index} className="glide__bullet" data-glide-dir={`=${index}`}></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
