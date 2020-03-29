import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Datasets from "../components/datasets"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <div>
          <Datasets />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
