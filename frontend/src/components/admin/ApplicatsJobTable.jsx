import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import toast from 'react-hot-toast';

const ApplicatsJobTable = () => {
    const shortListingStatus = ["Accepted", "Rejected"];
    const allApplications = useSelector(state => state.application.applicants);

    const statusHandler = async (status, applicationId) => {
        try {
            const res = await axios.patch(`${APPLICATION_API_ENDPOINT}/${applicationId}/status/update`, { status }, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>Recent applied applicants.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        allApplications && allApplications.map((application) => (

                            <TableRow key={application?._id}>
                                <TableCell>{application?.applicant?.fullname}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        application?.applicant?.profile?.resume ? (
                                            <a
                                                href={application?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                Resume
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )
                                    }
                                </TableCell>
                                <TableCell>{application?.createdAt?.split("T")?.[0]}</TableCell>
                                <TableCell className='float-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortListingStatus.map((status, idx) => (
                                                    <div key={idx} onClick={() => statusHandler(status, application._id)}
                                                        className='w-fit flex items-center my-2 cursor-pointer'>
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicatsJobTable;