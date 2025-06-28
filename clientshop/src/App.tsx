import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Index from './routes/Index';

import Footer from './Components/Footer';
import CustomNavbar from './Components/Nav';

const App: React.FC = () => {
    return (
            <><BrowserRouter>
            <CustomNavbar />
            <Index/>
            <Footer/>
            </BrowserRouter>
            </>

    );
};

export default App;
