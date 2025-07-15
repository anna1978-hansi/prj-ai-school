import React, { Suspense, lazy } from 'react';
const Header = lazy(() => import('../../components/Login/Header'));
const Hero = lazy(() => import('../../components/Login/Hero'));
const Footer = lazy(() => import('../../components/Login/Footer'));

export default function Login() {
    return (
        <Suspense fallback={<div>加载中...</div>}>
            <div className="min-h-screen flex items-center justify-center bg-[url('/img/login.jpg')] bg-cover bg-center" >
                <div className="bg-white p-16 rounded-lg shadow-xl max-w-lg w-full mx-4 relative min-h-[700px]">
                    <Header />
                    <Hero />
                    <Footer />
                </div>
            </div>
        </Suspense>
    );
}
