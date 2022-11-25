import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { handleCorrectDate } from '../../../services/util/handleDate'
import Button from '../../../atomic/atoms/Button'
import trashIcon from '../../../assets/icons/trash.svg'
import { TrashIcon } from '../styles'

export default function Row(props) {
  const { 
    row,
    handleDestroyUniversity,
    handleDestroySubjectOffer,
    setUniversityProfileToShow,
    setSubjectOfferToShow } = props;

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={styles.tableCellCollapse}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{handleCorrectDate(row.created_at)}</TableCell>
        <TableCell align="right">{row.subject_offers_count}</TableCell>
        <TableCell align="right">
          <Button handleClick={() => setUniversityProfileToShow(row)}>Details</Button>
        </TableCell>
        <TableCell align="center" style={styles.trashCell}>
          <TrashIcon src={trashIcon} onClick={() => handleDestroyUniversity(row.id)} />
        </TableCell>
      </TableRow>
      <TableRow style={styles.tableRow}>
        <TableCell style={styles.tableCell} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div style={styles.subcategory} margin={1}>
              <span variant="h6" component="div">
                Subject Offers
              </span>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Link to Subject Offer</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subject_offers.map((subjectOffer) => (
                    <TableRow key={subjectOffer.id}>
                      <TableCell align="right" component="th" scope="row">
                        {subjectOffer.name}
                      </TableCell>
                      <TableCell align="right">
                        <Button handleClick={() => setSubjectOfferToShow(subjectOffer)}>Details</Button>
                      </TableCell>
                      <TableCell align="center" style={styles.trashCell}>
                        <TrashIcon src={trashIcon} onClick={() => handleDestroySubjectOffer(subjectOffer.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const styles = {
  table: {
    minWidth: 700,
  },
  tableRow: {
    height: 0,
    paddingBottom: 50
  },
  tableCell: {
    paddingBottom: 0,
    paddingTop: 0,
    border: 0
  },
  subcategory: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingBottom: 60
  },
  trashCell: {
    width: 20,
    paddingLeft: 100,
    marginLeft: 200
  },
  tableCellCollapse: {
    maxWidth: 10
  }
};
