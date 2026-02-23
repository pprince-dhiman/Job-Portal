import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import toast from 'react-hot-toast'
import { setUser } from '@/features/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),

        // multer get resume as name:'file'
        file: user?.profile?.resume,
    });

    const updateHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('fullname', input?.fullname)
        formData.append('email', input?.email)
        formData.append('phoneNumber', input?.phoneNumber)
        formData.append('bio', input?.bio)
        formData.append('skills', input?.skills)
        if (input.file) {
            formData.append('file', input?.file)
        }

        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Updation failed');
        }
        finally{
            setLoading(false);
            setOpen(false);
        }
        
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-106' onInteractOutside={() => setOpen(false)} >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={formSubmitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right'>Name</Label>
                                <Input type='text' id="name" name='fullname' value={input.fullname} onChange={updateHandler} className={'col-span-3'} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input type='email' id="email" name='email' value={input.email} onChange={updateHandler} className={'col-span-3'} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='number' className='text-right'>Number</Label>
                                <Input type='number' id="number" name='phoneNumber' value={input.phoneNumber} onChange={updateHandler} className={'col-span-3'} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input type='text' id="bio" name='bio' value={input.bio} onChange={updateHandler} className={'col-span-3'} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input type='text' id="skills" name='skills' value={input.skills} onChange={updateHandler} className={'col-span-3'} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='resume' className='text-right'>Resume</Label>
                                <Input type='file' id="resume" name='file' className={'col-span-3'}
                                    onChange={fileChangeHandler} accept="application/pdf" />
                            </div>
                        </div>

                        <DialogFooter>
                            {
                                loading ? <Button className='w-full py-2 mt-2'><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> :
                                    <Button type="submit" className="w-full py-2 mt-2">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog;