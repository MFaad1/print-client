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
import { Edit, Delete, Close } from "./../../svg";
import Grid from "@mui/material/Grid";
import "./index.css";
import { Model, Input } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const columns = [
  { id: "selected", label: "", minWidth: 30 },
  { id: "CityName", label: "City Name", minWidth: 150 },
  {
    id: "State",
    label: "State",
    minWidth: 120,
  },
  {
    id: "ZipCode",
    label: "Zip Code",
    minWidth: 120,
  },
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

const ManageCities = () => {
  const [location_Edit, setlocation_Edit] = useState();

  const [modal, setModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setloading] = useState(false);
  let agent_token = localStorage.getItem("admin_access_token")
  const [cityName, setCityName] = useState((location_Edit && location_Edit.cityName) ? location_Edit.cityName : "");
  const [state, setState] = useState((location_Edit && location_Edit.state) ? location_Edit.state : '');
  const [zipCode, setZipCode] = useState((location_Edit && location_Edit.zipCode) ? location_Edit.zipCode : '');
  const [country, setcountry] = useState((location_Edit && location_Edit.country) ? location_Edit.country : '');
  const [location_loading, setlocation_loading] = useState(false);



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [ordersList, setOrdersList] = useState([]);

  // [
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  //   {
  //     isSelected: false,
  //     cityName: "City_1",
  //     state: "State_1",
  //     zipCode: 1234,
  //     createdDate: "21/07/2024",
  //   },
  // ]

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

      let orders = await axios.get(`${process.env.REACT_APP_API_URL}/admin/locations`, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });

      console.log(orders, "order")

      const dynamicOrders = orders.data.locations.map((job) => ({
        id: job._id,
        isSelected: false,
        cityName: job.city,
        state: job.state,
        zipCode: job.zip_code,
        createdDate: new Date(job.created_at).toLocaleDateString(),

      }));

      setOrdersList((prevOrders) => [...dynamicOrders]);

      // isSelected: false,
      // //     cityName: "City_1",
      // //     state: "State_1",
      // //     zipCode: 1234,
      // //     createdDate: "21/07/2024",

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

  console.log("location_Edit", cityName)


  useEffect(() => {
    get_Orders()
  }, [])

  const localtion_del_handler = async (id) => {
    try {
      console.log(id, "id")
      if (!id) return
      let orders = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/locations/${id}`, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });
      toast.success("Job has been Deleted");
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


  const handleSave = async () => {
    const cityDetails = { city: cityName, state, zip_code: zipCode, country };


    let url = location_Edit ? `/admin/locations/${location_Edit.id}` : `/admin/locations`
    let method = location_Edit ? "put" : 'post'

    try {
      setlocation_loading(true)
      let orders = await axios[method](`${process.env.REACT_APP_API_URL + url}`, cityDetails, {
        headers: {
          Authorization: `Bearer ${agent_token}`
        }
      });
      toast.success(location_Edit ? "location has been updated" : "location has been added");
      get_Orders()
      setModal(false);

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
    } finally {
      setlocation_loading(false)

    }

  };


  useEffect(() => {

    setCityName(location_Edit?.cityName || "");
    setState(location_Edit?.state || "");
    setZipCode(location_Edit?.zipCode || "");
    setcountry(location_Edit?.country || "");
  }, [location_Edit]);

  return (
    <SideMenu>
      <div className="manage-cities-page">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
            <div className="manage-cities-page-header">
              <div />
              <p>Manage Cities</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Button
              className="manage-cities-add-btn"
              onClick={() => {
                setlocation_Edit(undefined)
                setModal(true)

              }

              }
            >
              + Add New City
            </Button>
          </Grid>
        </Grid>
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
                              <p className="order-table-text">{row.cityName}</p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.state}</p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.zipCode}</p>
                            </TableCell>
                            <TableCell>
                              <p className="order-table-text">{row.createdDate}</p>
                            </TableCell>

                            <TableCell>
                              <Button className="order-table-action-btn" onClick={() => {
                                setModal(true)
                                setlocation_Edit(row)
                              }

                              }
                              >
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


      {/* <Model open={modal} onClose={() => setModal(false)} maxWidth="xs">
        <div className="modal-header">
          <p>Add New City</p>
          <img src={Close} onClick={() => setModal(false)} />
        </div>
        <p className="modal-sub-heading">City Details</p>
        <Input
          title="City Name"
          type="text"
          placeholder="City Name"
        // value={loginEmail}
        // onChange={(val) => setLoginEmail(val.target.value)}
        />
        <Input
          title="State"
          type="text"
          placeholder="State"
        // value={loginEmail}
        // onChange={(val) => setLoginEmail(val.target.value)}
        />
        <Input
          title="Zip Code"
          type="number"
          placeholder="Zip Code"
        // value={loginEmail}
        // onChange={(val) => setLoginEmail(val.target.value)}
        />
        <Button
          onClick={() => {
            setModal(false);
          }}
          className="manage-cities-save-btn"
        >
          Save
        </Button>
      </Model> */}



      <Model open={modal} onClose={() => setModal(false)} maxWidth="xs">
        <div className="modal-header">
          <p>Add New City</p>
          <img src={Close} onClick={() => setModal(false)} alt="close" />
        </div>
        <p className="modal-sub-heading">City Details</p>

        {/* Controlled Input for City Name */}
        <Input
          title="City Name"
          type="text"
          placeholder="City Name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />

        {/* Controlled Input for State */}
        <Input
          title="State"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        {/* Controlled Input for Zip Code */}
        <Input
          title="Zip Code"
          type="number"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <Input
          title="Country"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setcountry(e.target.value)}
        />

        {/* Save Button */}
        <Button disabled={location_loading} onClick={handleSave} className="manage-cities-save-btn">
          Save
        </Button>
      </Model>


    </SideMenu>
  );
};
export default ManageCities;
