import Filter from '@/components/Filter'
import JobCard from '@/components/JobCard'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    useGetAllJobs();
    let jobs = useSelector(store => store.job.allJobs);

    const [selectedFilter, setSelectedFilter] = useState({
        location: "",
        industry: "",
        salary: ""
    });

    const salaryMatch = (jobSalary, selectedSalary) => {
        if (selectedSalary === "0-5LPA") return jobSalary <= 5;
        if (selectedSalary === "5-10LPA") return jobSalary > 5 && jobSalary <= 10;
        if (selectedSalary === "10-50LPA") return jobSalary > 10;
        // nothing was selected
        return true;
    }

    const filteredJobs = jobs.filter((job) => {
        return ((!selectedFilter.location || job.company.location === selectedFilter.location) &&
            (!selectedFilter.industry || job.title === selectedFilter.industry) &&
            (!selectedFilter.salary || salaryMatch(job.salary, selectedFilter.salary)))
    });

    return (
        <div className='max-w-7xl mx-auto mt-5' >
            <div className='flex gap-5'>
                {/* Filter page */}
                <div className='w-[18%]'>
                    <Filter setSelectedFilter={setSelectedFilter} />
                </div>

                {/* Job Cards */}
                {
                    filteredJobs.length <= 0 ?
                        <span className='text-5xl text-gray-600 m-auto'>Job not found</span> :
                        (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        filteredJobs.map((job) => (
                                            <motion.div initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }} 
                                                key={job._id}>
                                                <JobCard job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>

                            </div>

                        )
                }
            </div>
        </div>
    )
}

export default Jobs