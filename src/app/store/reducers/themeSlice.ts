import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the theme type
type Theme = "light" | "dark";

// Define the state interface
interface ThemeState {
  theme: Theme;
}

// Initial state (default to light theme)
const initialState: ThemeState = {
  theme: "light",
};

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Toggle between light and dark
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    // Set a specific theme
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

// Export actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer;
