import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"

const SecondPage = ({ pageContext }) => (
  <>
    <SEO title={pageContext.title} />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </>
)

export const query = graphql`
query {
  sitePageContext(path: {eq: "/page-2/"}) {
    path
    context(title: "Page two") {
      title
    }
  }
}
`

export default SecondPage
