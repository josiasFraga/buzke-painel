import React from 'react';
import PickerMinhasQuadras from '../../../components/Forms/Components/Pickers/MinhasQuadras';
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
    buttonAdd2: {
      //margin: theme.spacing(1),
        width: "100%",
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

export function StepThree(props) {

    const formik = props.formik;
    const classes = useStyles();

    return (
        <FormikProvider value={formik}>
            <FieldArray
                name="torneio_quadras"
                render={arrayHelpers => (
                <>
                    <div className='row'>
                {
                    formik.values.torneio_quadras.map((quadra, index)=>{

                        const quadra_id_invalid = formik.errors.torneio_quadras && 
                        formik.errors.torneio_quadras[index] &&
                        formik.errors.torneio_quadras[index].quadra_id && 
                        formik.touched.torneio_quadras && 
                        formik.touched.torneio_quadras[index] &&
                        formik.touched.torneio_quadras[index].quadra_id;
            
                        const nome_invalid = formik.errors.torneio_quadras && 
                        formik.errors.torneio_quadras[index] &&
                        formik.errors.torneio_quadras[index].nome && 
                        formik.touched.torneio_quadras && 
                        formik.touched.torneio_quadras[index] &&
                        formik.touched.torneio_quadras[index].nome;
    
                        const quadra_periodo_invalid = formik.errors.torneio_quadras && 
                        formik.errors.torneio_quadras[index] &&
                        formik.errors.torneio_quadras[index].quadra_periodos && 
                        formik.touched.torneio_quadras && 
                        formik.touched.torneio_quadras[index] &&
                        formik.touched.torneio_quadras[index].quadra_periodos;
                        return (
                            <div key={index}  className='col-md-4'>
                                <div style={{border: "1px solid #f7f7f7", borderRadius: 5, padding:15}}>
                                    <h4 className='mb-4'>Quadra {index+1}</h4>
                                    <div className='row'>
    
                                        <div className='col-12 mb-8'>
                                            <PickerMinhasQuadras 
                                                name={`torneio_quadras.${index}.quadra_id`} 
                                                formik={formik} 
                                                showExtra={true} 
                                                field_invalid={quadra_id_invalid}
                                            />
                                            {quadra_id_invalid && <label className="invalid-feedback">{formik.errors.torneio_quadras[index].quadra_id}</label>}
                                        </div>
    
                                        { quadra.quadra_id == "0" ? 
                                        <div className="col-md-12 mb-8">
                                            <label className="form-label">Nome da Quadra <span className="text-danger">&nbsp;*</span></label>
                                            <input
                                                type="text"
                                                name={`torneio_quadras.${index}.nome`}
                                                className={"form-control " + (nome_invalid ? 'is-invalid' : '')}
                                                value={quadra.nome}
                                                onChange={(evt) => {
                                                    formik.setFieldValue(`torneio_quadras.${index}.nome`, evt.target.value);
                                                }}
                                            />
                                            {nome_invalid && <label className="invalid-feedback">{formik.errors.torneio_quadras[index].nome}</label>}
                                        </div>
                                        : null}

                                        <FieldArray
                                            name={`torneio_quadras.${index}.quadra_periodos`}
                                            render={arrayHelpers => (
                                            <>
                                            <div className='col-md-12'>
                                                <h5 className='mb-4 text-center'>Períodos</h5>
                                                <div className='row'>
                                            {
                                                formik.values.torneio_quadras[index].quadra_periodos.map((periodo, index_periodo)=>{
                                                    //console.log(quadra);
                                                    const data_invalid = formik.errors.torneio_quadras && 
                                                    formik.errors.torneio_quadras[index] &&
                                                    formik.errors.torneio_quadras[index].quadra_periodos && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].data && 
                                                    formik.touched.torneio_quadras && 
                                                    formik.touched.torneio_quadras[index] &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo].data;

                                                    const das_invalid = formik.errors.torneio_quadras && 
                                                    formik.errors.torneio_quadras[index] &&
                                                    formik.errors.torneio_quadras[index].quadra_periodos && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].das && 
                                                    formik.touched.torneio_quadras && 
                                                    formik.touched.torneio_quadras[index] &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo].das;

                                                    const ate_as_invalid = formik.errors.torneio_quadras && 
                                                    formik.errors.torneio_quadras[index] &&
                                                    formik.errors.torneio_quadras[index].quadra_periodos && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].ate_as && 
                                                    formik.touched.torneio_quadras && 
                                                    formik.touched.torneio_quadras[index] &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo].ate_as;

                                                    const duracao_invalid = formik.errors.torneio_quadras && 
                                                    formik.errors.torneio_quadras[index] &&
                                                    formik.errors.torneio_quadras[index].quadra_periodos && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].duracao && 
                                                    formik.touched.torneio_quadras && 
                                                    formik.touched.torneio_quadras[index] &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos &&
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo] && 
                                                    formik.touched.torneio_quadras[index].quadra_periodos[index_periodo].duracao;

                                                    return (
                                                        <div key={index}  className='col-md-12 mb-4'>
                                                            <div style={{border: "1px solid #f7f7f7", borderRadius: 5, padding:15, backgroundColor: "#f7f7f7"}}>
                                                                <div className='row'>

                                                                    <div className="col-md-12 mb-4">
                                                                        <label className="form-label">Data <span className="text-danger">&nbsp;*</span></label>
                                                                        <input
                                                                            type="date"
                                                                            min={new Date().toISOString().split('T')[0]}
                                                                            name={`torneio_quadras.${index}.quadra_periodos.${index_periodo}.data`}
                                                                            className={"form-control " + (data_invalid ? 'is-invalid' : '')}
                                                                            value={periodo.data}
                                                                            onChange={(evt) => {
                                                                                formik.setFieldValue(`torneio_quadras.${index}.quadra_periodos.${index_periodo}.data`, evt.target.value);
                                                                            }}
                                                                        />
                                                                        {data_invalid && <label className="invalid-feedback">{formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].data}</label>}
                                                                    </div>

                                                                    <div className="col-md-12 mb-4">
                                                                        <label className="form-label">Das <span className="text-danger">&nbsp;*</span></label>
                                                                        <input
                                                                            type="time"
                                                                            name={`torneio_quadras.${index}.quadra_periodos.${index_periodo}.das`}
                                                                            className={"form-control " + (das_invalid ? 'is-invalid' : '')}
                                                                            value={periodo.das}
                                                                            onChange={(evt) => {
                                                                                formik.setFieldValue(`torneio_quadras.${index}.quadra_periodos.${index_periodo}.das`, evt.target.value);
                                                                            }}
                                                                        />
                                                                        {das_invalid && <label className="invalid-feedback">{formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].das}</label>}
                                                                    </div>

                                                                    <div className="col-md-12 mb-4">
                                                                        <label className="form-label">Até as <span className="text-danger">&nbsp;*</span></label>
                                                                        <input
                                                                            type="time"
                                                                            name={`torneio_quadras.${index}.quadra_periodos.${index_periodo}.ate_as`}
                                                                            className={"form-control " + (ate_as_invalid ? 'is-invalid' : '')}
                                                                            value={periodo.ate_as}
                                                                            onChange={(evt) => {
                                                                                formik.setFieldValue(`torneio_quadras.${index}.quadra_periodos.${index_periodo}.ate_as`, evt.target.value);
                                                                            }}
                                                                        />
                                                                        {ate_as_invalid && <label className="invalid-feedback">{formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].ate_as}</label>}
                                                                    </div>

                                                                    <div className="col-md-12 mb-4">
                                                                        <label className="form-label">Duração dos Jogos <span className="text-danger">&nbsp;*</span></label>
                                                                        <input
                                                                            type="time"
                                                                            name={`torneio_quadras.${index}.quadra_periodos.${index_periodo}.duracao`}
                                                                            className={"form-control " + (duracao_invalid ? 'is-invalid' : '')}
                                                                            value={periodo.duracao}
                                                                            onChange={(evt) => {
                                                                                formik.setFieldValue(`torneio_quadras.${index}.quadra_periodos.${index_periodo}.duracao`, evt.target.value);
                                                                            }}
                                                                        />
                                                                        {duracao_invalid && <label className="invalid-feedback">{formik.errors.torneio_quadras[index].quadra_periodos[index_periodo].duracao}</label>}
                                                                    </div>

                                                                    <div className="col-md-12 mb-8">
                                                                        <Button 
                                                                            variant="outlined" 
                                                                            color="inherit" 
                                                                            className={classes.button} 
                                                                            onClick={()=>{
                                                                                arrayHelpers.remove(index_periodo);
                                                                            }}>
                                                                        Excluir Período
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
                                                    <div className='col-12' style={{padding: 15}}>
                            
                                                        <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            className={classes.buttonAdd2}
                                                            onClick={()=>{
                                                                arrayHelpers.push({
                                                                    data: "",
                                                                    das: "",
                                                                    ate_as: "",
                                                                    periodo: "",
                                                                });
                                                            }}
                                                        >
                                                        Adicionar Período
                                                        <AddIcon className={classes.rightIcon} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                            )}
                                        />
    
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
                                        quadra_id: "",
                                        nome: "",
                                        quadra_periodos: [
                                            {
                                                data: "",
                                                das: "",
                                                ate_as: "",
                                                duracao: ""
                                            }
                                        ],
                                    });
                                }}
                            >
                            Adicionar Quadra
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