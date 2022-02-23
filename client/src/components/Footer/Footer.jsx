import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

const createdBy = "Diseñado y Creado por: Grupo 7";

function Footer() {
  return (
    <div className="mt-10 fixed bottom-0 w-full h-10 bg-lightSecondary dark:bg-darkSecondary z-50">
      <div className="grid grid-cols-2">
        <h2 className="dark:text-white pl-4 pt-2">{createdBy}</h2>
        <div className="flex place-content-end gap-3 pt-3 pr-6">
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
