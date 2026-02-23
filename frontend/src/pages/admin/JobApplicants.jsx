import ApplicatsJobTable from '@/components/admin/ApplicatsJobTable'
import { setAllApplicants } from '@/features/applicationSlice';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const JobApplicants = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(state => state.application);

  useEffect(()=>{
    const fetchAllApplications = async() => {
      try{
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {withCredentials: true});
        if(res.data.success){
          dispatch(setAllApplicants(res?.data?.job?.applications));
        }
      } catch(err){
        console.log(err);
      }
    }
    fetchAllApplications();
  }, []);

  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='font-bold text-xl my-5'>{`Applications (${applicants?.length})`}</h1>
      <ApplicatsJobTable/>
    </div>
  )
}

export default JobApplicants