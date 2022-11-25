import React, { useState, useEffect } from 'react'
import * as AdminUniversitiesAPI from '../../../services/api/adminUniversityProfiles'
import * as AdminUniversitySubjectOffersAPI from '../../../services/api/adminUniversitySubjectOffers'
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

export default function Universities() {
  const [universities, setUniversities] = useState([])
  const [scrollVertical, setScrollVertical] = useState(null)
  const [universityProfileToShow, setUniversityProfileToShow] = useState(false)
  const [subjectOfferToShow, setSubjectOfferToShow] = useState(false)
  const [subjectOfferToRemove, setSubjectOfferToRemove] = useState(false)
  const [universityToRemove, setUniversityToRemove] = useState(false)
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
    await loadUniversities(page)
    setLoading(false)
  }

  const loadUniversities = async (pageNumber) => {
    const allUniversities = await AdminUniversitiesAPI.getAll(pageNumber)
    setTotalItemsCount(allUniversities.length > 0 ? allUniversities[0].total_items_count : 1)
    setUniversities(allUniversities)
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

  const handleDestroyUniversity = async (id) => {
    setUniversityToRemove(id)
  }

  const destroyUniversity = async () => {
    setDestroyLoading(true)
    await requestToDestroyUniversity()
    setDestroyLoading(false)
  }

  const requestToDestroyUniversity = async () => {
    await AdminUniversitiesAPI.destroy(universityToRemove)
    setUniversityToRemove(null)
    loadUniversities(page)
  }

  const handleCancelRemoveSubjectOffer = () => setSubjectOfferToRemove(null)

  const handleCancelRemoveUniversity = () => setUniversityToRemove(null)

  const handleDestroySubjectOffer = async (id) => {
    setSubjectOfferToRemove(id)
  }

  const destroySubjectOffer = async () => {
    setDestroyLoading(true)
    await requestToDestroySubjectOffer()
    setDestroyLoading(false)
  }

  const requestToDestroySubjectOffer = async () => {
    await AdminUniversitySubjectOffersAPI.destroy(subjectOfferToRemove)
    setSubjectOfferToRemove(null)
    loadUniversities(page)
  }

  const handleLeaveUniversityProfile = () => setUniversityProfileToShow(null)

  const handleLeaveSubjectOffer = () => setSubjectOfferToShow(null)

  const handlePageChangeCallback = pageNumber => {
    setPage(pageNumber)
    loadUniversities(pageNumber)
  }

  const handleShowUniversityProfile = () => {
    setSubjectOfferToShow(null)
    setUniversityProfileToShow(subjectOfferToShow.university_profile)
  }

  if(subjectOfferToShow || universityProfileToShow) {
    return  <Wrapper>
              <Details
                subjectOfferToShow={subjectOfferToShow}
                handleLeaveSubjectOffer={handleLeaveSubjectOffer}
                handleShowUniversityProfile={handleShowUniversityProfile}
                universityProfileToShow={universityProfileToShow}
                handleLeaveUniversityProfile={handleLeaveUniversityProfile}
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
              subjectOfferToRemove={subjectOfferToRemove}
              destroySubjectOffer={destroySubjectOffer}
              handleCancelRemoveSubjectOffer={handleCancelRemoveSubjectOffer}
              universityToRemove={universityToRemove}
              destroyUniversity={destroyUniversity}
              destroyLoading={destroyLoading}
              handleCancelRemoveUniversity={handleCancelRemoveUniversity}
            />

            <Heading>
              <Trans>Universities</Trans>
            </Heading>
            <Paper style={scrollVertical}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Joined (date)</TableCell>
                    <TableCell align="right">Number of courses online</TableCell>
                    <TableCell align="right">Link to profile</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {universities.map((row) => (
                    <Row key={row.id}
                        row={row}
                        handleDestroySubjectOffer={handleDestroySubjectOffer}
                        handleDestroyUniversity={handleDestroyUniversity}
                        setUniversityProfileToShow={setUniversityProfileToShow}
                        setSubjectOfferToShow={setSubjectOfferToShow}
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
