import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
    const navigate = useNavigate();
    const companies = useSelector(store => store.company.companies);
    const [filterCompanies, setFilterCompanies] = useState(companies);
    const searchedCompany = useSelector(store => store.company.searchCompany);

    useEffect(()=>{
        const getCompany = companies.filter((company) => {
            if(!searchedCompany){
                return true;
            }
            return company?.name?.toLowerCase().includes(searchedCompany.toLowerCase());
        })
        setFilterCompanies(getCompany);
    }, [searchedCompany, companies]);
    
    return (
        <div className="overflow-x-auto">
            {
                companies && companies.length <= 0 ? <span>Companies are not Registered yet.</span> :
                    (
                        <Table className="min-w-full">

                            <TableCaption className="text-gray-500">
                                Your recent registered companies.
                            </TableCaption>

                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="w-16">Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right pr-4">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    filterCompanies?.map((company) => 
                                    (
                                        <TableRow key={company._id} className="hover:bg-gray-50 transition">

                                            <TableCell>
                                                <Avatar className="h-10 w-10 border">
                                                    <AvatarImage src={company.logo} />
                                                </Avatar>
                                            </TableCell>

                                            <TableCell className="font-medium text-gray-800">
                                                {company.name}
                                            </TableCell>

                                            <TableCell className="text-gray-500">
                                                {company.createdAt.split('T')[0]}
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-32 p-2">
                                                        <div
                                                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                            <span>Edit</span>
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

export default CompaniesTable