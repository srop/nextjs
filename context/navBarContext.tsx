import { createContext, useContext, ReactNode, useState } from "react";

type authContextType = {
    user: boolean;
    login: () => void;
    logout: () => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    toggleButton: (value: boolean) => void;
    handleDrawerOpen: (value: boolean) => void;
    handleDrawerClose: (value: boolean) => void;
};

const authContextDefaultValues: authContextType = {
    user: false,
    login: () => {},
    logout: () => {},
    open: false,
    setOpen: () => {},
    toggleButton:()=>{},
    handleDrawerOpen: () => {},
    handleDrawerClose:()=>{}
};

const NavbarContext = createContext<authContextType>(authContextDefaultValues);

export function useNavbar() {
    return useContext(NavbarContext);
}

type Props = {
    children: ReactNode;
};

export function NavbarProvider({ children }: Props) {
    const [user, setUser] = useState(false);
    const [open, setOpen] = useState(false);
    const toggleButton = () => {
        setOpen(!open);
    };

    const login = () => {
        setUser(true);
    };

    const logout = () => {
        setUser(false);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    const value = {
        user,
        login,
        logout,
        open,
        setOpen,
        toggleButton,
        handleDrawerOpen,
        handleDrawerClose
    };

    return (
        <>
            <NavbarContext.Provider value={value}>
                {children}
            </NavbarContext.Provider>
        </>
    );
}