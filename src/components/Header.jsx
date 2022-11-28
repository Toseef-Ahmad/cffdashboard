import React, { useContext } from "react";
import { SectionHead } from "../styles/index";

const Header = (props) => {
  return (
    <SectionHead>
      <h4>Contact Name</h4>
      <div className="tags">
        <div className="links">
          <a className={props.businessActive} href="">
            Business
          </a>
          <a className={props.vehiclesActive} href="">
            Vehicles/Trailers
          </a>
          <a className={props.driversActive} href="">
            Drivers
          </a>
          <a className={props.coverageActive} href="">
            Coverage
          </a>
          <a className={props.documentsActive} href="">
            Documents
          </a>
          <a className={props.agentActive} href="">
            Agent
          </a>
        </div>
        <a className={props.addBtnClass} href="">
          {props.addBtn}
        </a>
      </div>
    </SectionHead>
  );
};

export default Header;
