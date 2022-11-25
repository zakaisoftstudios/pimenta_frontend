import styled from 'styled-components';
import SubjectDetails from '../../atomic/organisms/SubjectDetails'
import JobDetails from '../../atomic/organisms/JobDetails'

export const WrapperCards = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 770px) {
    flex-direction: column;
  }
`

export const WrapperGroupCards = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 460px) {
    flex-direction: column;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #ffffff;
  flex: 1;
  flex-direction: column;
  padding: ${({ forMobile }) => (forMobile ? '0' : '2.4rem')};
`

export const DashboardCard = styled.div`
  width: 330px;
  height: 150px;
  border-style: solid;
  border-color: #38c6e6;
  padding: 6px;
  margin: 5px;
  border-radius: 5px;
  @media (max-width: 1180px) {
    height: 180px;
    width: 230px;
  }
  @media (max-width: 770px) {
    width: 150px;
  }
`

export const StyledSubjectDetails = styled(SubjectDetails)`
  padding: 0;
`

export const TrashIcon = styled.img`
  width: 1.8rem;
  height: 1.9rem;
  cursor: pointer;
  margin-top: auto;
  margin-right: 10px;
`

export const StyledJobDetails = styled(JobDetails)`
  padding: 0;
`
