"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { toggleTheme } from "../app/store/reducers/themeSlice";

export default function ThemeToggle() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`
 relative flex items-center
 px-3 py-1.5
 bg-gray-200 dark:bg-gray-800
 text-gray-800 dark:text-gray-200
 rounded-full
 border border-gray-300 dark:border-gray-700
 hover:bg-gray-300 dark:hover:bg-gray-700
 focus:outline-none focus:ring-2 focus:ring-offset-2 
 focus:ring-purple-500 dark:focus:ring-purple-400
 transition-all duration-300 ease-in-out
 group
 `}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Icon Container */}
      <span className="flex items-center justify-center w-5 h-5 mr-2">
        {/* Sun Icon (visible in light mode) */}
        <svg
          className={`
 w-4 h-4 
 text-yellow-500 dark:text-gray-500
 transition-all duration-300
 ${isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"}
 absolute
 `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 publisherId-.707l-.707.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        {/* Moon Icon (visible in dark mode) */}
        <svg
          className={`
 w-4 h-4 
 text-gray-500 dark:text-yellow-400
 transition-all duration-300
 ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}
 absolute
 `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>

      {/* Text */}
      <span className="text-sm font-medium transition-opacity duration-300 group-hover:opacity-90">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
