import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setUser } from '@/features/authSlice';
import { setSingleCompany } from '@/features/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewCompany = () => {
    const [companyName, setCompanyName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerCompany = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { companyName }, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
            setCompanyName("");
        }
        catch (err) {
            if (!err.response.data?.isTokenPresent) {
                navigate('/login');
                dispatch(setUser(null));
            }
            toast.error(err.response.data.message);
        }
    }
    return (
        <div className="max-w-4xl mx-auto px-4 my-6">

            <div className="bg-white border shadow-sm rounded-xl p-6 sm:p-8">

                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Your Company Name
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Give a name to your Company, you can CHANGE it later.
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        type="text"
                        className="w-full"
                        placeholder="JobHunt, Microsoft, etc."
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8">

                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/companies')}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={registerCompany}
                        className="w-full sm:w-auto"
                    >
                        Continue
                    </Button>

                </div>

            </div>

        </div>

    )
}

export default NewCompany;