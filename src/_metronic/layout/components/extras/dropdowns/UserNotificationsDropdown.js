/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Nav, Tab, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import { Badge } from '@material-ui/core';
import { Icon } from '@material-ui/core';

import ModalNotification from '../../../../../app/components/ModalNotification';
import clsx from 'clsx';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function UserNotificationsDropdown() {
  const dispatch = useDispatch();

  const notifications = useSelector(state => state.app.notifications);
  const not_read = useSelector(state => state.app.notifications_not_read);
  const [isModalNotificationOpen, setIsModalNotificationOpen] = useState(false);
  const [notificationToView, setNotificationToView] = useState(false);
  
  const [showPulse, setShowPulse] = useState(false);

  const [key, setKey] = useState("Notifications");
  const bgImage = toAbsoluteUrl("/media/misc/bg-1.jpg");

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.notifications.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  useEffect(() => {

    /*dispatch({
        type: 'LOAD_NOTIFICATIONS',
        payload: {}
    });*/

  }, []);

  const _setNotificationRead = (notification_id) => {
    
    dispatch({
      type: 'SET_NOTIFICATIONS_READ',
      payload: {
        id: notification_id
      }
    });

    setTimeout(()=>{

      dispatch({
          type: 'LOAD_NOTIFICATIONS',
          payload: {}
      });

    },2000);
  }

  const openNotification = (notification) => {

    if ( notification.notification_link == '' || notification.notification_link == null ) {
      setNotificationToView(notification);
      setIsModalNotificationOpen(true);
    } else {
      window.open(notification.notification_link, '_blank', 'noopener,noreferrer');
    }

    _setNotificationRead(notification.id);

  }

  useEffect(() => {

    if ( notifications.length > 0 ) {
      let notifications_new = notifications.filter(notification => {
        return !notification.read;
      });
      
      if ( notifications_new.length > 0 ) {
        setShowPulse(true);
      } else {
        setShowPulse(false);
      }

    } else {
      setShowPulse(false);
    }

  }, [notifications]);

  return (
    <>
      <ModalNotification notification={notificationToView} isOpen={isModalNotificationOpen} close={() => setIsModalNotificationOpen(false)} />

      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div
            className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"
            id="kt_quick_notifications_toggle"
          >
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Compiling.svg")} />
            </span>
            <span className="pulse-ring"></span>
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight 
        onClick={()=>{
          //_setNotificationRead();
        }}>
          <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="kt_quick_notifications_toggle"
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="user-notification-tooltip">
                  Notificações
                </Tooltip>
              }
            >
              <div
                className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"
                id="kt_quick_notifications_toggle"
              >
                  <Badge badgeContent={not_read} color="secondary">
                  <Icon className={'fa fa-bell'} color="primary" />
                  </Badge>
                  {showPulse && <>
                    <span className="pulse-ring"></span>
                    <span className="pulse-ring" />
                  </>}
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <div
                className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <h4 className="d-flex flex-center rounded-top">
                  <span className="text-white">Notificações</span>
                  <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                    {not_read} nova(s)
                  </span>
                </h4>

                <Tab.Container defaultActiveKey={key}>
                  <Nav
                    as="ul"
                    className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                    onSelect={(_key) => setKey(_key)}
                  >
                    <Nav.Item className="nav-item" as="li">
                      <Nav.Link
                        eventKey="Notifications"
                        className={`nav-link show ${
                          key === "Notifications" ? "active" : ""
                        }`}
                      >
                        Notificações
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="tab-content">
                    <Tab.Pane
                      eventKey="Notifications"
                      id="topbar_notifications_events"
                    >
                      <PerfectScrollbar
                        options={perfectScrollbarOptions}
                        className="navi navi-hover scroll my-4"
                        style={{ maxHeight: "300px", position: "relative" }}
                      >
                        {notifications.map((el, index) => {
                          return (
                            <a href="#" onClick={(ev)=>{ ev.preventDefault(); openNotification(el) }} className="navi-item" key={'notification_' + index}>
                              <div className={"navi-link" + (el.read === false ? ' active' : '')}>
                                {1 == 2 && <div className="navi-icon mr-2">
                                  <i className="flaticon2-line-chart text-success"></i>
                                </div>}
                                <div className="navi-text">
                                  <div className="font-weight-bold">
                                     {el.notification_title}
                                  </div>
                                  <div className="text-muted">{el.data}</div>
                                </div>
                              </div>
                            </a>
                          )
                        })}

                      </PerfectScrollbar>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Logs" id="topbar_notifications_logs">
                      <div className="d-flex flex-center text-center text-muted min-h-200px">
                        All caught up!
                        <br />
                        No new notifications.
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
