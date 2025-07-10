// src/Layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Nav';
import Footer from '../Components/Footer';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
