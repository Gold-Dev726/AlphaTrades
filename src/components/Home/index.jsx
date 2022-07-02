import React, { useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import signalIcon from "../../images/signal-icon.svg";

import performanceIcon from "../../images/performance-icon.svg";
import modelsIcon from "../../images/models-icon.svg";
import stakingIcon from "../../images/staking-icon.svg";
import daoIcon from "../../images/dao-icon.svg";
import alertlIcon from "../../images/alerts-icon.svg";
import contactIcon from "../../images/contacts-icon.svg";
import menuOpenIcon from "../../images/menu-open.svg";
import menuCloseIcon from "../../images/menu-close.svg";
import walletIcon from "../../images/wallet-icon.svg";
import hamburgerIcon from "../../images/hamburger.svg";

import { connect, useSelector } from "react-redux";
import "../../styles/_iconmoon.scss";
import _ from "lodash";
import { fetchProfileDetails } from "./../../actions/authenticationAction";
import authenticationService from "../../services/authenticationService";
import useWindowDimensions from "../../Hooks/useWindowDimensions";

import { useTranslation } from "react-i18next";
import i18n from "./../../translations/i18n";
import storage from "../../services/storage";
import { ROLE } from "../../constants/appConstant";
import DisplayErrorModal from "./../../components/common/DisplayErrorModal/DisplayErrorModal";

const Home = (props) => {
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    console.log("useEffect - ");
  }, []);

  console.log("height, width - ", height, width);

  const [open, setOpen] = useState(width < 1600 ? false : true);
  const [language, setLanguage] = useState(
    sessionStorage.getItem("selectedLanguage")
      ? sessionStorage.getItem("selectedLanguage")
      : "english"
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();

  const handleDrawer = () => {
    console.log("handleDrawer clicked");
    setOpen(!open);
  };

  const handleSidebarItemClick = () => {
    storage.remove("activeTab");
  };

  const { uiloading, isNavOpen, errorModalloading } = props;
  return (
    <>
      {/* {errorModalloading && <DisplayErrorModal />} */}
      <section className="site-wapper">
        <span onClick={handleDrawer} className="icn-img hamberguermenu">
          <img src={hamburgerIcon} alt="logo" className="on-open" />
        </span>

        <nav className={`site-nav ${open === true ? "open" : "close"}`}>
          <div className="inner-nav">
            <div className="company-logo">
              <div className="pic">
                <img src={logo} alt="logo" className="on-open" />
              </div>
            </div>

            <ul className="menu-list">
              <li>
                <NavLink
                  to="/?"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return isActive;
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={signalIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">Signals</span>
                  </button>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/models"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return isActive || location.pathname.includes("/models");
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={modelsIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">Models</span>
                  </button>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/performance"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return (
                      isActive || location.pathname.includes("/performance")
                    );
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img
                        src={performanceIcon}
                        alt="logo"
                        className="on-open"
                      />
                    </span>
                    <span className="text">Performance</span>
                  </button>
                </NavLink>
              </li>

              <li>
                {/* <NavLink
                  to="/investor"
                  exact
                  // isActive={(match, location) => {
                  //   let isActive = false;
                  //   if (match !== null) {
                  //     isActive = match.isExact;
                  //   }
                  //   return isActive || location.pathname.includes("/income");
                  // }}
                > */}
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={stakingIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">Investor</span>
                  </button>
                {/* </NavLink> */}
                <li style={{ marginLeft: 32 }}>
                  <NavLink
                    to="/income"
                    exact
                    isActive={(match, location) => {
                      let isActive = false;
                      if (match !== null) {
                        isActive = match.isExact;
                      }
                      return isActive || location.pathname.includes("/income");
                    }}
                  >
                    <button onClick={handleSidebarItemClick}>
                      <span className="text">Income</span>
                    </button>
                  </NavLink>
                </li>
                <li style={{ marginLeft: 32 }}>
                  <NavLink
                    to="/staking"
                    exact
                    isActive={(match, location) => {
                      let isActive = false;
                      if (match !== null) {
                        isActive = match.isExact;
                      }
                      return isActive || location.pathname.includes("/staking");
                    }}
                  >
                    <button onClick={handleSidebarItemClick}>
                      <span className="text">Staking</span>
                    </button>
                  </NavLink>
                </li>
                <li style={{ marginLeft: 32 }}>
                  <NavLink
                    to="/dao"
                    exact
                    isActive={(match, location) => {
                      let isActive = false;
                      if (match !== null) {
                        isActive = match.isExact;
                      }
                      return isActive || location.pathname.includes("/dao");
                    }}
                  >
                    <button onClick={handleSidebarItemClick}>
                      <span className="text">DAO</span>
                    </button>
                  </NavLink>
                </li>
              </li>

              {/* <li>
                <NavLink
                  to="/staking"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return isActive || location.pathname.includes("/staking");
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={stakingIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">Staking</span>
                  </button>
                </NavLink>
              </li>

              <li style={{ position: "relative" }}>
                <NavLink
                  to="/dao"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return isActive || location.pathname.includes("/dao");
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={daoIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">DAO</span>
                  </button>
                </NavLink>

                <div className="menu-open-close" onClick={handleDrawer}>
                  <img
                    src={open ? menuCloseIcon : menuOpenIcon}
                    alt="logo"
                    className="on-open"
                  />
                </div>
              </li> */}

              <li>
                <NavLink
                  to="/alerts"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return isActive || location.pathname.includes("/alerts");
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={alertlIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">Alerts</span>
                  </button>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  exact
                  isActive={(match, location) => {
                    let isActive = false;
                    if (match !== null) {
                      isActive = match.isExact;
                    }
                    return isActive || location.pathname.includes("/profile");
                  }}
                >
                  <button onClick={handleSidebarItemClick}>
                    <span className="icn-img">
                      <img src={contactIcon} alt="logo" className="on-open" />
                    </span>
                    <span className="text">Contact</span>
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="connect">
            <img src={walletIcon} alt="logo" className="wallet-icon on-open" />
            <div className="connect-text">Connect Wallet</div>
          </div>
        </nav>

        <main className="site-content">
          {uiloading && <div className="loader-spin"></div>}
          {props.children}
        </main>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    uiloading: state.ui && state.ui.uiloading,
    profile: state.profile,
    isNavOpen: state.ui && state.ui.isNavOpen,
    errorModalloading: _.get(state, ["errorReducer", "errorModalloading"])
  };
};

export default connect(mapStateToProps, {})(Home);
