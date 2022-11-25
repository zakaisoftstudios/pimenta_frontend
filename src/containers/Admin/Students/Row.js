import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { handleCorrectDate } from '../../../services/util/handleDate'
import Button from '../../../atomic/atoms/Button'
import trashIcon from '../../../assets/icons/trash.svg'
import { TrashIcon } from '../styles'

export default function Row(props) {
  const { 
    row,
    handleDestroyStudent,
    setStudentProfileToShow } = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="right" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{handleCorrectDate(row.created_at)}</TableCell>
        <TableCell align="right">
          <Button handleClick={() => setStudentProfileToShow(row)}>Details</Button>
        </TableCell>
        <TableCell align="center" style={styles.trashCell}>
          <TrashIcon src={trashIcon} onClick={() => handleDestroyStudent(row.id)} />
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
  }
};
