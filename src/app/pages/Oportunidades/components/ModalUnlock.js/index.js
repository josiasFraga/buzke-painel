import React from 'react';

export default function ModalUnlock(props) {
    return (
        <Modal
            show={props.isUnlockModalOpen}
            onHide={() => props.setIsUnlockModalOpen(false)}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
        >
            <Modal.Header style={{padding: '20px 30px 0px 0px', border: 'none'}}>
                <h5 className="modal-title">&nbsp;</h5>
                <button type="button" className="close" onClick={() => props.setIsUnlockModalOpen(false)}>
                    <i aria-hidden="true" className="ki ki-close"></i>
                </button>

            </Modal.Header>
            <Modal.Body>
                <div className="row flex-column" style={{padding: '0px 20px 20px 20px', textAlign: 'center', alignItems: 'center', color: '#293667'}}>
                    <h1>Escolha o plano</h1>
                    <span className="font-size-sm mb-5" style={{width: '60%'}}>This should talk about your product and all features that will include.</span>

                    <div className="d-flex" style={{alignContent: 'space-between'}}>
                        <div className="d-flex flex-column" style={{borderRadius: '11px', alignItems: 'center', padding: '15px'}}>
                            <span className="font-size-h3 azul-cabecalho font-weight-boldest mb-5">STARTER</span>
                            <span className="mb-5 font-size-sm azul-cabecalho" style={{opacity: 0.35}}>This should talk about your product and all .</span>
                            <h1 className="mb-5 font-weight-boldest azul-cabecalho">R$ 10,00</h1>
                            <button type="button" className="btn btn-contratar mb-5" style={{width: '90%'}} onClick={unlock}>CONTRATAR</button>

                        </div>
                        <div className="d-flex flex-column" style={{borderRadius: '11px', backgroundColor: '#F5F7FA', alignItems: 'center', padding: '15px'}}>
                            <span className="font-size-h3 primary font-weight-boldest mb-5">PRO</span>
                            <span className="mb-5 font-size-sm azul-cabecalho" style={{opacity: 0.35}}>This should talk about your product and all .</span>
                            <h1 className="mb-5 font-weight-boldest primary">R$ 10,00</h1>
                            <button type="button" className="btn btn-primary mb-5" style={{width: '90%', color: '#D4D6E0'}} onClick={unlock}>CONTRATAR</button>

                        </div>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );
}