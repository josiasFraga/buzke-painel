import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import BlockUi from 'react-block-ui';
import ModalViewOpportunity from '../../../../app/components/ModalViewOpportunity';
import FloatToCurrency from '../../../../app/helpers/FloatToCurrency';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ButtonUnlock = styled.button`
    height: 40px;
    color: #FFF;
    background-color: #091D5C;
    font-size: 14px;
    letter-spacing: -0.02em;
    font-weight: bold;

    :hover {
        opacity: 0.6;
    }
`;

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

export function CarouselOpportunities(props) {

    const [opportunity, setOpportunity] = useState({});
    const dispatch = useDispatch();
    const opportunities = useSelector(state => state.app.opportunities);
    const is_opportunities_loading = useSelector(state => state.app.is_opportunities_loading);
    const [isModalViewOpportunityOpen, setIsModalViewOpportunityOpen] = useState(false);
    const opportunityTypes = 'lockeds';

    const view = (opportunity) => {
        setIsModalViewOpportunityOpen(true);
        setOpportunity(opportunity);
    }

    const unlock = (id) => {
        if (!window.confirm("Deseja realmente desbloquear esta oportunidade?")) {
            return;
        }
        dispatch({
            type: 'UNLOCK_OPPORTUNITY', payload: {
                submitValues: {
                    id: id
                },
                callback: () => {
                    //setIsUnlockModalOpen(false);
                    dispatch({ type: 'LOAD_OPPORTUNITIES' });
                }
            }
        });
    }

    useEffect(() => {
        dispatch({ type: 'LOAD_OPPORTUNITIES' });
    }, []);

    return (
        <>
            <ModalViewOpportunity opportunity={opportunity} isOpen={isModalViewOpportunityOpen} close={() => setIsModalViewOpportunityOpen(false)} />
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={100000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                //itemClass="carousel-item-padding-40-px"
            >
                
            {opportunities.filter(opportunity => opportunity.unlocked == (opportunityTypes == 'unlockeds')).map(item => (


                <div style={{
                    width: `100%`, 
                    height: `100%`, 
                    //backgroundColor: '#f7f7f7', 
                    borderRadius: 10, 
                    paddingBottom: 10,
                    paddingTop: 10
                }}>
                    <div style={{
                        display: `flex`,
                        justifyContent: `space-between`,
                        flexDirection: `column`,
                        height: `100%`,
                    }}
                    >
                        <div>
                            <h2 class="azul-cabecalho">{item.name.toUpperCase()} <small style={{color: 'rgb(65, 199, 143)', fontSize: `10px`}}>{item.state}</small></h2>
                            <p style={{opacity: 0.6}}>{item.type}</p>
                        </div>

                        { item.amount > 0 &&
                        <div style={{flex: 1, paddingBottom: 10}}>
                            <p style={{marginBottom: '1px', opacity: 0.6, fontWeight: 600 }}>VALOR CONTRATADO</p>
                            <p style={{fontSize: '36px', letterSpacing: '-0.04em', fontWeight: 'bold', color: '#41c78f', marginTop: '-10px'}}>
                                R$ {FloatToCurrency(item.amount)}
                            </p>
                        </div>
                        }

                        { item.question != '' && item.question != null &&
                            <div style={{flex: 1, paddingBottom: 10}}>
                                <p>
                                    {item.question.substring(0, 350)}...
                                </p>
                            </div>
                        }
                    
                        <div style={{ alignItems: `flex-end`, display: `flex`, justifyContent: `space-between` }}>
                        <div>
                            <div>
                                <p className="tipo-campo">TELEFONE</p>
                                <p className="campo">{item.phone}</p>
                            </div>
                            <div>
                                <p className="tipo-campo">INTERESSES</p>
                                <p className="campo">{item.orders}</p>
                            </div>
                        </div>
                        {!item.unlocked &&
                            <ButtonUnlock className="btn btnDefault unlock" onClick={() => unlock(item.id)}>DESBLOQUEAR</ButtonUnlock>
                        }
                        </div>

                    </div>

                </div>
            ))}
            </Carousel>
        </>

    );
}