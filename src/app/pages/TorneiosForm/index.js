import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import {useFormik} from 'formik';
import { BsCheck2Circle } from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonBackToTournament: {
    marginRight: theme.spacing(1),
    marginTop: 20
  },
  instructions_title: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 30
  },
  instructions: {
    fontSize: 16
  },
  connectorActive: {
    '& $connectorLine': {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
}));

function getSteps() {
  return ['Dados Básicos', 'Categorias', 'Quadras'];
}

function getStepContent(step, formik) {
  switch (step) {
    case 0:
      return <StepOne formik={formik} />;
    case 1:
        return <StepTwo formik={formik} />;
    case 2:
        return <StepThree formik={formik} />;
    default:
      return 'Unknown step';
  }
}

export function TorneiosForm() {

  const dispatch = useDispatch();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  let history = useHistory();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  const initialState = {
      nome: "",
      descricao: "",
      inicio: "",
      fim: "",
      inscricoes_de: "",
      inscricoes_ate: "",
      impedimentos: "",
      max_inscricoes_por_jogador: 1,
      valor_inscricao: "",
      torneio_categoria: [
        {
            categoria_id: "",
            nome: "",
            sexo: "",
            n_chaves: "",
            n_duplas_p_chave: "",
            limite_duplas: "",
        }
      ],
      torneio_quadras: [
        {
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
        }
      ]
  };

  const initialStateTeste = {
      nome: "nome",
      descricao: "descrição",
      inicio: "2022-12-25",
      fim: "2023-01-01",
      inscricoes_de: "2022-12-25",
      inscricoes_ate: "2022-12-27",
      impedimentos: "1",
      max_inscricoes_por_jogador: 1,
      valor_inscricao: "50",
      torneio_categoria: [
        {
            categoria_id: "1",
            nome: "",
            sexo: "F",
            n_chaves: "5",
            n_duplas_p_chave: "3",
            limite_duplas: "20",
        }
      ],
      torneio_quadras: [
        {
            quadra_id: "5",
            nome: "",
            quadra_periodos: [
                {
                    data: "",
                    das: "",
                    ate_as: "",
                    duracao: ""
                }
            ],
        }
      ]
  };

  let validations = [];

  validations.push(
    yup.object().shape({
        nome: yup
        .string()
        .required(),
        descricao: yup
        .string()
        .required(),
        inicio: yup
        .string()
        .required(),
        fim: yup
        .string()
        .required(),
        inscricoes_de: yup
        .string()
        .required('Obrigatório'),
        inscricoes_ate: yup
        .string()
        .required('Obrigatório'),
        impedimentos: yup
        .number()
        .nullable(),
        max_inscricoes_por_jogador: yup
        .number()
        .required('Obrigatório'),
        valor_inscricao: yup
        .string()
        .required('Obrigatório'),
    })
  );

  validations.push(
    yup.object().shape({
        torneio_categoria: yup
        .array()
        .of(
        yup.object().shape({
            categoria_id: yup.number().required('Obrigatório'),
            nome: yup
            .string()
            .when("categoria_id", {
                is: (categoria_id) => {
                return categoria_id == 0;
                },
                then: yup.string().required("Obrigatório")
            }),
            sexo: yup.string().required('Obrigatório'),
            limite_duplas: yup.number().required('Obrigatório'),
            n_chaves: yup.number().required('Obrigatório'),
            n_duplas_p_chave: yup.number().required('Obrigatório'),
        })
        )
        .min(1, 'Você deve adicionar, pelo menos, uma categoria!'),
    })
  )

  validations.push(
    yup.object().shape({
        torneio_quadras: yup
        .array()
        .of(
          yup.object().shape({
            quadra_id: yup.number().required('Obrigatório'),
            nome: yup
            .string()
            .when("quadra_id", {
                is: (quadra_id) => {
                  return quadra_id == 0;
                },
                then: yup.string().required("Obrigatório")
            }),
            quadra_periodos: yup
            .array()
            .of(
              yup.object().shape({
                data: yup.string().required('Obrigatório'),
                das: yup.string().required('Obrigatório'),
                ate_as: yup.string().required('Obrigatório'),
                duracao: yup.string().required('Obrigatório'),
              })

            )
            .min(1, 'Você deve adicionar, pelo menos, uma período de jogos para esta quadra!'),
          })
        )
        .min(1, 'Você deve adicionar, pelo menos, uma quadra!')
      })
  );

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: initialState,
      onSubmit: (values, {setSubmitting, resetForm}) => {

            if ( (activeStep + 1) < steps.length ) {
                handleNext();
                return false;
            }

            try {
                dispatch({type: 'SAVE_TOURNAMENT', payload: {
                    submitValues: {
                        ...values,
                        //id: clienteId
                    },
                    setSubmitting,
                    callback: () => {
                            handleNext();
                            resetForm({
                                values: initialState,
                            });
                    }
                }});
                
            } catch(e) {
                console.log(e);
            }
      },

      validationSchema: validations[activeStep]
  });

  const connector = (
    <StepConnector
      classes={{
        active: classes.connectorActive,
        completed: classes.connectorCompleted,
        disabled: classes.connectorDisabled,
        line: classes.connectorLine,
      }}
    />
  );

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={connector}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{backgroundColor: "white", padding: 15}} className="text-center">
            <BsCheck2Circle size={100} color="#93e983" />
            <Typography className={classes.instructions_title}>
              Tudo Certo!
            </Typography>
            <Typography className={classes.instructions}>
              O torneio foi cadastrado com sucesso, <br /> vá no aplicativo buzke para prosseguir com as próximas etapas
            </Typography>
            <Button onClick={()=>{history.push("/torneios")}} className={classes.buttonBackToTournament}>
              Ir aos Torneios
            </Button>
          </div>
        ) : (
          <div style={{backgroundColor: "white", padding: 15}}>
            {getStepContent(activeStep, formik)}
            <div className='text-right mt-8'>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Voltar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={formik.handleSubmit}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}