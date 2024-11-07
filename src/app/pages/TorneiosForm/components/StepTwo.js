import React from 'react';
import PickerPadelCategories from '../../../components/Forms/Components/Pickers/PadelCategories';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { FieldArray, FormikProvider } from 'formik';

const useStyles = makeStyles(theme => ({
    button: {
      //margin: theme.spacing(1),
        width: "100%",
        color: "red"
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  }));

export function StepTwo(props) {

    const formik = props.formik;
    const classes = useStyles();

    return (
        <FormikProvider value={formik}>
            <FieldArray
                name="torneio_categoria"
                render={arrayHelpers => (
                <>
                    <div className='row'>
                {
                    formik.values.torneio_categoria.map((categoria, index)=>{
                        //console.log(categoria);
                        const categoria_id_invalid = formik.errors.torneio_categoria && 
                        formik.errors.torneio_categoria[index] &&
                        formik.errors.torneio_categoria[index].categoria_id && 
                        formik.touched.torneio_categoria && 
                        formik.touched.torneio_categoria[index] &&
                        formik.touched.torneio_categoria[index].categoria_id;
            
                        const nome_invalid = formik.errors.torneio_categoria && 
                        formik.errors.torneio_categoria[index] &&
                        formik.errors.torneio_categoria[index].limite_duplas && 
                        formik.touched.torneio_categoria && 
                        formik.touched.torneio_categoria[index] &&
                        formik.touched.torneio_categoria[index].nome;
    
                        const limite_duplas_invalid = formik.errors.torneio_categoria && 
                        formik.errors.torneio_categoria[index] &&
                        formik.errors.torneio_categoria[index].limite_duplas && 
                        formik.touched.torneio_categoria && 
                        formik.touched.torneio_categoria[index] &&
                        formik.touched.torneio_categoria[index].limite_duplas;

                        const sexo_invalid = formik.errors.torneio_categoria && 
                        formik.errors.torneio_categoria[index] &&
                        formik.errors.torneio_categoria[index].sexo && 
                        formik.touched.torneio_categoria && 
                        formik.touched.torneio_categoria[index] &&
                        formik.touched.torneio_categoria[index].sexo;
                        return (
                            <div key={index}  className='col-md-4'>
                                <div style={{border: "1px solid #f7f7f7", borderRadius: 5, padding:15}}>
                                    <h4 className='mb-4'>Categoria {index+1}</h4>
                                    <div className='row'>
    
                                        <div className='col-12 mb-8'>
                                            <PickerPadelCategories name={`torneio_categoria.${index}.categoria_id`} formik={formik} showExtra={true} field_invalid={categoria_id_invalid} />
                                            {categoria_id_invalid && <label className="invalid-feedback">{formik.errors.torneio_categoria[index].categoria_id}</label>}
                                        </div>
    
                                        { categoria.categoria_id == "0" ? 
                                        <div className="col-md-12 mb-8">
                                            <label className="form-label">Nome da Categoria <span className="text-danger">&nbsp;*</span></label>
                                            <input
                                                type="text"
                                                name={`torneio_categoria.${index}.nome`}
                                                className={"form-control " + (nome_invalid ? 'is-invalid' : '')}
                                                value={categoria.nome}
                                                onChange={(evt) => {
                                                    formik.setFieldValue(`torneio_categoria.${index}.nome`, evt.target.value);
                                                }}
                                            />
                                            {nome_invalid && <label className="invalid-feedback">{formik.errors.torneio_categoria[index].nome}</label>}
                                        </div>
                                        : null}
    
                                        <div className="col-md-12 mb-8">
                                            <label className="form-label">Sexo</label>
                                            <Form.Check
                                            type="radio"
                                            label="Masculina"
                                            name={`torneio_categoria.${index}.sexo`}
                                            custom
                                            checked={categoria.sexo == "M"}
                                            id={index + "_sexo_M"}
                                            onChange={(evt)=>{
                                                if ( evt.target.checked ) {
                                                    formik.setFieldValue(`torneio_categoria.${index}.sexo`, "M");
                                                }
                                            }}
                                            className={(sexo_invalid ? 'is-invalid' : '')}
                                            />
                                            <Form.Check
                                            type="radio"
                                            label="Feminina"
                                            name={`torneio_categoria.${index}.sexo`}
                                            custom
                                            checked={categoria.sexo == "F"}
                                            id={index + "_sexo_F"}
                                            onChange={(evt)=>{
                                                if ( evt.target.checked ) {
                                                    formik.setFieldValue(`torneio_categoria.${index}.sexo`, "F");
                                                }
                                            }}
                                            className={(sexo_invalid ? 'is-invalid' : '')}
                                            />
                                            <Form.Check
                                            type="radio"
                                            label="Outra"
                                            name={`torneio_categoria.${index}.sexo`}
                                            custom
                                            checked={categoria.sexo == "O"}
                                            id={index + "_sexo_O"}
                                            onChange={(evt)=>{
                                                if ( evt.target.checked ) {
                                                    formik.setFieldValue(`torneio_categoria.${index}.sexo`, "O");
                                                }
                                            }}
                                            className={(sexo_invalid ? 'is-invalid' : '')}
                                            />
                                            {sexo_invalid && <label className="invalid-feedback">{formik.errors.torneio_categoria[index].sexo}</label>}
                                        </div>
    
                                        <div className="col-md-12 mb-8">
                                            <label className="form-label">Limite de duplas nesta categoria <span className="text-danger">&nbsp;*</span></label>
                                            <input
                                                type="number"
                                                name={`torneio_categoria.${index}.limite_duplas`}
                                                className={"form-control " + (
                                                    limite_duplas_invalid ? 'is-invalid' : '')}
                                                value={categoria.limite_duplas}
                                                onChange={(evt) => {
                                                    formik.setFieldValue(`torneio_categoria.${index}.limite_duplas`, evt.target.value);
                                                }}
                                            />
                                            {limite_duplas_invalid && <label className="invalid-feedback">{formik.errors.torneio_categoria[index].limite_duplas}</label>}
                                        </div>
    
                                        <div className="col-md-12 mb-8">
                                            <Button 
                                                variant="outlined" 
                                                color="inherit" 
                                                className={classes.button} 
                                                onClick={()=>{
                                                    arrayHelpers.remove(index);
                                                }}>
                                            Excluir
                                            <DeleteIcon className={classes.rightIcon} />
                                            </Button>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                    </div>

                    <div className='row'>
                        <div className='col-12 text-right' style={{padding: 15}}>

                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.buttonAdd}
                                onClick={()=>{
                                    arrayHelpers.push({
                                        categoria_id: "",
                                        nome: "",
                                        sexo: "",
                                        limite_duplas: "",
                                    });
                                }}
                            >
                            Adicionar Categoria
                            <AddIcon className={classes.rightIcon} />
                            </Button>
                        </div>
                    </div>
                </>
                )}
            />
            
        </FormikProvider>
    )
}