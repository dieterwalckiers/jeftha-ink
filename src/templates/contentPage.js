import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortableText from "@sanity/block-content-to-react";
import { useResponsive } from "../hooks/useResponsive";

export const query = graphql`
  query($slug: String) {
    sanityContentPage(slug: { current: { eq: $slug } }) {
      id
      menuName
      _rawContent(resolveReferences: {maxDepth: 5})
      padding
      mobilePadding
      textAlign
    }
  }
`;

const color = props => {
  return (
    <span style={{ color: props.mark.hex }}>
      {props.children}
    </span>
  )
}

export default ({ data }) => {
  const {
    sanityContentPage: { menuName, _rawContent: content, padding, mobilePadding, textAlign },
  } = data;

  console.log("content", content);

  const { md } = useResponsive();

  return (
    <Layout>
      <SEO title={menuName} />
      <div
        className="w-full mx-auto flex flex-col items-center"
        style={{
          textAlign,
          padding: md ? padding : mobilePadding
        }}
      >
        {content && <PortableText blocks={content} serializers={{ marks: { color } }} />}
      </div>
    </Layout>
  )
}
