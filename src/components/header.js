import React, { useMemo } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import MainMenu from "../components/mainmenu"

const Header = () => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        logo {
          asset {
            fluid {
              ...GatsbySanityImageFluid_noBase64
            }
          }
        }
        menuAccentColor {
          hex
        }
        menuPrimaryColor {
          hex
        }
      }
    }
  `);

  const menuColors = useMemo(() => {
      return {
          primary: data.sanitySiteSettings.menuPrimaryColor.hex,
          accent: data.sanitySiteSettings.menuAccentColor.hex,
      }
  }, [data]);

  return (
    <header className="w-full flex justify-center mt-6 mb-6 flex-col items-center">
      <Link to="/">
        <Image
          className="w-48"
          fluid={data.sanitySiteSettings.logo.asset.fluid}
          alt="jeftha.ink"
        />
      </Link>
      <MainMenu colors={menuColors} />
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
