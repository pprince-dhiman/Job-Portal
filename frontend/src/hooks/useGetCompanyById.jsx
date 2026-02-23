import { setSingleCompany } from "@/features/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant"
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!companyId) return;

        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            }
            catch (err) {
                console.log(err.response);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch]);
}

export default useGetCompanyById;