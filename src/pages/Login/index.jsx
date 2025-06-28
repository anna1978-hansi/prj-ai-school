import React from 'react'
import Header from '../../components/Login/Header'
import Hero from '../../components/Login/Hero'
import Footer from '../../components/Login/Footer'

export default function Login() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[url('/img/login.jpg')] bg-cover bg-center" >
                <div className="bg-white p-16 rounded-lg shadow-xl max-w-lg w-full mx-4 relative min-h-[700px]">
                    <Header />
                    <Hero />
                    <Footer />
                </div>
            </div>
        </>
    )
}
