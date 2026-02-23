import JobCard from '@/components/JobCard';
import { setSearchedQuery } from '@/features/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Browse = () => {
    useGetAllJobs();

    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return () => {
            dispatch(setSearchedQuery(""));
        }
    },[])

    return (
        <div className='max-w-7xl mx-auto px-4 my-6 sm:my-10'>

            <h1 className='text-xl sm:text-2xl font-bold mb-6'>
                Searched Results ({allJobs?.length})
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    allJobs?.map((job) => (
                        <div
                            key={job?._id}
                            className='transform transition duration-300 hover:shadow-lg'
                        >
                            <JobCard job={job} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Browse;
