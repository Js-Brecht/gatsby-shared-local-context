import React from "react"
import { graphql } from 'gatsby';

import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

export const query = graphql`
query {
  sitePageContext(path: {eq: "/404/"}) {
    path
    context(title: "404") {
      title
    }
  }
}
`

export default NotFoundPage
