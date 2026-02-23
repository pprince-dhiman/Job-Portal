import Category from '@/components/Category';
import HeroSection from '@/components/HeroSection';
import LatestJobs from '@/components/LatestJobs';
import React, { useEffect } from 'react'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs(); // custom hook

  const user = useSelector(store => store.auth.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user && user.role==='recruiter'){
      navigate('/admin/companies');    
    }
  },[]);

  return (
    <div>
      <HeroSection/>
      <Category/>
      <LatestJobs/>
    </div>
  )
}

export default Home;