import { ic_card_travel } from 'react-icons-kit/md/'
import { ic_search } from 'react-icons-kit/md/'
import { ic_favorite_border } from 'react-icons-kit/md/'
import { ic_chat_bubble_outline } from 'react-icons-kit/md/'
import { ic_person_outline } from 'react-icons-kit/md'
import CompanyProfile from '../atomic/organisms/CompanyProfile'
import StudentPublicProfile from '../atomic/organisms/StudentPublicProfile'
import i18n from '../locales'
import { t } from '@lingui/macro'

export const profileTypes = {
  StudentProfile: {
    label: i18n._(t`Student`),
    value: 'StudentProfile',
    profileUrl: '/student/profile',
    editProfileUrl: '/student/profile/edit',
    backendResource: 'student',
    chatPartnerComponent: CompanyProfile,
    menuItems: [
      {
        name: 'profile',
        title: i18n._(t`Profile`),
        path: '/student/profile',
        icon: ic_person_outline
      },
      {
        name: 'search',
        title: i18n._(t`Search`),
        path: '/student/search',
        icon: ic_card_travel
      },
      {
        name: 'chat',
        title: i18n._(t`Chat`),
        path: '/student/chat',
        icon: ic_chat_bubble_outline
      },
      {
        name: 'likes',
        title: i18n._(t`Likes`),
        path: '/student/likes',
        icon: ic_favorite_border
      }
    ]
  },
  CompanyProfile: {
    label: i18n._(t`Company`),
    value: 'CompanyProfile',
    profileUrl: '/company/profile',
    editProfileUrl: '/company/profile/edit',
    backendResource: 'company',
    chatPartnerComponent: StudentPublicProfile,
    menuItems: [
      {
        name: 'jobs',
        title: i18n._(t`Jobs`),
        path: '/company/jobs',
        icon: ic_card_travel
      },
      {
        name: 'hunting',
        title: i18n._(t`Search`),
        path: '/company/search',
        icon: ic_search
      },
      {
        name: 'likes',
        title: i18n._(t`Likes`),
        path: '/company/likes',
        icon: ic_favorite_border
      },
      {
        name: 'chat',
        title: i18n._(t`Chat`),
        path: '/company/chat',
        icon: ic_chat_bubble_outline
      },
      {
        name: 'profile',
        title: i18n._(t`Profile`),
        path: '/company/profile',
        icon: ic_person_outline
      }
    ],
    textInfos: [
      { title: i18n._(t`What we do`), field: 'what_we_do' },
      { title: i18n._(t`Why we do it`), field: 'why_we_do_it' },
      {
        title: i18n._(t`Why you should join`),
        field: 'why_you_should_join_our_team'
      },
      {
        title: i18n._(t`Special Features`),
        field: 'special_features',
        breakNewLines: true
      }
    ]
  },
  UniversityProfile: {
    label: i18n._(t`University`),
    value: 'UniversityProfile',
    profileUrl: '/university/profile',
    editProfileUrl: '/university/profile/edit',
    backendResource: 'university',
    menuItems: [
      {
        name: 'subjects',
        title: i18n._(t`Subjects`),
        path: '/university/subject-offers',
        icon: ic_card_travel
      },

      {
        name: 'likes',
        title: i18n._(t`Likes`),
        path: '/university/likes',
        icon: ic_favorite_border
      },
      {
        name: 'profile',
        title: i18n._(t`Profile`),
        path: '/university/profile',
        icon: ic_person_outline
      }
    ],
    textInfos: [
      { title: i18n._(t`We are`), field: 'we_are' },
      {
        title: i18n._(t`Why you should study here`),
        field: 'why_should_you_study_here'
      },
      { title: i18n._(t`Subject areas`), field: 'subject_areas' },
      {
        title: i18n._(t`Special features & Partners of the university`),
        field: 'special_features',
        breakNewLines: true
      }
    ]
  },
  AdminProfile: {
    label: i18n._(t`Admin`),
    value: 'AdminProfile',
    profileUrl: '/admin/profile',
    backendResource: 'admin',
    menuItems: [
      {
        name: 'students',
        title: i18n._(t`Students`),
        path: '/admin/students',
        icon: ic_person_outline
      },
      {
        name: 'companies',
        title: i18n._(t`Companies`),
        path: '/admin/companies',
        icon: ic_person_outline
      },
      {
        name: 'universities',
        title: i18n._(t`Universities`),
        path: '/admin/universities',
        icon: ic_person_outline
      },
      {
        name: 'dashboard',
        title: i18n._(t`Dashboard`),
        path: '/admin/dashboard',
        icon: ic_favorite_border
      },
      {
        name: 'profile',
        title: i18n._(t`Profile`),
        path: '/admin/profile',
        icon: ic_card_travel
      }
    ]
  }
}

export const profileTypesList = () =>
  Object.keys(profileTypes).map(key => profileTypes[key])
