import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { allAdminJobs } = useSelector(store => store.job);
    const { searchJob } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const getJob = allAdminJobs?.filter((job) => {
            if (!searchJob) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJob.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJob.toLowerCase());
        })

        setFilterJobs(getJob);
    }, [searchJob, allAdminJobs]);

    return (
        <div className="overflow-x-auto">
            {
                allAdminJobs && allAdminJobs.length <= 0 ? <span>Jobs are not posted yet.</span> :
                    (
                        <Table className="min-w-full">

                            <TableCaption className="text-gray-500">
                                {' Your recent posted jobs.'}
                            </TableCaption>

                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="w-16">Company Name</TableHead>
                                    <TableHead className={'text-center'}>Role</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right pr-4">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    filterJobs?.map((job) =>
                                    (
                                        <TableRow key={job._id} className="hover:bg-gray-50 transition">

                                            <TableCell className="font-medium text-gray-800">
                                                {job?.company?.name}
                                            </TableCell>

                                            <TableCell className="font-medium text-gray-800 text-center">
                                                {job?.title}
                                            </TableCell>

                                            <TableCell className="text-gray-500">
                                                {job.createdAt.split('T')[0]}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-32 p-2">
                                                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate(`/admin/job/${company._id}`)}
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                            <span>Edit</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate(`/admin/job/${job._id}/applicants`)}>
                                                            <Eye className="w-4 h-4" />
                                                            <span>Applicants</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )}
        </div>

    )
}

export default AdminJobsTable;