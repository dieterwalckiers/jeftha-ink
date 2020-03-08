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
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        backgroundColor {
          hex
        }
        googleFontName
      }
    }
  `)
  const bgColor = useMemo(() => {
    const sanityBgColor = data.sanitySiteSettings.backgroundColor
    return sanityBgColor ? sanityBgColor.hex : "#FFFFFF"
  }, [data])

  const [googleFontName, googleFontLink] = useMemo(() => {
    const { googleFontName } = data.sanitySiteSettings
    return googleFontName ? [googleFontName, (
      <link
        href={`https://fonts.googleapis.com/css?family=${googleFontName.replace(/ /,"+")}&display=swap`}
        rel="stylesheet"
      />
    )] : [undefined, null]
  }, [data])

  return (
    <>
      {googleFontLink}
      <style type="text/css">{`body { background-color: ${bgColor};}`}</style>
      <div className="container mx-auto pt-2" style={{ fontFamily: googleFontName || "Roboto" }}>
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
