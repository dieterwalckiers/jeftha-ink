import React from "react"
import Gallery from "../components/gallery"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const GalleryPage = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityProject {
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
  `)
  console.log("gallery projects", data);
  return (
    <Layout>
      <SEO title="Galerij" />
      <Gallery projects={data.allSanityProject.edges} />
    </Layout>
  )
}

export default GalleryPage
