/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        backgroundColor {
          hex
        }
        googleFontName
        linkColor {
          hex
        }
      }
    }
  `);

  const { sanitySiteSettings: { backgroundColor, linkColor, googleFontName } } = data;

  const bgColor = backgroundColor ? backgroundColor.hex : "#FFFFFF";
  const lnkColor = linkColor ? linkColor.hex : "#000000";

  const [fontFamily, googleFontLink] = useMemo(() => {
    return googleFontName ? [googleFontName, (
      <link
        href={`https://fonts.googleapis.com/css?family=${googleFontName.replace(/ /, "+")}&display=swap`}
        rel="stylesheet"
      />
    )] : ["Roboto", null]
  }, [googleFontName])

  return (
    <>
      {googleFontLink}
      <style type="text/css">{`body { background-color: ${bgColor};} a { color: ${lnkColor}; }`}</style>
      <div className="container mx-auto pt-2" style={{ fontFamily }}>
        <Header />
        <div>
          <main>{children}</main>
          <footer></footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
