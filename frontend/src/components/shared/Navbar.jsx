import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_ENDPOINT } from '@/utils/constant';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setUser } from '@/features/authSlice';

const Navbar = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/logout`, null, {
                withCredentials: true,
                httpOnly: true,
            });

            if (res.data.success) {
                navigate('/');
                dispatch(setUser(null));
                toast.success(res.data.message);
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Problem in logout.");
        }
    }

    return (
        <div className='bg-white border-b border-gray-200 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6'>

                <div>
                    <h1 className='text-xl sm:text-2xl font-bold cursor-alias' onClick={() => navigate('/')}>
                        Job<span className='text-[#F83002] hover:text-[#6A38C2] transition'>Portal</span>
                    </h1>
                </div>

                <div className='flex items-center gap-6 lg:gap-10'>

                    <ul className='hidden md:flex gap-6 font-medium items-center text-gray-700'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-[#6A38C2] transition cursor-pointer'><Link to='/admin/companies'>Companies</Link></li>
                                    <li className='hover:text-[#6A38C2] transition cursor-pointer'><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-[#6A38C2] transition cursor-pointer'><Link to='/'>Home</Link></li>
                                    <li className='hover:text-[#6A38C2] transition cursor-pointer'><Link to='/jobs'>Jobs</Link></li>
                                    <li className='hover:text-[#6A38C2] transition cursor-pointer'><Link to='/browse'>Browse</Link></li>
                                </>)
                        }
                    </ul>

                    {
                        !user ?
                            <div className='flex items-center gap-2'>
                                <Link to='/login'>
                                    <Button variant='outline' className='hover:border-[#6A38C2] hover:text-[#6A38C2] transition'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className='bg-[#6A38C2] hover:bg-[#F83002] transition'>
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                            :
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer ring-2 ring-transparent hover:ring-[#6A38C2] transition'>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-72 rounded-xl shadow-lg'>
                                    <div className='flex gap-3 items-center'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user.profile.bio ? `${user.profile.bio}` : "No bio available"}</p>
                                            <p className='text-sm text-muted-foreground text-center'>{user.role ? `${user.role}` : "Role: NA"}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-3 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                <div className='flex items-center gap-2 hover:text-[#6A38C2] transition cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link" className='cursor-pointer p-0'><Link to='/profile'> View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className='flex items-center gap-2 hover:text-[#F83002] transition cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}
                                                className='cursor-pointer p-0'>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                    }

                </div>
            </div>
        </div>

    )
}

export default Navbar;