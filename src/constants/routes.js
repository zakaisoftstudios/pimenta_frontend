import LoginContainer from '../containers/Login'
import RegisterContainer from '../containers/Register'
import ForgotPasswordContainer from '../containers/ForgotPassword'
import PasswordResetContainer from '../containers/PasswordReset'
import RegisterSuccessContainer from '../containers/RegisterSuccess'
import EmailConfirmationContainer from '../containers/EmailConfirmation'
import CompanyProfileShowContainer from '../containers/Company/Profile/Show'
import CompanyJobsListContainer from '../containers/Company/Jobs/List'
import CompanyJobsFormContainer from '../containers/Company/Jobs/Form/Form'
import CompanyLikesContainer from '../containers/Company/Likes/Likes'
import CompanyProfileEditContainer from '../containers/Company/Profile/Edit'
import StudentProfileEditContainer from '../containers/Student/Profile/Edit/Edit'
import ChatContainer from '../containers/Chat/Chat'
import PrivateTemplate from '../atomic/templates/Private'
import PublicTemplate from '../atomic/templates/Public'
import { profileTypes } from './profileTypes'
import StudentProfileShowContainer from '../containers/Student/Profile/Show'
import StudentSearch from '../atomic/organisms/StudentSearch'
import CompanySearch from '../atomic/organisms/CompanySearch'
import SearchNonAuthenticated from '../atomic/organisms/nonAuthenticated/Search'
import StudentLikesContainer from '../containers/Student/Likes/Likes'
import FacebookSignupContainer from '../containers/FacebookSignup'
import UniversityProfileShowContainer from '../containers/University/Profile/Show'
import UniversityProfileEditContainer from '../containers/University/Profile/Edit'
import UniversitySubjectsFormContainer from '../containers/University/Subjects/Form'
import UniversitySubjectsListContainer from '../containers/University/Subjects/List'
import UniversityLikedFromContainer from '../containers/University/LikedFrom'
import AdminProfileContainer from '../containers/Admin/Profile'
import AdminDashboardContainer from '../containers/Admin/Dashboard'
import AdminCompaniesContainer from '../containers/Admin/Companies'
import AdminStudentsContainer from '../containers/Admin/Students'
import AdminUniversitiesContainer from '../containers/Admin/Universities'

export const publicRoutes = {
  Login: {
    component: LoginContainer,
    template: PublicTemplate,
    path: '/login'
  },
  Register: {
    component: RegisterContainer,
    template: PublicTemplate,
    path: '/register'
  },
  ForgotPassword: {
    component: ForgotPasswordContainer,
    template: PublicTemplate,
    path: '/forgot-password'
  },
  PasswordReset: {
    component: PasswordResetContainer,
    template: PublicTemplate,
    path: '/password-reset/:token'
  },
  RegisterSuccess: {
    component: RegisterSuccessContainer,
    template: PublicTemplate,
    path: '/register-success/:email'
  },
  EmailConfirmation: {
    component: EmailConfirmationContainer,
    template: PublicTemplate,
    path: '/email-confirmation/:confirmToken'
  },
  FacebookSignup: {
    component: FacebookSignupContainer,
    template: PublicTemplate,
    path: '/facebook-signup/:facebookToken'
  }
}

export const searchRoutes = {
  JobSearch: {
    component: SearchNonAuthenticated,
    path: '/website/search'
  }
}

export const companyRoutes = {
  Profile: {
    component: CompanyProfileShowContainer,
    path: '/company/profile',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  ProfileEdit: {
    component: CompanyProfileEditContainer,
    path: '/company/profile/edit',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  JobListing: {
    component: CompanyJobsListContainer,
    path: '/company/jobs',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  JobFormEdit: {
    component: CompanyJobsFormContainer,
    path: '/company/jobs/:id/edit',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  JobFormNew: {
    component: CompanyJobsFormContainer,
    path: '/company/jobs/new',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  Chat: {
    component: ChatContainer,
    path: '/company/chat',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  Likes: {
    component: CompanyLikesContainer,
    path: '/company/likes',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  },
  Search: {
    component: CompanySearch,
    path: '/company/search',
    template: PrivateTemplate,
    roles: [profileTypes.CompanyProfile.value]
  }
}

export const studentRoutes = {
  Profile: {
    component: StudentProfileShowContainer,
    path: '/student/profile',
    template: PrivateTemplate,
    roles: [profileTypes.StudentProfile.value]
  },
  ProfileEdit: {
    component: StudentProfileEditContainer,
    path: '/student/profile/edit',
    template: PrivateTemplate,
    roles: [profileTypes.StudentProfile.value]
  },
  JobSearch: {
    component: StudentSearch,
    path: '/student/search',
    template: PrivateTemplate,
    roles: [profileTypes.StudentProfile.value]
  },
  Likes: {
    component: StudentLikesContainer,
    path: '/student/likes',
    template: PrivateTemplate,
    roles: [profileTypes.StudentProfile.value]
  },
  Chat: {
    component: ChatContainer,
    path: '/student/chat',
    template: PrivateTemplate,
    roles: [profileTypes.StudentProfile.value]
  }
}

export const universityRoutes = {
  Profile: {
    component: UniversityProfileShowContainer,
    path: '/university/profile',
    template: PrivateTemplate,
    roles: [profileTypes.UniversityProfile.value]
  },
  ProfileEdit: {
    component: UniversityProfileEditContainer,
    path: '/university/profile/edit',
    template: PrivateTemplate,
    roles: [profileTypes.UniversityProfile.value]
  },
  SubjectListing: {
    component: UniversitySubjectsListContainer,
    path: '/university/subject-offers',
    template: PrivateTemplate,
    roles: [profileTypes.UniversityProfile.value]
  },
  SubjectFormNew: {
    component: UniversitySubjectsFormContainer,
    path: '/university/subject-offers/new',
    template: PrivateTemplate,
    roles: [profileTypes.UniversityProfile.value]
  },
  SubjectFormEdit: {
    component: UniversitySubjectsFormContainer,
    path: '/university/subject-offers/:id/edit',
    template: PrivateTemplate,
    roles: [profileTypes.UniversityProfile.value]
  },
  LikedFrom: {
    component: UniversityLikedFromContainer,
    path: '/university/likes',
    template: PrivateTemplate,
    roles: [profileTypes.UniversityProfile.value]
  }
}

export const adminRoutes = {
  Profile: {
    component: AdminProfileContainer,
    path: '/admin/profile',
    template: PrivateTemplate,
    roles: [profileTypes.AdminProfile.value]
  },
  Dashboard: {
    component: AdminDashboardContainer,
    path: '/admin/dashboard',
    template: PrivateTemplate,
    roles: [profileTypes.AdminProfile.value]
  },
  Students: {
    component: AdminStudentsContainer,
    path: '/admin/students',
    template: PrivateTemplate,
    roles: [profileTypes.AdminProfile.value]
  },
  Companies: {
    component: AdminCompaniesContainer,
    path: '/admin/companies',
    template: PrivateTemplate,
    roles: [profileTypes.AdminProfile.value]
  },
  Universities: {
    component: AdminUniversitiesContainer,
    path: '/admin/universities',
    template: PrivateTemplate,
    roles: [profileTypes.AdminProfile.value]
  }
}

export const publicRoutesIds = [
  'Login',
  'Register',
  'ForgotPassword',
  'PasswordReset',
  'RegisterSuccess',
  'EmailConfirmation'
]
