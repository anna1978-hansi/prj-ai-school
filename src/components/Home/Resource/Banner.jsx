import React from 'react';
import { Helmet } from 'react-helmet-async';
import { bannerSlides } from './data.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 注意: 这个组件需要一个轮播库 (如 Swiper.js) 来实现动态滑动。
// 以下代码仅为静态结构。你需要用 useEffect 来初始化轮播库。
const Banner = () => {
    return (
        <div className="mb-12">
            <Helmet>
                <link
                    rel="preload"
                    as="image"
                    href={bannerSlides[0].imageUrl}
                />
            </Helmet>
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="rounded-xl"
            >
                {bannerSlides.map(slide => (
                    <SwiperSlide key={slide.id}>
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
