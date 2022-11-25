import React, { useState, useEffect } from 'react'
import * as AdminCompaniesAPI from '../../../services/api/adminCompanyProfiles'
import * as AdminCompanyJobOffersAPI from '../../../services/api/adminCompanyJobOffers'
import Heading from '../../../atomic/atoms/Heading'
import Pagination from '../../../atomic/molecules/Pagination'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Trans } from '@lingui/macro'
import Row from './Row'
import ActionModals from './ActionModals'
import Details from './Details'
import Loader from '../../../atomic/atoms/Loader'
import { Wrapper } from '../styles'

export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [scrollVertical, setScrollVertical] = useState(null)
  const [companyProfileToShow, setCompanyProfileToShow] = useState(false)
  const [jobOfferToShow, setJobOfferToShow] = useState(false)
  const [jobOfferToRemove, setJobOfferToRemove] = useState(false)
  const [companyToRemove, setCompanyToRemove] = useState(false)
  const [totalItemsCount, setTotalItemsCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [destroyLoading, setDestroyLoading] = useState(false)

  useEffect(() => {
    loadData(page)
    window.addEventListener("resize", resize)
  },[])

  const loadData = async () => {
    setLoading(true)
    await loadCompanies(page)
    setLoading(false)
  }

  const loadCompanies = async (pageNumber) => {    
    const allCompanies = await AdminCompaniesAPI.getAll(pageNumber)
    setTotalItemsCount(allCompanies.length > 0 ? allCompanies[0].total_items_count : 1)
    setCompanies(allCompanies)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [])

  const resize = () => {
    if(window.innerWidth < 1180) {
      setScrollVertical({overflowX: 'scroll'})
    } else {
      setScrollVertical(null)
    }
  }

  const handleDestroyCompany = async (id) => setCompanyToRemove(id)

  const destroyCompany = async () => {
    setDestroyLoading(true)
    await requestToDestroyCompany()
    setDestroyLoading(false)
  }

  const requestToDestroyCompany = async () => {
    await AdminCompaniesAPI.destroy(companyToRemove)
    setCompanyToRemove(null)
    loadCompanies(page)
  }

  const handleCancelRemoveJobOffer = () => setJobOfferToRemove(null)

  const handleCancelRemoveCompany = () => setCompanyToRemove(null)

  const handleDestroyJobOffer = async (id) => {
    setJobOfferToRemove(id)
  }

  const destroyJobOffer = async () => {
    setDestroyLoading(true)
    await requestToDestroyJobOffer()
    setDestroyLoading(false)
  }

  const requestToDestroyJobOffer = async () => {
    await AdminCompanyJobOffersAPI.destroy(jobOfferToRemove)
    setJobOfferToRemove(null)
    loadCompanies(page)
  }

  const handleLeaveCompanyProfile = () => setCompanyProfileToShow(null)

  const handleLeaveJobOffer = () => setJobOfferToShow(null)

  const handlePageChangeCallback = pageNumber => {
    setPage(pageNumber)
    loadCompanies(pageNumber)
  }

  const handleShowCompanyProfile = () => {
    setJobOfferToShow(null)
    setCompanyProfileToShow(jobOfferToShow.company_profile)
  }

  if(jobOfferToShow || companyProfileToShow) {
    return  <Wrapper>
              <Details
                jobOfferToShow={jobOfferToShow}
                handleLeaveJobOffer={handleLeaveJobOffer}
                handleShowCompanyProfile={handleShowCompanyProfile}
                companyProfileToShow={companyProfileToShow}
                handleLeaveCompanyProfile={handleLeaveCompanyProfile}
              />
            </Wrapper>
  }

  return (
    loading ? (
      <Loader />
    ) : (
        <>
          <Wrapper>
            <ActionModals
              jobOfferToRemove={jobOfferToRemove}
              destroyJobOffer={destroyJobOffer}
              handleCancelRemoveJobOffer={handleCancelRemoveJobOffer}
              companyToRemove={companyToRemove}
              destroyLoading={destroyLoading}
              destroyCompany={destroyCompany}
              handleCancelRemoveCompany={handleCancelRemoveCompany}
            />

            <Heading>
              <Trans>Companies</Trans>
            </Heading>
            <Paper style={scrollVertical}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Joined (date)</TableCell>
                    <TableCell align="right">Number of jobs online</TableCell>
                    <TableCell align="right">Link to profile</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((row) => (
                    <Row key={row.id}
                        row={row}
                        handleDestroyJobOffer={handleDestroyJobOffer}
                        handleDestroyCompany={handleDestroyCompany}
                        setCompanyProfileToShow={setCompanyProfileToShow}
                        setJobOfferToShow={setJobOfferToShow}
                    />
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <Pagination totalItemsCount={totalItemsCount} handlePageChangeCallback={handlePageChangeCallback}>
              {({ paginationComponent }) => (
                paginationComponent
              )}
            </Pagination>
          </Wrapper>
        </>
    )
  )
}
