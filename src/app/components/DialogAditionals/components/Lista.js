import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import DeleteDialogConfirm from "../../../components/DialogConfirm";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListOutlined from '@material-ui/icons/ListOutlined';

import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Search from './Search';

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
  { id: 'descricao', model: "ProdutoAdicional", label: 'Nome', minWidth: 170 },
  { 
      id: 'valor', 
      model: "ProdutoAdicional", 
      label: 'Valor',
      format: (value) => {
          const numberFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
    
          return numberFormat.format(value);
        },
  },
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
  buttonList: {
    //margin: theme.spacing(1),
    backgroundColor: "blue",
    color: "white",
    padding: "6px 10px",
    minWidth: 0
  },
  
  tableCellActions: {
    width: '140px', // Defina a largura desejada para a coluna de ações
  },
}));
  

export default function Lista(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const aditionals = useSelector(state => state.app.product_aditionals);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [idProductToDelete, setIdProductToDelete] = React.useState(false);
    const [openDialogExclusion, setOpenDialogExclusion] = React.useState(false);
    const product_id = props.product_id;
    const handleClickEdit = props.handleClickEdit;
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        dispatch({type: 'LOAD_PRODUCT_ADITIONALS', payload: {params: {produto_id: product_id}}});
    }, []);

    const handleClickDelete = (item_id) => {
      setIdProductToDelete(item_id);
      setOpenDialogExclusion(true);
    }

    const deleteItem = (item_id) => {

      dispatch({type: 'DELETE_PRODUCT_ADITIONAL', payload: {id: item_id, callback: () => {
        dispatch({type: 'LOAD_PRODUCT_ADITIONALS', payload: {params: {produto_id: product_id}}});
      }}});

    }

    return (
    <>
      <DeleteDialogConfirm 
        open={openDialogExclusion} 
        setDialogOpen={setOpenDialogExclusion} 
        id={idProductToDelete} 
        message={"Tem certeza que deseja fazer esta exclusão? Esta ação é irreversível."} 
        actionConfirm={deleteItem}
      />

      <p className="subheader-text mb-10">Listagem de Adicionais</p>

      <div className="row">
        <div className="col mb-10">
          <Search product_id={product_id} />
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
              {aditionals
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((aditional) => {
                  return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={aditional.ProdutoAdicional.id}>
                      {columns.map((column) => {
                      const value = aditional[column.model][column.id];
                      const avatarField = aditional[column.model][column.avatarField];
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
                            {column.format
                                ? column.format(value)
                                : (!column.type ? value : null)}
                          </TableCell>
                      );
                      })}
                      <TableCell key={"acoes"} align={"center"} className={classes.tableCellActions}>
                        <Button 
                          variant="contained" 
                          className={classes.buttonEdit}
                          onClick={()=> {
                            handleClickEdit(aditional)
                          }}
                        >
                          <EditIcon />
                        </Button>{" "}
                        <Button 
                          variant="contained" 
                          className={classes.buttonDelete} 
                          onClick={()=> {
                            handleClickDelete(aditional.ProdutoAdicional.id)
                          }}
                        >
                          <DeleteIcon />
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
          count={aditionals.length}
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