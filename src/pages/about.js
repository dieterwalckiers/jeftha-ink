import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    {
      sanityAbout {
        title
        description
      }
    }
  `)

  const [title, description] = useMemo(() => {
    const {
      sanityAbout: { title, description },
    } = data
    return [title, description]
  }, [data])

  return (
    <Layout>
      <SEO title="About" />
      <div className="w-2/3 mx-auto flex flex-col items-center">
        <h1 className="font-light text-gray-700 text-3xl mt-8 mb-12">
          {title}
        </h1>
        <div className="">{description}</div>
      </div>
    </Layout>
  )
}

export default AboutPage
