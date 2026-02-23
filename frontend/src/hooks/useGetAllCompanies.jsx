import { setCompanies } from '@/features/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAllCompanies = async() => {
            try{
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies))
                }
            }
            catch(err){
                toast.error(err.response.data.message);
            }
        }
        fetchAllCompanies();
    }, []);
}

export default useGetAllCompanies