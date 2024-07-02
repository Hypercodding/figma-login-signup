"use client"
import Navbar from '@/components/navbar';
import Link from 'next/link';

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
        <>
          <Navbar/>  
          {children}
        </>
    )    
};

export default Layout;
