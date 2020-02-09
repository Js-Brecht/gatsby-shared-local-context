import React from "react"
import { Link, graphql } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ pageContext }) => {
  return <>
    <SEO title={pageContext.title} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </>
}

export const query = graphql`
query {
  sitePageContext(path: {eq: "/"}) {
    path
    context(title: "Home") {
      title
    }
  }
}
`

export default IndexPage