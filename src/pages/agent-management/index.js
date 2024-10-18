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
import { FaCheck } from "react-icons/fa";
import { Edit, Delete } from "../../svg";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import Agentmodel from "../agent-management/Agent-model";


const columns = [
  { id: "selected", label: "", minWidth: 30 },
  { id: "CustomerName", label: "Customer Name", minWidth: 150 },
  {
    id: "Email",
    label: "Email",
    minWidth: 120,
  },
  // {
  //   id: "PhoneNumber",
  //   label: "Phone Number",
  //   minWidth: 120,
  // },
  {
    id: "CreatedDate",
    label: "Created Date",
    minWidth: 120,
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 100,
  },
];

const AgentManagement = () => {
  let agent_token = localStorage.getItem("admin_access_token")
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setloading] = useState(false);

  const [page, setPage] = React.useState(0);
  const [edit_value, setedit_value] = useState();
  const [modal, setModal] = useState(false);



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  // [
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },

  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },

  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },

  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     customerName: "John Doe",
  //     email: "johndoe@gmail.com",
  //     phone: "+1 610 450 0000",
  //     createdDate: "21/07/2024",
  //   },
  // ]



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
      let orders = await axios.get(`${process.env.REACT_APP_API_URL}/admin/print-agents`, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });

      console.log(orders, "order")

      const dynamicOrders = orders.data.printAgents.map((job) => ({
        isSelected: false,
        id: job._id,
        customerName: job.full_name,
        email: job.email,
        createdDate: new Date(job.created_at).toLocaleDateString(),

        businessName: job.business_name,
        businessType: job.business_type,
        ...job,
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

  const localtion_del_handler = async (id) => {
    try {

      if (!id) return
      let orders = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/print-agents/${id}`, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });
      toast.success("Customer has has been Deleted");
      setOrdersList((prevOrders) => prevOrders.filter((item) => item.id !== id));


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
  }



  console.log(modal, "modal")

  return (
    <SideMenu>
      <div className="page-header">
        <div />
        <p>Agent Management</p>
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
                              <p className="order-table-text">{row.email}</p>
                            </TableCell>
                            {/* <TableCell>
                        <p className="order-table-text">{row.phone}</p>
                      </TableCell> */}
                            <TableCell>
                              <p className="order-table-text">{row.createdDate}</p>
                            </TableCell>

                            <TableCell>
                              <Button className="order-table-action-btn" onClick={() => { setModal(true); setedit_value(row) }}>
                                <img src={Edit} />
                              </Button>
                              <Button
                                className="order-table-action-btn"
                                style={{ marginLeft: "15px" }}
                                onClick={() => localtion_del_handler(row.id)}
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

        {!ordersList.length > 0 ? "" :
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
          />}
      </Paper>


      <Agentmodel setModal={setModal} modal={modal} edit_value={edit_value} get_Orders={get_Orders} />

    </SideMenu>
  );
};
export default AgentManagement;
