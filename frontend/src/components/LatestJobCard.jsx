import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({job}) => {
    const navigate = useNavigate();

    return (
        <div onClick={()=>navigate(`/job/description/${job._id}`)} className='flex flex-col justify-between gap-4 border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white '>
            <div>
                <h1 className='font-semibold text-base sm:text-lg'>{job?.company?.name}</h1>
                <p className='text-xs sm:text-sm text-gray-500'>{job?.company?.location}</p>
            </div>

            <div>
                <h1 className='font-bold text-lg sm:text-xl my-1'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-2'>
                <Badge className="text-green-700 font-semibold text-xs sm:text-sm" variant='ghost'>{job?.position}</Badge>
                <Badge className="text-[#F83002] font-semibold text-xs sm:text-sm" variant='ghost'>{job?.jobType}</Badge>
                <Badge className="text-[#6A38C2] font-semibold text-xs sm:text-sm" variant='ghost'>{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCard