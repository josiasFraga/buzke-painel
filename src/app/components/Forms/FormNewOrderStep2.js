import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Table } from 'react-bootstrap';

import DialogAddProductToOrder from "../DialogAddProductToOrder";

import BlockUi from 'react-block-ui';

export function FormNewOrderStep2(props) {
  const dispatch = useDispatch();

  const products_categories = useSelector(state => state.app.products_categories);
  const products = useSelector(state => state.app.products);
  /*const aditionals = useSelector(state => state.app.product_aditionals);*/

  const [expanded, setExpanded] = React.useState(false);
  const [productToAdd, setProductToAdd] = React.useState({});
  const formik = props.formik;
  const open = props.open;
  const setOpen = props.setOpen;

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addProduct = (product) => {
    setProductToAdd(product);
    /*dispatch({type: 'LOAD_PRODUCT_ADITIONALS', payload: {params: {produto_id: product.id}}});*/
    setOpen(true);
  }

  React.useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS_CATEGORIES' });
    dispatch({ type: 'LOAD_PRODUCTS' });
  }, []);

  return (
    <>
      <DialogAddProductToOrder
        open={open}
        handleClose={handleClose}
        //aditionals={aditionals}
        product={productToAdd}
        formik={formik}
      />
      <BlockUi tag="div" blocking={formik.isSubmitting}>
        <div className="row">
          <div className="col-12">
            <h5>Comanda: <span>{formik.values.comanda}</span></h5>
            <h5>Mesa: <span>{formik.values.mesa}</span></h5>
            <h5>Endereço: <span>{formik.values.endereco}</span></h5>
          </div>
        </div>
        {products_categories.map(categoryItem => {
          const category = categoryItem.ProdutoCategoria;
          const categoryId = category.id;

          const categoryProducts = products.filter(product => {
            return product.Produto.categoria_id === categoryId
          });
          const numberFormat = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          //return numberFormat.format(product.Produto.valor_venda);
    
          return (
            <Accordion
              key={categoryId}
              expanded={expanded === categoryId}
              onChange={handleChange(categoryId)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${categoryId}-content`}
                id={`panel-${categoryId}-header`}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {category.nome}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th style={{ width: '120px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((productItem, index) => {
                        const product = productItem.Produto;
                        const isEvenRow = index % 2 === 0;
                        const rowStyle = {
                          backgroundColor: isEvenRow ? '#f5f5f5' : 'transparent',
                        };

                        return (
                          <tr key={product.id} style={rowStyle}>
                            <td>{product.descricao}</td>
                            <td>{numberFormat.format(product.valor_venda)}
                            </td>
                            <td>
                              <Button 
                                variant="contained" 
                                color="primary"
                                onClick={()=>{
                                  addProduct(product);
                                }}
                              >Adicionar</Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </BlockUi>
    </>
  );
}
