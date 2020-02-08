import React from "react"
import { Link } from "gatsby"

// import Layout from "../components/layout"
import SEO from "../components/seo"

const context = {
  title: 'Page two'
}

const SecondPage = () => (
  <>
    <SEO title={context.title} />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </>
)

SecondPage.context = context;

export default SecondPage
