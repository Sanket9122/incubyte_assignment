import React from 'react';
import Header from './header';
import useScrollListener from '../../hooks/scroller'; 
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    const scrolled = useScrollListener(100); // 100px threshold

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            {/* Pass the scroll state to the Header */}
            <Header isScrolled={scrolled} /> 
            
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,pt: '80px' }}>
                {children}
            </Box>
            
        </Box>
    );
};

export default Layout;