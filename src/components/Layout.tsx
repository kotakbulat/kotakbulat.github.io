import React, { ReactNode } from 'react';
// Import Navbar and Footer components later when you create them
// import Navbar from './Navbar';
// import Footer from './Footer';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white"> {/* Example background */}
    {/* <Navbar /> */}
    <main className="flex-grow">{children}</main>
    {/* <Footer /> */}
    </div>
);
};

export default Layout;