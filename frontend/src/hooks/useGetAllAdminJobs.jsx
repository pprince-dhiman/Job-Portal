import { setAllAdminJobs } from "@/features/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        const fetchAllAdminJobs = async() => {
            try{
                const res = await axios.get(`${JOB_API_ENDPOINT}/admin/get`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            }
            catch(err){
                console.log(err.response);
            }
        }
        
        fetchAllAdminJobs();
    },[]);
}

// if company owner changes useeffect shoud run [company.owner._id]

export default useGetAllAdminJobs;