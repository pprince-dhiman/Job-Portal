import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Footer from './components/shared/Footer'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import JobDescription from './pages/JobDescription'
import Companies from './pages/admin/Companies'
import NewCompany from './pages/admin/NewCompany'
import CompanySetup from './pages/admin/CompanySetup'
import AdminJobs from './pages/admin/AdminJobs'
import NewJob from './pages/admin/NewJob'
import JobApplicants from './pages/admin/JobApplicants'
import ProtectedRoute from './pages/admin/ProtectedRoute'

function App() {
  
  return (
    <div className='bg-gray-50'>
      <Navbar/>

      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/jobs' element={<Jobs/>} />
          <Route path='/browse' element={<Browse/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/job/description/:id' element={<JobDescription/>} />

          <Route path='/admin/companies' element={<ProtectedRoute><Companies/></ProtectedRoute>} />
          <Route path='/admin/companies/create' element={<ProtectedRoute><NewCompany/></ProtectedRoute>} />
          <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup/></ProtectedRoute>} />
          <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>} />  
          <Route path='/admin/job/create' element={<ProtectedRoute><NewJob/></ProtectedRoute>} />
          <Route path='/admin/job/:id/applicants' element={<ProtectedRoute><JobApplicants/></ProtectedRoute>} />
        </Routes>
      </div> 

      <Footer/>
    </div>
  )
    
}

export default App