import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import DocNow from "../images/docnow.png"
import Catalog from "../images/catalog.png"
import style from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header>
    <div className={style.docnow}>
      <a href="https://www.docnow.io">
        <img alt="Documenting the Now" title="Documenting the Now" src={DocNow} />
      </a>
    </div>

    <div className={style.catalog}>
      <Link className={style.catalog} to="/">
        <img alt={siteTitle} title={siteTitle} src={Catalog} />
      </Link>
    </div>

    <div className={style.right}>
    </div>

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
