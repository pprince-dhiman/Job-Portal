import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewJob = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    companyId: ""
  });

  const { companies } = useSelector(store => store.company);
  const navigate = useNavigate();

  const eventHandler = (e) => {
    // handle -ve cases for number type input.
    const { name, value } = e.target;
    if (name === "salary" || name === "experienceLevel" || name === "position") {
      if (value < 0) return;
    }

    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const selectHandler = (value) => {
    setInput({ ...input, companyId: value });
  }

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(+input.salary < 3){
      toast.error("Salary should be greater than 2");
      return ;
    }

    if (+input.salary < 0 || +input.experienceLevel < 0 || +input.position < 0) {
      toast.error("Values cannot be negative");
      return;
    }

    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/create`, input, { withCredentials: true });
      if (res.data.isTokenPresent === false) {
        navigate('/login');
        return;
      }

      if (res.data.success) {
        toast.success(`Job Created Successfully.`);
        navigate('/admin/jobs');

        setInput({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          experienceLevel: "",
          location: "",
          jobType: "",
          position: "",
          companyId: ""
        });
      }
    }
    catch (err) {
      toast.error(err.response.data.message);
    }
    finally {
      setLoading(false);
    }
  }

  // handle -ve values to input for job, salary & exp.
  const handleNeg = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  }

  return (
    <div className="flex items-center justify-center w-full px-4 my-6">
      <form
        onSubmit={formHandler}
        className="w-full max-w-4xl bg-white border shadow-md rounded-xl p-6 sm:p-8"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              type='text' name='title' value={input?.title} onChange={eventHandler} placeholder='Backend dev...'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              type='text' name='description' value={input?.description} onChange={eventHandler} placeholder='About job'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

          <div className="space-y-1">
            <Label>Requirements</Label>
            <Input
              type='text' name='requirements' value={input?.requirements} onChange={eventHandler} placeholder='Node.js, express, ...'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

          <div className="space-y-1">
            <Label>Salary</Label>
            <Input
              onKeyDown={handleNeg}
              type='number' name='salary' value={input?.salary} min="0" onChange={eventHandler} placeholder='7 (Enter only number ex:7 = 7LPA)'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

          <div className="space-y-1">
            <Label>Location</Label>
            <Input
              type='text' name='location' value={input?.location} onChange={eventHandler} placeholder='Banglore, Hyderabad, Noida, etc.'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

          <div className="space-y-1">
            <Label>Job Type</Label>
            <Input
              type='text' name='jobType' value={input?.jobType} onChange={eventHandler} placeholder='Fulltime, Onsite, remote, etc.'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

          <div className="space-y-1">
            <Label>Experience Level</Label>
            <Input
              onKeyDown={handleNeg}
              type='number' name='experienceLevel' value={input?.experienceLevel} onChange={eventHandler}
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='2'
            />
          </div>

          <div className="space-y-1">
            <Label>No. of Position</Label>
            <Input
              onKeyDown={handleNeg}
              type='number' name='position' value={input?.position} onChange={eventHandler} placeholder='13'
              className='w-full my-1 focus-visible:ring-offset-0 focus-visible:ring-0' required
            />
          </div>

        </div>

        {
          companies.length > 0 && (
            <div className="mt-5">
              <Select onValueChange={selectHandler} required>
                <SelectTrigger className="w-full sm:max-w-xs">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a company</SelectLabel>
                    {
                      companies.map((company) => (
                        <SelectItem key={company?._id} value={company?._id}>
                          {company?.name}
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )
        }

        <div className="mt-5">
          {
            loading
              ? <Button disabled={loading} className='w-full py-2 flex items-center justify-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                Posting...
              </Button>
              : <Button type="submit" className="w-full py-2">
                Post Job
              </Button>
          }
        </div>

        {
          companies.length === 0 &&
          <p className="text-xs text-red-600 font-semibold text-center mt-4">
            *Register a company first to post job.
          </p>
        }

      </form>
    </div>
  )
}

export default NewJob;