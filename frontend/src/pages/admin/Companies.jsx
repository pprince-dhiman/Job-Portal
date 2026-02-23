import CompaniesTable from '@/components/admin/CompaniesTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setSearchCompany } from '@/features/companySlice';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        // using this value in companies table to search company accordingly.
        dispatch(setSearchCompany(input));
    },[input]);

    return (
        <div className="max-w-6xl mx-auto my-6 px-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <Input
                    className="w-full sm:w-64"
                    placeholder="Filter by name"
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
                />

                <Button
                    onClick={() => navigate('/admin/companies/create')}
                    className="cursor-pointer w-full sm:w-auto"
                >
                    New Company
                </Button>

            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <CompaniesTable />
            </div>

        </div>

    );
}

export default Companies