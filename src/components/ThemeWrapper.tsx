"use client";

import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        
    < div className = { theme } >
        { children }
            </div >
           
    )
}
