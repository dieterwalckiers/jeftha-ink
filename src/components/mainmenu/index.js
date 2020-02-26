import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"

const isGalleryPage = pathname =>
  !["about", "contact", ""].includes(pathname.replace(/\//, ""))

const MenuItem = ({ isActive, value, colors, linkTo }) => {
  const [isHovered, setIsHovered] = useState(false)
  const onMouseEnter = () => {
    setIsHovered(true)
  }
  const onMouseLeave = () => {
    setIsHovered(false)
  }
  const style = useMemo(
    () => ({
      color: colors.primary,
      ...(isActive || isHovered ? { color: colors.accent } : {}),
    }),
    [isActive, isHovered]
  )
  return (
    <Link
      to={linkTo}
      className="menuitem transition duration-500 transition-colors ml-2 mr-2"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </Link>
  )
}

const MainMenu = ({ colors }) => {
  return (
    <Location>
      {({ location: { pathname } }) => {
        return (
          <div>
            <MenuItem
              isActive={pathname === "/"}
              value="Home"
              linkTo="/"
              colors={colors}
            />
            <MenuItem
              isActive={isGalleryPage(pathname)}
              value="Galerij"
              linkTo="/gallery"
              colors={colors}
            />
            <MenuItem
              isActive={pathname === "/about"}
              value="About"
              linkTo="/about"
              colors={colors}
            />
          </div>
        )
      }}
    </Location>
  )
}

export default MainMenu
