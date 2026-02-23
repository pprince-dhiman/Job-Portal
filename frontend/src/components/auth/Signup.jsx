import axios from 'axios'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'react-hot-toast'
import { setLoading } from '@/features/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    });

    const navigate = useNavigate();
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        let formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Problem in Signup.");
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);
 
    return (
        <div className="flex justify-center px-4">
            <form onSubmit={submitHandler} className="w-full sm:w-112.5 border rounded-lg p-5 my-6 bg-white">

                <h1 className="text-lg font-bold mb-4 text-center">Sign Up</h1>

                <div className="mb-3">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                        type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                        id="fullname"
                        placeholder="Prince Dhiman"
                        className="w-full mt-1"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        id="email"
                        placeholder="prince123@gmail.com"
                        className="w-full mt-1"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        type="tel"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        id="phoneNumber"
                        placeholder="7834****83"
                        className="w-full mt-1"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        id="password"
                        placeholder="********"
                        className="w-full mt-1"
                    />
                </div>

                <div className="mb-4">
                    <Label>Role</Label>
                    <div className="flex gap-4 mt-2">
                        <Label className="flex items-center gap-2 cursor-pointer">
                            <Input type="radio" name="role" value="student"
                                onChange={changeEventHandler} checked={input.role === 'student'} />
                            Student
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer">
                            <Input type="radio" name="role" value="recruiter"
                                onChange={changeEventHandler} checked={input.role === 'recruiter'} />
                            Recruiter
                        </Label>
                    </div>
                </div>

                {/* Profile Upload */}
                <div className="mb-4">
                    <Label>Profile Photo</Label>
                    <Input
                        type="file"
                        name='file'
                        accept="image/*"
                        onChange={changeFileHandler}
                        className="w-full mt-1"
                    />
                </div>

                {
                    loading ? <Button className='w-full py-2 mt-2'><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> :
                        <Button type="submit" className="w-full py-2 mt-2">Signup</Button>
                }

                <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-700'>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup