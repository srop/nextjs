import { createContext, useContext, ReactNode, useState ,useEffect} from "react";
type DrawerContextType = {
    open: boolean;
    setOpen: (value: boolean) => void;
    toggleButton: (value: boolean) => void;
};

const drawerContextDefaultValues: DrawerContextType = {
    open: false,
    setOpen: () => {},
    toggleButton:()=>{}
};
type Props = {
    children: ReactNode;
};


const DrawerContext = createContext<DrawerContextType>(drawerContextDefaultValues);

export function useDrawerContext() {
    return useContext(DrawerContext);
}

export function DrawerContextProvider({ children }: Props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const toggleButton = () => {
        setOpen(!open);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    const value = {
        open,
        setOpen,
        toggleButton,
        handleDrawerOpen,
        handleDrawerClose
    };
    return (
        <>
            <DrawerContext.Provider value={value}>
                {children}
            </DrawerContext.Provider>
        </>
    );
}


