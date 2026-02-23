import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setUser } from '@/features/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",  
        password: "",
        role: "student"
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try{
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                withCredentials: true,
                headers: {"Content-Type": 'application/json'}
            });
           
            if(res.data.success){
                navigate('/');
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        }
        catch(err){
            toast.error(err?.response?.data?.message || "Problem in login.");
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    }, []);

    return (
        <div className="flex justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full sm:w-112.5 border rounded-lg p-5 my-6 bg-white">

                <h1 className="text-lg font-bold mb-4 text-center">Log In</h1>

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
                            onChange={changeEventHandler} checked={input.role==='student'}/>
                            Student
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer">
                            <Input type="radio" name="role" value="recruiter" 
                            onChange={changeEventHandler} checked={input.role==='recruiter'}/>
                            Recruiter
                        </Label>
                    </div>
                </div>

                {
                    loading ? <Button className="w-full py-2 mt-2"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait</Button> : 
                    <Button type="submit" className="w-full py-2 mt-2" disabled={loading}>Login</Button>
                }

                <span className='text-sm'>Don't have any account? <Link to='/signup' className='text-blue-700'>Signup</Link></span>
            </form>
        </div>
    )
}

export default Login