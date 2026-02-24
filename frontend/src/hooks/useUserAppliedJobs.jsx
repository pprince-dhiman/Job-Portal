import { setAllAppliedJobs } from "@/features/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// fetches all jobs on which user was applied.
const useUserAppliedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchUserAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true });
                if (res?.data?.success) {
                    dispatch(setAllAppliedJobs(res.data.allApplications));
                }
            } catch(err){
                toast(err.response.data.message);
            }          
        }

        fetchUserAppliedJobs();
    }, [user]);
}

export default useUserAppliedJobs;