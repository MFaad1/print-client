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
const columns = [
  { id: "selected", label: "", minWidth: 30 },
  { id: "CustomerName", label: "Customer Name", minWidth: 120 },
  {
    id: "OrderNumber",
    label: "Order Number",
    minWidth: 120,
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
  {
    id: "OutforDeliveryDate",
    label: "Out for Delivery Date",
    minWidth: 140,
  },
  {
    id: "DeliveredDate",
    label: "Delivered Date",
    minWidth: 120,
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 100,
  },
];

const DeliverDocuments = () => {
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
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },

    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "PDF",
      price: 200,
      status: "Arrival",
      createdDate: "21/07/2024",
      outForDeliveryDate: "---",
      deliveredDate: "---",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "Excel",
      price: 150,
      status: "Delivered",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
    {
      isSelected: false,
      customerName: "John Doe",
      orderNumber: "#12543",
      fileType: "JPEG",
      price: 400,
      status: "Out for delivery",
      createdDate: "21/07/2024",
      outForDeliveryDate: "21/07/2024",
      deliveredDate: "21/07/2024",
    },
  ]);
  const [allSelected, setAllSelected] = useState(false);

  const handleOrderClick = () => {
    // Toggle the selection state for all orders
    setOrdersList((prevOrdersList) =>
      prevOrdersList.map((order) => ({ ...order, isSelected: !allSelected }))
    );
    // Update the allSelected state
    setAllSelected((prev) => !prev);
  };

  return (
    <SideMenu>
      <div className="page-header">
        <div />
        <p>Deliver Documents</p>
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
              {ordersList
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
                        <p className="order-table-text">{row.orderNumber}</p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.fileType}</p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.price}</p>
                      </TableCell>
                      <TableCell>
                        {row.status === "Delivered" ? (
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
                          >
                            <option
                              value="Arrival"
                              selected={row.status === "Arrival" ? true : false}
                            >
                              Arrival
                            </option>
                            <option
                              value="Delivered"
                              selected={
                                row.status === "Delivered" ? true : false
                              }
                            >
                              Delivered
                            </option>
                            <option
                              value="Out for delivery"
                              selected={
                                row.status === "Out for delivery" ? true : false
                              }
                            >
                              Out for delivery
                            </option>
                          </select>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.createdDate}</p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">
                          {row.outForDeliveryDate}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="order-table-text">{row.deliveredDate}</p>
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
export default DeliverDocuments;
