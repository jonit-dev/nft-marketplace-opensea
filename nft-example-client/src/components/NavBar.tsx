import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { uiColors } from "../constants/colors";
import { userStore } from "../store/user.store";
import { IUser } from "../types/user.types";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";

interface IProps {}

export const NavBar: React.FC<IProps> = (props) => {
  const { authenticate, isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (user) {
      userStore.setUser(user.attributes as unknown as IUser);
    }
  }, [isAuthenticated, user]);

  return (
    <NavBarContainer
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <Brand>
        <TextLogo>
          <Link to="/">NFT MarketPlace</Link>
        </TextLogo>
      </Brand>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {/* <Link to="/mint" className="navbar-item">
            Mint
          </Link> */}
          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div> */}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {!isAuthenticated ? (
              <Login authenticate={authenticate} />
            ) : (
              <Logout />
            )}
          </div>
        </div>
      </div>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.nav`
  background-color: ${uiColors.primary} !important;
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextLogo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-left: 1rem;
  margin-right: 1rem;
`;
