import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice"; 
// Import your slices here (e.g., userSlice, authSlice)
import exampleSlice from "./exampleSlice"; // We'll create this next

const rootReducer = combineReducers({
    example: exampleSlice, // Add your slices here
    theme: themeSlice, 
    
  // e.g., auth: authSlice,
});

export default rootReducer;
