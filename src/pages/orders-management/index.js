import React, { useEffect, useState } from "react";
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
import "./index.css";
import { FaCheck } from "react-icons/fa";
import { Edit, Delete } from "./../../svg";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from '../../components/Loader/Loader'

const columns = [
  { id: "selected", label: "", minWidth: 30 },
  { id: "CustomerName", label: "Customer Name", minWidth: 120 },
  {
    id: "Pages",
    label: "Pages",
    minWidth: 50,
  },
  {
    id: "FileType",
    label: "File Type",
    minWidth: 80,
  },
  {
    id: "Price",
    label: "Price",
    minWidth: 50,
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
  // {
  //   id: "Action",
  //   label: "Action",
  //   minWidth: 100,
  // },
];

const OrdersManagement = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setloading] = useState(false);
  let agent_token = localStorage.getItem("admin_access_token")
  // [
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },

  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },

  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 2,
  //     fileType: "PDF",
  //     price: 200,
  //     status: "Pending",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     pages: 8,
  //     fileType: "Excel",
  //     price: 150,
  //     status: "Completed",
  //     createdDate: "21/07/2024",
  //   },
  // ]

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [ordersList, setOrdersList] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const handleOrderClick = () => {
    // Toggle the selection state for all orders
    setOrdersList((prevOrdersList) =>
      prevOrdersList.map((order) => ({ ...order, isSelected: !allSelected }))
    );
    // Update the allSelected state
    setAllSelected((prev) => !prev);
  };

  const get_Orders = async () => {
    try {

      if (!agent_token) throw new Error("Please re-login and try again")
      setloading(true)
      let orders = await axios.get(`${process.env.REACT_APP_API_URL}/admin/print-jobs`, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });

      console.log(orders, "order")

      const dynamicOrders = orders.data.printJobs.map((job) => ({
        isSelected: false,
        customerName: job.customer_id.id,
        pages: job.pages,
        fileType: job.file_path.endsWith('.pdf') ? 'PDF' : 'Unknown',
        price: job.total_cost,
        status: job.payment_status.charAt(0).toUpperCase() + job.payment_status.slice(1),
        createdDate: new Date(job.created_at).toLocaleDateString(),
      }));

      setOrdersList((prevOrders) => [...dynamicOrders]);



    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message)
      }

      else if (error.message) {
        toast.error(error.message);
      }
      else {
        toast.error("Internal server error");
      }
    }
    finally {
      setloading(false)

    }
  }



  useEffect(() => {
    get_Orders()
  }, [])

  return (
    <SideMenu>
      <div className="page-header">
        <div />
        <p>Orders Management</p>
      </div>
      <Paper sx={{ width: "100%" }} style={{ backgroundColor: "#fff" }}>
        <TableContainer sx={{ maxHeight: "70vh" }}>
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
                    {column.label === "" ? (
                      <Button
                        className="order-table-checkbox"
                        style={{
                          backgroundColor: allSelected ? "#F7801A" : "#fff",
                        }}
                        onClick={() => handleOrderClick(index)}
                      >
                        {allSelected && (
                          <FaCheck
                            style={{
                              color: "#fff",
                              height: "10px",
                              width: "10px",
                            }}
                          />
                        )}
                      </Button>
                    ) : (
                      <p className="order-table-header-title">{column.label}</p>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#fff" }}>




              {


                !ordersList.length > 0 && !loading ? <div className="not-job"><p>No Job available</p></div> :

                  loading ? <Loader /> :


                    ordersList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, i) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                            <TableCell>
                              <Button
                                className="order-table-checkbox"
                                style={{
                                  backgroundColor: row.isSelected
                                    ? "#F7801A"
                                    : "#fff",
                                }}
                                onClick={() => {
                                  ordersList[i].isSelected =
                                    !ordersList[i].isSelected;
                                  setOrdersList([...ordersList]);
                                }}
                              >
                                {row.isSelected && (
                                  <FaCheck
                                    style={{
                                      color: "#fff",
                                      height: "10px",
                                      width: "10px",
                                    }}
                                  />
                                )}
                              </Button>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.customerName}</p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.pages}</p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.fileType}</p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.price}</p>
                            </TableCell>
                            <TableCell>
                              <p
                                className="order-table-status-delivered"
                                style={{
                                  color:
                                    row.status === "Completed"
                                      ? "#089E2E"
                                      : "#FF3B30",
                                }}
                              >
                                {row.status}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.createdDate}</p>
                            </TableCell>

                            <TableCell>
                              {/* <Button className="order-table-action-btn">
                                <img src={Edit} />
                              </Button> */}

                              {/* <Button
                                className="order-table-action-btn"
                                style={{ marginLeft: "15px" }}
                              >
                                <img src={Delete} />
                              </Button> */}
                            </TableCell>
                          </TableRow>
                        );
                      })}



            </TableBody>
          </Table>
        </TableContainer>

        {
          !ordersList.length > 0 ? "" :
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
        }


      </Paper>
    </SideMenu>
  );
};
export default OrdersManagement;
