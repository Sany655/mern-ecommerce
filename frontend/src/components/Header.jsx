import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Header() {
    const { categories } = useAuth()

    return (
        <header className="bg-white shadow-md capitalize">
            <div className="container mx-auto pt-8 pb-4 flex flex-col md:flex-row justify-between items-center text-orange-500">
                <div className="flex items-center">
                    {/* <img src="logo.png" alt="Logo" className="h-10" /> */}
                    <Link to={'/'} className="text-xl font-bold">Sunnah Corner</Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="text-black w-full px-4 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring focus:ring-orange-300"
                        />
                        <i className="fa fa-search absolute right-4 top-1/2 transform -translate-y-1/2"></i>
                    </div>
                    <div className="relative hover:text-red-500">
                        <i className="fa fa-heart text-2xl"></i>
                        <span className="text-sm font-bold absolute bottom-4 left-5">0</span>
                    </div>
                    <div className="">
                        <span className="text-sm font-bold">Total</span>
                        <span className="ml-2 text-sm font-bold">৳ 0.00</span>
                    </div>
                </div>
            </div>

            <hr className='' />
            <div className="container mx-auto py-4 flex flex-wrap items-center gap-4">
                {
                    categories.map((category, index) => (
                        <NavLink key={index} className={"text-sm font-bold text-gray-400"} to={`/${category.name}`}>{category.name}</NavLink>
                    ))
                }
                <NavLink className={"text-sm font-bold text-gray-400"} to={`/admin`}>admin</NavLink>
            </div>
        </header>
    )
}

export default Header