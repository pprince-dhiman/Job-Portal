import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/features/jobSlice';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const JobDescription = () => {
    const dispatch = useDispatch();
    const job = useSelector(store => store.job.singleJob);
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const params = useParams();
    const jobId = params.id;

    // DB check for user applied or not
    const isApplied = job?.applications?.some(application => application?.applicant?._id === user?._id) || false;

    // for locally (instant disable apply btn after apply.)
    const [hasAlreadyApplied, setHasAlreadyApplied] = useState(isApplied);
    useEffect(() => {
        setHasAlreadyApplied(isApplied);
    }, [isApplied]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, null, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message);
                setHasAlreadyApplied(true); // update local state

                // adding new applicant locally for temporary, to update the state instantly.
                const updatedJob = { ...job, applications: [...job.applications, { applicant: { _id: user?._id } }] };
                dispatch(setSingleJob(updatedJob)); // helps in real time UI change
            }
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (err) {
                toast.error(err.response.data.message);
            }
        }
        fetchJob();
    }, [jobId, dispatch]);

    // user not authenticated...
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

                <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8 text-center border">
                    <div className="text-5xl mb-4">🔒</div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Unlock Job Details
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Sign in to view full job description, salary insights, and apply instantly.
                    </p>
                    <div className="flex gap-4 justify-center ">
                        <Button className="px-6 py-2 hover:bg-[#F83002]" onClick={() => navigate('/login')}>
                            Login
                        </Button>

                        <Button variant="outline" className="px-6 py-2" onClick={() => navigate('/signup')}>
                            Sign Up
                        </Button>
                    </div>

                </div>
            </div>
        );
    }

    return user && (
        <div className='bg-gray-50 min-h-screen py-10'>
            <div className='max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8'>

                {/* Top Section */}
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6'>

                    {/* Left */}
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800'>
                            {job?.title}
                            <span className='text-2xl font-bold text-gray-800'>{job?.company?.name ? `, ${job?.company?.name}` : ""}</span>
                        </h1>

                        <p className='text-gray-500 mt-1'>{job?.location}</p>

                        <div className='flex flex-wrap gap-3 mt-4'>
                            <Badge className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full">{`${job?.position} opening`}</Badge>
                            <Badge className="bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full">{job?.jobType}</Badge>
                            <Badge className="bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-full">{`${job?.salary} LPA`}</Badge>
                            <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full">{`${job?.experienceLevel}+ Years Exp`}</Badge>
                        </div>
                    </div>

                    {/* Right */}
                    <Button
                        disabled={hasAlreadyApplied} onClick={hasAlreadyApplied ? null : applyJobHandler}
                        className={`h-12 px-8 text-base rounded-xl transition-all duration-300
                        ${hasAlreadyApplied
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#6A38C2] hover:bg-[#5b30aa] shadow-md hover:shadow-lg'
                            }`}
                    >
                        {hasAlreadyApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>

                </div>

                {/* Job Description */}
                <div className='mt-8'>

                    <h2 className='text-lg font-semibold text-gray-800 mb-4'>
                        {job?.title}
                    </h2>

                    <p className='text-gray-600 leading-relaxed'>{job?.description}</p>

                </div>

                {/* Job Details Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8'>

                    <div className='bg-gray-50 p-4 rounded-xl border'>
                        <p className='text-sm text-gray-500'>Role</p>
                        <p className='font-semibold text-gray-800'>{job?.title}</p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl border'>
                        <p className='text-sm text-gray-500'>Location</p>
                        <p className='font-semibold text-gray-800'>{job?.location}</p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl border'>
                        <p className='text-sm text-gray-500'>Experience</p>
                        <p className='font-semibold text-gray-800'>{`${job?.experienceLevel}+ Years Exp`}</p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl border'>
                        <p className='text-sm text-gray-500'>Salary</p>
                        <p className='font-semibold text-gray-800'>{job?.salary}</p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl border'>
                        <p className='text-sm text-gray-500'>Total Applicants</p>
                        <p className='font-semibold text-gray-800'>{job?.applications?.length}</p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-xl border'>
                        <p className='text-sm text-gray-500'>Posted Date</p>
                        <p className='font-semibold text-gray-800'>{job?.createdAt?.split('T')[0]}</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default JobDescription;
