import React from "react"
import Gallery from "../components/gallery"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityProject(filter: { isHighlighted: { eq: true } }) {
        edges {
          node {
            slug {
              current
            }
            description
            id
            title
            position
            mainImage {
              asset {
                fluid {
                  ...GatsbySanityImageFluid
                }
              }
            }
            isHighlighted
          }
        }
      }
    }
  `);
  console.log("home projects", data);
  return (
    <Layout>
      <SEO title="Home" />
      <Gallery projects={data.allSanityProject.edges} highlightsStyle={true} />
    </Layout>
  )
}
export default IndexPage
