import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const LayoutContext = createContext();

const LayoutContextProvider = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isSearchPage = location.pathname === '/search';

    useEffect(() => {
        if (!isHomePage && !isSearchPage) {
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, [isHomePage])

    const toggleSidebar = () => setShowSidebar(prev => !prev);

    return (
        <LayoutContext.Provider value={{showSidebar, toggleSidebar, isHomePage, isSearchPage}}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutContextProvider;