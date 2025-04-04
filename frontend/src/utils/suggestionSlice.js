import { createSlice } from '@reduxjs/toolkit';

const recommendationData = createSlice({
    name: 'recommendationData',
    initialState: [], // Start with an empty array
    reducers: {
        setRecommendationData(state, action) {
            return action.payload; // Replace state with new data
        },
        addRecommendation(state, action) {
            state.push(action.payload); // Add a single recommendation
        },
        clearRecommendations() {
            return []; // Reset state to an empty array
        },
    },
});

export const { setRecommendationData, addRecommendation, clearRecommendations } = recommendationData.actions;
export default recommendationData.reducer;
