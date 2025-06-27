import React from 'react'
import {Outlet} from "react-router-dom";
import Navigation from "@/components/Home/Navigation/index.jsx";

export default function Home() {
    return (
        <div >
            <Navigation />
            <Outlet/>
        </div>
    )
}
