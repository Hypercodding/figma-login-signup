"use client"
// Import necessary components and modules
import Navbar from '@/components/navbar';
import {UploadTask} from '../../components/uploadTask'; // Ensure the correct path to uploadTask component
import Link from 'next/link';

// Define the Layout component
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />  
      {children}
      <UploadTask /> {/* Corrected component name and capitalized */}
    </>
  );    
};

export default Layout;
