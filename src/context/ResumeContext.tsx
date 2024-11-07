import { createContext, useContext, useState } from "react";
import { Children } from "src/types/AllTypes";


const ResumeContext = createContext<any | null>(null)


export const UseResumeContext = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("UseResumeContext must be used within a ResumeContextProvider");
    }
    return context;
}


export const ResumeContextProvider = ({ children }: Children) => {
    const [resume, setResume] = useState<any | null>(null)
    return (
        <ResumeContext.Provider value={{ resume, setResume }}>
            {children}
        </ResumeContext.Provider>
    )
}