import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CompanySetup = () => {
    const params = useParams();
    const companyId = params.id;
    useGetCompanyById(companyId); // custum hook to get already filled data in form
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const company = useSelector(store => store.company.singleCompany);

    const inputEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const inputFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.patch(`${COMPANY_API_ENDPOINT}/update/${companyId}`, formData, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: company?.name || "",
            description: company?.description || "",
            website: company?.website || "",
            location: company?.location || "",
        });
    }, [company]);

    return (
        <div className="max-w-4xl mx-auto my-6 px-4">
            <form onSubmit={formSubmitHandler} className="bg-white shadow-md rounded-xl border">

                <div className="flex items-center gap-4 p-5 border-b bg-gray-50 rounded-t-xl">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/companies')}
                        className="flex items-center gap-2 text-gray-600 font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>

                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Company Setup
                    </h1>
                </div>

                <div className="p-5 space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="space-y-1">
                            <Label className="text-sm text-gray-600">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={inputEventHandler}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-sm text-gray-600">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={inputEventHandler}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-sm text-gray-600">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={inputEventHandler}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-sm text-gray-600">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={inputEventHandler}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                            <Label className="text-sm text-gray-600">Logo</Label>
                            <Input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={inputFileHandler}
                                className="w-full cursor-pointer"
                            />
                        </div>

                    </div>

                    <div className="pt-2">
                        {
                            isLoading
                                ? <Button className="w-full py-2 flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Please Wait
                                </Button>
                                : <Button
                                    type="submit"
                                    className="w-full py-2"
                                    disabled={isLoading}
                                >
                                    Update
                                </Button>
                        }
                    </div>

                </div>
            </form>
        </div>

    )
}


export default CompanySetup