import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SideMenu } from "../../components";
import Button from "@mui/material/Button";
import { FaCheck } from "react-icons/fa";
import { Edit, Delete } from "./../../svg";
import Grid from "@mui/material/Grid";
import "./index.css";
import { SearchNormal } from "./../../svg";
const columns = [
  { id: "Sr", label: "Sr", minWidth: 30 },
  { id: "TicketNumber", label: "Ticket Number", minWidth: 120 },
  {
    id: "UserName",
    label: "User Name",
    minWidth: 100,
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 150,
  },
  {
    id: "CreatedDate",
    label: "Created Date",
    minWidth: 120,
  },
  {
    id: "ReportedDate",
    label: "Reported Date",
    minWidth: 120,
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 100,
  },
];

const Support = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [ordersList, setOrdersList] = useState([
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },

    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },

    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },

    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Pending",
      createdDate: "21/07/2024",
      reportedDate: "---",
    },
    {
      ticketNumber: 123456,
      userName: "ABC",
      pages: 2,
      status: "Completed",
      createdDate: "21/07/2024",
      reportedDate: "21/07/2024",
    },
  ]);

  return (
    <SideMenu>
      <div className="page-header">
        <div />
        <p>Support</p>
      </div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <div className="support-search">
            <img src={SearchNormal} />
            <input placeholder="Search by name" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}></Grid>
      </Grid>

      <Paper
        sx={{ width: "100%" }}
        style={{ backgroundColor: "#fff", marginTop: "20px" }}
      >
        <TableContainer sx={{ maxHeight: "62vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#fff",
                    }}
                  >
                    <p className="order-table-header-title">{column.label}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#fff" }}>
              {ordersList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      <TableCell>
                        <p className="order-table-text">{i + 1}</p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.ticketNumber}</p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.userName}</p>
                      </TableCell>

                      <TableCell>
                        {row.status === "Completed" ? (
                          <p className="order-table-status-delivered">
                            {row.status}
                          </p>
                        ) : (
                          <select
                            onChange={(val) => {
                              ordersList[i].status = val.target.value;
                              setOrdersList([...ordersList]);
                            }}
                            className="order-table-dropdown"
                            style={{
                              backgroundColor: "#FFE3E1",
                              color: "#FF3B30",
                            }}
                          >
                            <option
                              value="Pending"
                              selected={row.status === "Pending" ? true : false}
                            >
                              Pending
                            </option>
                            <option
                              value="Completed"
                              selected={
                                row.status === "Completed" ? true : false
                              }
                            >
                              Completed
                            </option>
                          </select>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.createdDate}</p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.reportedDate}</p>
                      </TableCell>
                      <TableCell>
                        <Button className="order-table-action-btn">
                          <img src={Edit} />
                        </Button>
                        <Button
                          className="order-table-action-btn"
                          style={{ marginLeft: "15px" }}
                        >
                          <img src={Delete} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={ordersList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{
            backgroundColor: "#fff",
            color: "#F7801A",
            fontFamily: "Poppins",
          }}
        />
      </Paper>
    </SideMenu>
  );
};
export default Support;
