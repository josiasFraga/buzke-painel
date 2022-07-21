import React, {useMemo, useEffect, useState} from "react";
import objectPath from "object-path";
import {useDispatch, useSelector} from 'react-redux';
// LayoutContext
import {useHtmlClassService} from "../_core/MetronicLayout";
// Import Layout components
import {Header} from "./header/Header";
import {HeaderMobile} from "./header-mobile/HeaderMobile";
import {Aside} from "./aside/Aside";
import {Footer} from "./footer/Footer";
import {LayoutInit} from "./LayoutInit";
import {SubHeader} from "./subheader/SubHeader";
import {QuickPanel} from "./extras/offcanvas/QuickPanel";
import {QuickUser} from "./extras/offcanvas/QuickUser";
import {ScrollTop} from "./extras/ScrollTop";
import {StickyToolbar} from "./extras/StickyToolbar";
import ModalSubscription from "../../../app/components/ModalSubscription";
import ModalSubscriptionReached from "../../../app/components/ModalSubscriptionReached";
import ModalCanceled from "../../../app/components/ModalCanceled";
import ModalUnpaid from "../../../app/components/ModalUnpaid";

export function Layout({ children }) {
    const dispatch = useDispatch();
    const subscription_status = useSelector(state => state.subscription.subscription_status);
    const [isModalSubscriptionOpen, setIsModalSubscriptionModal] = useState(false);
    const [isModalCanceledOpen, setIsModalCanceledOpen] = useState(false);
    const [isModalUnpaidOpen, setIsModalUnpaidOpen] = useState(false);
    const modalSubscription = useSelector(state => state.app.modal_subscription);

    useEffect(() => {
        if (Object.keys(subscription_status).length > 0 && subscription_status.subscription_info == 'trial_expired') {
            setIsModalSubscriptionModal(true);
            setIsModalCanceledOpen(false);
            setIsModalUnpaidOpen(false);
        } else if (Object.keys(subscription_status).length > 0 && ['ok', 'trialing'].includes(subscription_status.subscription_info)) {
            setIsModalSubscriptionModal(false);
            setIsModalCanceledOpen(false);
            setIsModalUnpaidOpen(false);
        } else if (Object.keys(subscription_status).length > 0 && subscription_status.subscription_info == 'canceled') {
            setIsModalCanceledOpen(true);
            setIsModalSubscriptionModal(false);
            setIsModalUnpaidOpen(false);
        } else if (Object.keys(subscription_status).length > 0 && subscription_status.subscription_info == 'unpaid') {
            setIsModalUnpaidOpen(true);
            setIsModalCanceledOpen(false);
            setIsModalSubscriptionModal(false);
        } 
    }, [subscription_status]);

    useEffect(() => {
        dispatch({type: 'LOAD_SUBSCRIPTION_STATUS'});
    }, []);
    
    const uiService = useHtmlClassService();
    // Layout settings (cssClasses/cssAttributes)
    const layoutProps = useMemo(() => {
        return {
            layoutConfig: uiService.config,
            selfLayout: objectPath.get(uiService.config, "self.layout"),
            asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
            subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
            desktopHeaderDisplay: objectPath.get(
                uiService.config,
                "header.self.fixed.desktop"
            ),
            contentCssClasses: uiService.getClasses("content", true),
            contentContainerClasses: uiService.getClasses("content_container", true),
            contentExtended: objectPath.get(uiService.config, "content.extended")
        };
    }, [uiService]);

    return layoutProps.selfLayout !== "blank" ? (
        <>
            <ModalSubscription
                isOpen={isModalSubscriptionOpen}
                close={() => setIsModalSubscriptionModal(false)}
            />
            <ModalSubscriptionReached />
             <ModalCanceled
                isOpen={isModalCanceledOpen}
                close={() => setIsModalCanceledOpen(false)}
            />
            <ModalUnpaid
                isOpen={isModalUnpaidOpen}
                close={() => setIsModalUnpaidOpen(false)}
            />

            {/*begin::Main*/}
            <HeaderMobile/>
            <div className="d-flex flex-column flex-root">
                {/*begin::Page*/}
                <div className="d-flex flex-row flex-column-fluid page">
                    {layoutProps.asideDisplay && (<Aside/>)}
                    {/*begin::Wrapper*/}
                    <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                        <Header/>
                        {/*begin::Content*/}
                        <div
                            id="kt_content"
                            className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
                        >
                            
                            {/*begin::Entry*/}
                            {!layoutProps.contentExtended && (
                                <div className="d-flex flex-column-fluid">
                                    {/*begin::Container*/}
                                    <div className={layoutProps.contentContainerClasses}>
                                        {children}
                                    </div>
                                    {/*end::Container*/}
                                </div>
                            )}

                            {layoutProps.contentExtended && {children}}
                            {/*end::Entry*/}
                        </div>
                        {/*end::Content*/}
                        <Footer/>
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Page*/}
            </div>
            <QuickUser/>
            <QuickPanel/>
            {/*<StickyToolbar/>*/}
            {/*end::Main*/}
            <LayoutInit />
        </>
    ) : (
        // BLANK LAYOUT
        <div className="d-flex flex-column flex-root">{children}</div>
    );
}
