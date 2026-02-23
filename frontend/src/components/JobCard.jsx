import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const daysAgo = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currDate = new Date();
        const diff = currDate - createdDate;
        return Math.floor(diff / (24 * 60 * 60 * 1000));
    }

    const postDay = daysAgo(job?.createdAt);

    return (
        <div key={job?._id} className='p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-200 flex flex-col justify-between'>

            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{postDay === 0 ? "Today" : `${postDay} days ago`}</p>
                <Button
                    variant='outline'
                    className='rounded-full hover:bg-[#6A38C2] hover:text-white transition'
                    size='icon'
                >
                    <Bookmark className='w-4 h-4' />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-3'>
                <Button
                    className='p-5 rounded-xl hover:bg-gray-100 transition'
                    variant='outline'
                    size='icon'
                >
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>

                <div>
                    <h1 className='font-semibold text-base sm:text-lg'>{job?.company?.name}</h1>
                    <p className='text-xs sm:text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg sm:text-xl my-1'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-3'>
                <Badge className="text-green-700 font-semibold text-xs sm:text-sm" variant='ghost'>{job?.position}</Badge>
                <Badge className="text-[#F83002] font-semibold text-xs sm:text-sm" variant='ghost'>{job?.jobType}</Badge>
                <Badge className="text-[#6A38C2] font-semibold text-xs sm:text-sm" variant='ghost'>{job?.salary}LPA</Badge>
            </div>

            <div className='flex items-center gap-3 mt-4 flex-wrap'>
                <Button
                    onClick={() => navigate(`/job/description/${job._id}`)}
                    variant='outline'
                    className='hover:border-[#6A38C2] hover:text-[#6A38C2] transition'
                >
                    Details
                </Button>
                <Button
                    className='bg-[#6A38C2] hover:bg-[#F83002] transition'
                >
                    Save for later
                </Button>
            </div>

        </div>

    )
}

export default JobCard