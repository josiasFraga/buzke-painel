import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DialogNewCustomer from "../../components/DialogNewCustomer";
import DeleteDialogConfirm from "../../components/DialogConfirm";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Search from './components/Search';

//table
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'nome', model: "ClienteCliente", label: 'Nome', minWidth: 100, type: "avatar", avatarField : "img"},
    { id: 'pais', model: "ClienteCliente", label: 'País' },
    { id: '_telefone', model: "ClienteCliente", label: 'Telefone' },
    { id: '_endereco', model: "ClienteCliente", label: 'Endereço' },
    { id: 'email', model: "ClienteCliente", label: 'Email' },
    /*{ id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },*/
  ];
  
  const useStyles = makeStyles(theme => ({
    buttonDelete: {
      //margin: theme.spacing(1),
      backgroundColor: "red",
      color: "white",
      padding: "6px 10px",
      minWidth: 0
    },
    buttonEdit: {
      //margin: theme.spacing(1),
      backgroundColor: "silver",
      color: "white",
      padding: "6px 10px",
      minWidth: 0
    },
  }));
  

export function Clientes() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const customers = useSelector(state => state.app.customers);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [idClientToDelete, setIdClientToDelete] = React.useState(false);
    const [dataClientToEdit, setDataClientToEdit] = React.useState(false);
    const [openDialogExclusion, setOpenDialogExclusion] = React.useState(false);
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        dispatch({type: 'LOAD_CUSTOMERS', payload: {}});
    }, []);

    const handleClickNew = () => {
      setDataClientToEdit(false);
      setOpen(true);
    }
  
    const handleClose = () => {
      setDataClientToEdit(false);
      setOpen(false);
    }

    const handleClickDelete = (item_id) => {
      setIdClientToDelete(item_id);
      setOpenDialogExclusion(true);
    }

    const handleClickEdit = (data) => {
      setDataClientToEdit(data);
      setOpen(true);
    }

    const deleteItem = (item_id) => {

      dispatch({type: 'DELETE_CUSTOMER', payload: {id: item_id, callback: () => {
        dispatch({type: 'LOAD_CUSTOMERS', payload: {}});
      }}});

    }

    return (
    <>
      <DeleteDialogConfirm 
        open={openDialogExclusion} 
        setDialogOpen={setOpenDialogExclusion} 
        idClientToDelete={idClientToDelete} 
        message={"Tem certeza que deseja fazer esta exclusão? Esta ação é irreversível."} 
        actionExclusion={deleteItem}
      />
      <DialogNewCustomer 
        open={open}
        handleClose={handleClose}
        dataClientToEdit={dataClientToEdit}
        setDataClientToEdit={setDataClientToEdit}
      />
      <h1 className="azul-cabecalho">Meus Clientes</h1>
      <p className="subheader-text mb-10">Listagem de todos clientes</p>

      <div className="row">
        <div className="col">
          <Search />
        </div>
        <div className="col text-right">
          <button type="button" className="btn btn-primary mb-10 rightBtn" onClick={() => { handleClickNew() }}>NOVO CLIENTE</button>
        </div>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              {columns.map((column) => (
                  <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  >
                  {column.label}
                  </TableCell>
              ))}
                  <TableCell
                  key={"acoes"}
                  align={"center"}
                  //style={{ minWidth: column.minWidth }}
                  >
                    Ações
                  </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {customers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => {
                  return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={customer.ClienteCliente.id}>
                      {columns.map((column) => {
                      const value = customer[column.model][column.id];
                      const avatarField = customer[column.model][column.avatarField];
                      return (
                          <TableCell key={column.id} align={column.align}>
                            {column.type && column.type == "avatar" &&  
                              <CardHeader
                                avatar={
                                  <Avatar alt={value} src={avatarField} />
                                }
                                title={value}
                              />
                            }
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : (!column.type ? value : null)}
                          </TableCell>
                      );
                      })}
                      <TableCell key={"acoes"} align={"center"}>
                        <Button 
                          variant="contained" 
                          className={classes.buttonDelete} 
                          onClick={()=> {
                            handleClickDelete(customer.ClienteCliente.id)
                          }}
                        >
                          <DeleteIcon />
                        </Button>{" "}
                        <Button 
                          variant="contained" 
                          className={classes.buttonEdit}
                          onClick={()=> {
                            handleClickEdit(customer)
                          }}
                        >
                          <EditIcon />
                        </Button>
                        
                      </TableCell>
                  </TableRow>
                  );
              })}
          </TableBody>
          </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          backIconButtonProps={{
            "aria-label": "Página Anterior"
          }}
          nextIconButtonProps={{
            "aria-label": "Próxima Página"
          }}
      />
      </Paper>
    </>
    );
}