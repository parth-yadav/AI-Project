"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { toggleTheme } from "../app/store/reducers/themeSlice";

export default function ThemeToggle() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
