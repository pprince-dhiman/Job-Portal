import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJob: "",
    allAppliedJobs: [],
    searchedQuery: "", // for heroSection page.
}

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchedJob: (state, action) => {
            state.searchJob = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchedJob,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;