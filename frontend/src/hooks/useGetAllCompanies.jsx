import { setCompanies } from '@/features/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
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
                console.log(err.response.data);
            }
        }
        fetchAllCompanies();
    }, []);
}

export default useGetAllCompanies