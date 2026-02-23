import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

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
                    allJobs?.length <= 0 ?
                        < motion.span
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className='text-2xl text-gray-600 m-auto'>Loading...</motion.span> :
                        allJobs?.slice(0, 6).map((job) => (
                            <motion.div key={job?._id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }} >

                                <LatestJobCard job={job} />
                            </motion.div>
                        ))
                }
            </div>
        </div>
    );
}

export default LatestJobs;