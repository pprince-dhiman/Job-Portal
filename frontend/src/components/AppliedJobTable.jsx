import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-150">
                <TableCaption className="text-sm">A list of your applied Jobs.</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="whitespace-nowrap">Date</TableHead>
                        <TableHead className="whitespace-nowrap">Job</TableHead>
                        <TableHead className="whitespace-nowrap">Company</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                    You haven't applied for any job yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className="hover:bg-gray-50 transition">
                                    <TableCell className="text-sm">
                                        {appliedJob?.createdAt?.split("T")?.[0]}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {appliedJob?.job?.title}
                                    </TableCell>

                                    <TableCell>
                                        {appliedJob?.job?.company?.name}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Badge
                                            className={`text-gray-500 ${appliedJob?.status === 'pending'
                                                    ? 'bg-yellow-100'
                                                    : appliedJob?.status === 'accepted'
                                                        ? 'bg-green-200'
                                                        : 'bg-red-200'
                                                }`}
                                        >
                                            {appliedJob?.status?.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;