import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"

import SEO from "../components/seo"
import Datasets from "../components/datasets"
import style from "./index.module.css"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <div className={style.summary}>
          The DocNow Catalog is a collectively contributed listing of Twitter datasets. Public datasets are shared as Tweet IDs, which can be hydrated back into full datasets using our <a href="https://github.com/docnow/hydrator#readme">Hydrator</a> desktop application.
        </div>
        <Datasets />
      </Layout>
    )
  }
}

export default IndexPage