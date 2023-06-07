import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DialogNewBill from "../../components/DialogNewBill";
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
    { id: 'descricao', model: "Comanda", label: 'Nome', minWidth: 170 },
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
    tableCellActions: {
      width: '150px', // Defina a largura desejada para a coluna de ações
    },
  }));
  

export function Comandas() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const bills = useSelector(state => state.app.bills);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [idBillToDelete, setIdBillToDelete] = React.useState(false);
    const [dataBillToEdit, setDataBillToEdit] = React.useState(false);
    const [openDialogExclusion, setOpenDialogExclusion] = React.useState(false);
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        dispatch({type: 'LOAD_BILLS', payload: {}});
    }, []);

    const handleClickNew = () => {
      setDataBillToEdit(false);
      setOpen(true);
    }
  
    const handleClose = () => {
      setDataBillToEdit(false);
      setOpen(false);
    }

    const handleClickDelete = (item_id) => {
      setIdBillToDelete(item_id);
      setOpenDialogExclusion(true);
    }

    const handleClickEdit = (data) => {
      setDataBillToEdit(data);
      setOpen(true);
    }

    const deleteItem = (item_id) => {

      dispatch({type: 'DELETE_BILL', payload: {id: item_id, callback: () => {
        dispatch({type: 'LOAD_BILLS', payload: {}});
      }}});

    }

    return (
    <>
      <DeleteDialogConfirm 
        open={openDialogExclusion} 
        setDialogOpen={setOpenDialogExclusion} 
        id={idBillToDelete} 
        message={"Tem certeza que deseja fazer esta exclusão? Esta ação é irreversível."} 
        actionConfirm={deleteItem}
      />
      <DialogNewBill 
        open={open}
        handleClose={handleClose}
        dataBillToEdit={dataBillToEdit}
        setDataBillToEdit={setDataBillToEdit}
      />
      <h1 className="azul-cabecalho">Comandas</h1>
      <p className="subheader-text mb-10">Listagem de Comandas</p>

      <div className="row">
        <div className="col">
          <Search />
        </div>
        <div className="col text-right">
          <button type="button" className="btn btn-primary mb-10 rightBtn" onClick={() => { handleClickNew() }}>NOVA COMANDA</button>
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
              {bills
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bill) => {
                  return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={bill.Comanda.id}>
                      {columns.map((column) => {
                      const value = bill[column.model][column.id];
                      const avatarField = bill[column.model][column.avatarField];
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
                      <TableCell key={"acoes"} align={"center"} className={classes.tableCellActions}>
                        <Button 
                          variant="contained" 
                          className={classes.buttonDelete} 
                          onClick={()=> {
                            handleClickDelete(bill.Comanda.id)
                          }}
                        >
                          <DeleteIcon />
                        </Button>{" "}
                        <Button 
                          variant="contained" 
                          className={classes.buttonEdit}
                          onClick={()=> {
                            handleClickEdit(bill)
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
          count={bills.length}
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