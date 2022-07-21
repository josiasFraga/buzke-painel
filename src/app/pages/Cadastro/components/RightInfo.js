import React from 'react';
import { useSelector } from 'react-redux';

export default function RightInfo(props) {
    const coupom = useSelector(state => state.app.coupom);
    const defaultTrialDays = useSelector(state => state.app.default_trial_days);    
    const is_loading_coupom = useSelector(state => state.app.is_loading_coupom);
    
    return (
        <div className="col-xl-4">
            <div className="border-radius-only-right" style={{backgroundColor: '#091D5C', padding: '40px', color: '#FFF',  height: '100%'}}>
            { (Object.keys(coupom).length > 0 && coupom.trial_days == 0) && <>
                <p className="font-size-h2">Por que preciso informar meu cartão de crédito?</p>
                <p className="font-size-h6" style={{opacity: 0.55}}>Por se tratar de um serviço prestado mediante assinatura recorrente, se faz necessária a verificação da autenticidade das informações financeiras.</p>

                <p className="font-size-h6" style={{opacity: 0.55}}>Promoção válida enquanto o plano estiver ativo, caso seja cancelado, a promoção será cancelada automaticamente.</p>

                <p className="font-size-h6" style={{opacity: 0.55}}>O cancelamento é feito quando você quiser dentro do painel, sem a necessidade de ligar para uma central de atendimento.</p>

            </>}
            { ((Object.keys(coupom).length == 0 && !is_loading_coupom) || (Object.keys(coupom).length > 0 && coupom.trial_days > 0)) && <>
                <p className="font-size-h2">Por que preciso informar meu cartão de crédito?</p>
                <p className="font-size-h6" style={{opacity: 0.55}}>Por se tratar de um serviço prestado mediante assinatura recorrente, com a oferta de <strong>teste grátis</strong>, se faz necessária a verificação da autenticidade das informações financeiras.
                </p>

                <p className="font-size-h6" style={{opacity: 0.55}}>Fique tranquilo, <strong>nada será cobrado neste momento</strong>. A cobrança somente ocorrerá após o decurso do período de teste.</p>
                <p className="font-size-h6" style={{opacity: 0.55}}>O cancelamento do período de testes é feito quando você quiser dentro do painel, sem a necessidade de ligar para uma central de atendimento.</p>
            </>}
            </div>
        </div>
    );
}