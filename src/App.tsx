import { lazy, Suspense, useEffect } from 'react'
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import './App.css'
import { Backdrop, CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/admin/Login'
import Home from './pages/user/BeforeOneApplicant/Home'
const CompanyHome = lazy(() => import('./pages/company/CompanyHome'))
const Dashboard = lazy(() => import('./pages/company/Dashboard'))
const AdminHome = lazy(() => import('./pages/admin/AdminHome'))
import CompnanyPrivateRoute from './components/company/CompnanyPrivateRoute'
const ForgotPassword = lazy(() => import('./pages/common/ForgotPassword'))
const Settings = lazy(() => import('./pages/company/Settings'))
const Overview = lazy(() => import('./components/company/Overview'))
const SocialLinks = lazy(() => import('./components/company/SocialLinks'))
import AdminPrivateRoute from './components/admin/AdminPrivateRoute'
import UserLayout from './pages/layouts/UserLayout'
import CompanyList from './components/user/common/CompanyList'
const Jobs = lazy(() => import('./components/user/common/Jobs'))
const Requests = lazy(() => import('./pages/admin/Requests'))
const UsersListing = lazy(() => import('./pages/admin/UsersListing'))
const Companies = lazy(() => import('./pages/admin/Companies'))
const UserDashboardHome = lazy(() => import('./components/user/dashboard/Home'));
import Profile from './components/user/dashboard/Profile'
import Categories from './pages/admin/Categories'
import AddCategory from './pages/admin/AddCategory'
const PostJob = lazy(() => import('./components/company/PostJob'))
import 'react-profile/themes/default'
import EditCategory from './components/admin/EditCategory'
import ListSector from './components/admin/ListSector'
import AddSectors from './components/admin/AddSectors'
import { JobListingCompanySide } from './components/company/CompanyJobListing'
import Chat from './pages/Chat/Chat'
import JobDetails from './pages/user/JobDetails'
import CompanyDetails from './pages/user/CompanyDetails'
import JobEdting from './pages/company/JobEdting'
import Applicants from './pages/company/Applicants'
import Applications from './pages/user/Applications'
import ApplicantDetails from './pages/company/ApplicantDetails'
import ApplicantsOfJob from './pages/company/ApplicantsOfJob'
import Schedules from './pages/company/Schedules'
import ResumeHome from './pages/resume/ResumeHome'
import ResumeForm from './pages/resume/CreateResume'
import ResumeView from './pages/resume/ResumeView'
import Quiz from './pages/quiz/Quiz'
import Interview from './pages/Interview'
import Call from './pages/call/Call'
import UserDashboard from './pages/user/UserDashboard'
import Skills from './pages/admin/Skills'
import { setGlobalDispatch } from './redux/global'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import SIde from './components/user/SIde'
import { ResumeContextProvider } from './context/ResumeContext'


function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setGlobalDispatch(dispatch);
  }, [dispatch]);

  return (
    <Suspense fallback={
      <Backdrop open={true} sx={{ color: 'white', backgroundColor: 'rgba( 9,9,9,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <CircularProgress color="inherit" />
      </Backdrop>
    }>
      <Call />
      <Routes>

      ////! routes for user
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='/side' element={<SIde />} />
        <Route path='home' element={<UserLayout />} >
          <Route path='interview/:room' element={<Interview />} />  //! FOR INTERVIEW (VIDEO CALL)
          <Route index element={<Home />} />
          <Route path='jobs' element={<Jobs />} />
          <Route path='jobs/:id' element={<JobDetails />} />
          <Route path='companies' element={<CompanyList />} />
          <Route path='companies/details' element={<CompanyDetails />} />
        </Route>
        <Route path='/Dashboard' element={<UserDashboardHome />}>
          <Route path='' element={<UserDashboard />} />
          <Route path='messages' element={<Chat />} />
          <Route path='applications' element={<Applications />} />
          <Route path='jobs' element={<Jobs />} />
          <Route path='jobs/:id' element={<JobDetails />} />
          <Route path='companies' element={<CompanyList />} />
          <Route path='companies/:id' element={<CompanyDetails />} />
          <Route path='profile' element={<Profile />} />
          <Route path='resume' element={<ResumeHome />} />
          <Route path='quiz' element={<Quiz />} />
          <Route path='resume/create' element={
            <ResumeContextProvider>
              <ResumeForm />
            </ResumeContextProvider>
          } />
          <Route path='resume/view' element={
            <ResumeContextProvider>
              <ResumeView />
            </ResumeContextProvider>
          } />
        </Route>

        <Route path='/forgot-password' element={<ForgotPassword />} />

     ////! routes for the company
        <Route path='/company'>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='' element={
            <CompnanyPrivateRoute>
              <CompanyHome />
            </CompnanyPrivateRoute>
          }>
            <Route path='' element={<Dashboard />} />
            <Route path='post' element={<PostJob />} />
            <Route path='messages' element={<Chat />} />
            <Route path='applicants' element={<Applicants />} />
            <Route path='applicants/:id' element={<ApplicantDetails />} />
            <Route path='job-list' element={<JobListingCompanySide />} />
            <Route path='job-list/:id' element={<JobEdting />} />
            <Route path='job-list/applicants/:id' element={<ApplicantsOfJob />} />
            <Route path='schedules' element={<Schedules />} />
            <Route path='settings' element={<Settings />}>
              <Route path='' element={<Overview />} />
              <Route path='social-links' element={<SocialLinks />} />
            </Route>
          </Route>
          <Route path='interview/:room' element={<Interview />} />
        </Route>


      ////! routes for admin
        <Route path='/admin'>
          <Route path='' element={<AdminLogin />} />
          <Route path='home' element={
            <AdminPrivateRoute>
              <AdminHome />
            </AdminPrivateRoute>
          }>
            <Route path='add-category' element={<AddCategory />} />
            <Route path='category' element={<Categories />} />
            <Route path='sector' element={<ListSector />} />
            <Route path='add-sector' element={<AddSectors />} />
            <Route path='update' element={<EditCategory />} />
            <Route path='requests' element={<Requests />} />
            <Route path='companies' element={<Companies />} />
            <Route path='users' element={<UsersListing />} />
            <Route path='skills' element={<Skills />} />
          </Route>
        </Route>
      </Routes>
    </Suspense >
  )
}

export default App
