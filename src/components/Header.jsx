"use client"

import React, { useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import Link from "next/link";
import HeaderCart from "./HeaderCart";
import HeaderWishList from "./HeaderWishList";
import useAccountsStore from "@/store/useAccountsStore";
import { HiMenu, HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi";
import { LuLogIn } from "react-icons/lu";

const Header = () => {
   const { users } = useAccountsStore();
   const [ menu, setMenu ] = useState(false)

   const showMenu = () => {
      setMenu(!menu);
      console.log("show menu");
   }
   return (
      <header className="fixed w-full h-12 bg-gray-50 z-50">
         <div onClick={showMenu} className={`${menu?'block':'hidden'} w-screen h-screen absolute`}></div>
         <Container className={`flex justify-between items-center py-2`}>
            <Link href={"/"}>
               <Image
                  src="/assets/Logo.png"
                  alt="logo"
                  width={38}
                  height={32}
                  priority
               />
            </Link>
            <div className="hidden md:flex gap-3">
               <Link className="text-gray-600 hover:underline active:text-cyan-500" href={"/"}>Home</Link>
               <Link className="text-gray-600 hover:underline active:text-cyan-500" href={"/products"}>Products</Link>
               <Link className="text-gray-600 hover:underline active:text-cyan-500" href={"/about"}>About</Link>
               <Link className="text-gray-600 hover:underline active:text-cyan-500" href={"/faq"}>FAQ</Link>
               <Link className="text-gray-600 hover:underline active:text-cyan-500" href={"/contact"}>Contact</Link>
            </div>
            <div className="flex items-center gap-2">
               <Link href={"/wishlist"} className="relative inline-block text-gray-600 hover:text-gray-950 active:text-cyan-500">
                  <HiOutlineHeart className="size-5" />
                  <HeaderWishList />
               </Link>
               <Link href={"/cart"} className="relative inline-block text-gray-600 hover:text-gray-950 active:text-cyan-500">
                  <HiOutlineShoppingBag className="size-5" />
                  <HeaderCart />
               </Link>
               <Link href={`${users.length==0?'/register':'/account'}`} className="relative inline-block text-gray-600 hover:text-gray-950 active:text-cyan-500">
                  {users.length==0?(<LuLogIn className="size-5" />):(<BsPersonFill className="size-5" />)}
               </Link>
               <div onClick={showMenu} className="relative inline-block md:hidden">
                  <HiMenu className="size-5" />
                  <div className={`${menu?'flex':'hidden'} absolute right-0 flex-col bg-gray-300 p-1 rounded-md`}>
                     <Link className="text-gray-600 hover:underline active:text-cyan-500 px-5 py-1" href={"/"}>Home</Link>
                     <Link className="text-gray-600 hover:underline active:text-cyan-500 px-5 py-1" href={"/products"}>Products</Link>
                     <Link className="text-gray-600 hover:underline active:text-cyan-500 px-5 py-1" href={"/about"}>About</Link>
                     <Link className="text-gray-600 hover:underline active:text-cyan-500 px-5 py-1" href={"/faq"}>FAQ</Link>
                     <Link className="text-gray-600 hover:underline active:text-cyan-500 px-5 py-1" href={"/contact"}>Contact</Link>
                  </div>
               </div>
            </div>
         </Container>
      </header>
   );
};

export default Header;
