import AdminJobsTable from '@/components/admin/AdminJobsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setSearchedJob } from '@/features/jobSlice';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobs = () => {
    useGetAllAdminJobs(); // custom hook
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [input, setInput] = useState("");

    useEffect(() => {
        // using this value in companies table to search company accordingly.
        dispatch(setSearchedJob(input));
    }, [input]);

    return (
        <div className="max-w-6xl mx-auto my-6 px-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <Input
                    className="w-full sm:w-64"
                    placeholder="search company or job role"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <Button
                    onClick={() => navigate('/admin/job/create')}
                    className="cursor-pointer w-full sm:w-auto"
                >
                    New Job
                </Button>

            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <AdminJobsTable />
            </div>

        </div>

    );
}

export default AdminJobs;