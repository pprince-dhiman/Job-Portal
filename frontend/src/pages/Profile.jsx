import AppliedJobTable from '@/components/AppliedJobTable'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import UpdateProfileDialog from '@/components/UpdateProfileDialog'
import useUserAppliedJobs from '@/hooks/useUserAppliedJobs'
import { Contact, Mail, Pen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

let hasResume = true;
const skills = ['HTML', 'CSS', 'JS'];

const Profile = () => {
    useUserAppliedJobs(); // custom hook to get all jobs of an applicant.

    const [open, setOpen] = useState(false);
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/signup');
            toast("Please Signup or Login.");
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className="px-4 sm:px-6 lg:px-8">

            <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-5 sm:p-8 shadow-sm">

                {/* Header */}
                <div className='flex flex-col sm:flex-row justify-between gap-4'>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">

                        <Avatar className='h-20 w-20 sm:h-24 sm:w-24'>
                            <AvatarImage src={user.profile.profilePhoto} />
                        </Avatar>

                        <div>
                            <h1 className='font-semibold text-lg sm:text-xl'>{user?.fullname || 'Please LogIn to see complete Information.'}</h1>
                            <p className="text-sm text-gray-600 max-w-md">{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <Button variant='outline' onClick={() => setOpen(true)}
                        className="self-center sm:self-start hover:bg-gray-100">
                        <Pen size={16} />
                    </Button>
                </div>

                {/* Contact */}
                <div className='my-6 space-y-3'>
                    <div className='flex items-center gap-3 text-sm sm:text-base'>
                        <Mail size={18} />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm sm:text-base'>
                        <Contact size={18} />
                        <span>+91 {user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='my-6'>
                    <h1 className="font-semibold mb-2">Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills.length !== 0 ?
                                user?.profile?.skills.map((item, idx) => (
                                    <span key={idx} className='px-1'>{item}</span>
                                ))
                                : <span>NA</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className='grid w-full max-w-sm gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        hasResume
                            ? <a
                                href={user.profile.resume}
                                target='_blank'
                                className="text-blue-600 text-sm hover:underline break-all"
                            >
                                {user.profile.resumeOriginalName}
                            </a>
                            : <span>NA</span>
                    }
                </div>

            </div>

            {/* Applied Jobs */}
            <div className='max-w-7xl mx-auto bg-white rounded-2xl p-5 sm:p-6 shadow-sm'>
                <h1 className="text-lg font-semibold mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile