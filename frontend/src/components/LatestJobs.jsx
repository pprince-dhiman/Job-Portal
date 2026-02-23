import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const LatestJobs = () => {
    useGetAllJobs();
    const allJobs = useSelector(store => store.job.allJobs);

    return (
        <div className='max-w-7xl mx-auto my-16 px-4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center sm:text-left'>
                <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs?.length <= 0 ? <span>Refresh the page</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCard key={job?._id} job={job}/>)
                }
            </div>
        </div>
    );
}

export default LatestJobs