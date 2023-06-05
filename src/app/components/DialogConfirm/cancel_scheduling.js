import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogConfirmCancelScheduling(props) {

 const setDialogOpen = props.setDialogOpen;
 const open = props.open;

  function handleClose() {
    setDialogOpen(false);
  }

  const handleConfirm = (tipo) => {
    props.actionConfirm(tipo);
    handleClose();
  }

  const message = props.message;

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirme a Ação"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar Ação
          </Button>
          <Button onClick={() => { handleConfirm("") }} color="primary">
            Cancelar este e os outros
          </Button>
          <Button onClick={() => { handleConfirm(1) }} color="primary">
            Cancelar Apenas Este
          </Button>
        </DialogActions>
      </Dialog>
  );
}