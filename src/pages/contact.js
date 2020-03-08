import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortableText from "@sanity/block-content-to-react"

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    {
      sanityContact {
        title
        _rawDescription(resolveReferences: {maxDepth: 5})
      }
    }
  `);

  const [title, description] = useMemo(() => {
    const { sanityContact: { title, _rawDescription } } = data;
    return [title, _rawDescription]
  }, [data])

  return (
    <Layout>
      <SEO title="Contact" />
      <div className="w-2/3 mx-auto flex flex-col items-center">
        <h1 className="font-light text-gray-700 text-3xl mt-8 mb-12" >{title}</h1>
        {description && <PortableText blocks={description} />}
      </div>
    </Layout >
  )
}

export default ContactPage
