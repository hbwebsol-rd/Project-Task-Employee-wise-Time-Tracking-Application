import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const TaskPopUp = ({ pop, setPop, classes }) => {
    const createData = (date, time, spent, employee) => ({
        date,
        time,
        spent,
        employee
    });
    const [rows, setRows] = useState([
        createData('15 Aug', '10:00 - 1:00', '3', 'saurabh'),
        createData('16 Aug', '10:00 - 1:00', '3', 'taha'),
        createData('17 Aug', '10:00 - 4:00', '6', 'moiz'),
        createData('21 Aug', '10:00 - 6:00', '8', 'ssky'),
        createData('22 Aug', '10:00 - 8:00', '10', 'rahul'),
    ]);
    function handleClose() {
        setPop(false);
    }
    return (
        <>
            <Modal
                open={pop}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.popTask}>
                    <TableContainer className={classes.popTable} >
                        <div className={classes.popTitleContainer}>
                            <Typography className={classes.popTitle}>View Task</Typography>
                        </div>
                        <Table aria-label="caption table" >
                            <TableHead style={{ backgroundColor: '#F5F3FF' }}>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCell} >Date</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>Time</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>Spent Hours</TableCell>
                                    <TableCell align="left" className={classes.tableCell}>Employee</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell align="center">{row.spent}</TableCell>
                                        <TableCell>{row.employee}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </>
    )
}

export default TaskPopUp