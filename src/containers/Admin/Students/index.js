import React, { useState, useEffect } from 'react'
import * as AdminStudentsAPI from '../../../services/api/adminStudentProfiles'
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

export default function Students() {
  const [students, setStudents] = useState([])
  const [scrollVertical, setScrollVertical] = useState(null)
  const [studentProfileToShow, setStudentProfileToShow] = useState(false)
  const [studentToRemove, setStudentToRemove] = useState(false)
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
    await loadStudents(page)
    setLoading(false)
  }

  const loadStudents = async (pageNumber) => {
    const allStudents = await AdminStudentsAPI.getAll(pageNumber)
    setTotalItemsCount(allStudents.length > 0 ? allStudents[0].total_items_count : 1)
    setStudents(allStudents)
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

  const handleDestroyStudent = async (id) => {
    setStudentToRemove(id)
  }

  const destroyStudent = async () => {
    setDestroyLoading(true)
    await requestToDestroyStudent()
    setDestroyLoading(false)
  }

  const requestToDestroyStudent = async () => {
    await AdminStudentsAPI.destroy(studentToRemove)
    setStudentToRemove(null)
    loadStudents(page)
  }

  const handleCancelRemoveStudent = () => setStudentToRemove(null)

  const handleLeaveStudentProfile = () => setStudentProfileToShow(null)

  const handlePageChangeCallback = pageNumber => {
    setPage(pageNumber)
    loadStudents(pageNumber)
  }

  const handleShowStudentProfile = () => {
    setStudentProfileToShow(studentProfileToShow)
  }

  if(studentProfileToShow) {
    return  <Wrapper>
              <Details
                handleShowStudentProfile={handleShowStudentProfile}
                studentProfileToShow={studentProfileToShow}
                handleLeaveStudentProfile={handleLeaveStudentProfile}
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
              studentToRemove={studentToRemove}
              destroyStudent={destroyStudent}
              destroyLoading={destroyLoading}
              handleCancelRemoveStudent={handleCancelRemoveStudent}
            />

            <Heading>
              <Trans>Students</Trans>
            </Heading>
            <Paper style={scrollVertical}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Joined (date)</TableCell>
                    <TableCell align="right">Link to profile</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((row) => (
                    <Row key={row.id}
                        row={row}
                        handleDestroyStudent={handleDestroyStudent}
                        setStudentProfileToShow={setStudentProfileToShow}
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
