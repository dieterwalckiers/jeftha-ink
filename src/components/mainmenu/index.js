import React, { useState, useMemo } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"

const isGalleryPage = (pathname, contentPageSlugs) =>
  !["about", "contact", ""].includes(pathname.replace(/\//, "")) &&
  !contentPageSlugs.includes(pathname.replace(/\//, ""));

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
    [isActive, isHovered, colors]
  )
  return (
    <Link
      to={linkTo}
      className="menuitem duration-500 transition-colors ml-2 mr-2"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </Link>
  )
}

const MainMenu = ({ colors, menuItemNames }) => {
  const homeLbl = (menuItemNames && menuItemNames.home) || "Home"
  const galleryLbl = (menuItemNames && menuItemNames.gallery) || "Galerij"
  const aboutLbl = (menuItemNames && menuItemNames.about) || "About"
  const contactLbl = (menuItemNames && menuItemNames.contact) || "Contact"

  const data = useStaticQuery(graphql`
    {
      allSanityContentPage {
        nodes {
          menuName
          slug {
            current
          }
        }
      }
    }
  `);

  const contentPagesInfos = useMemo(() => {
    const {
      allSanityContentPage: { nodes },
    } = data;
    return nodes.map(({ menuName, slug: { current } }) => ({ menuName, currentSlug: current }));
  }, [data]);

  return (
    <Location>
      {({ location: { pathname } }) => {
        return (
          <div>
            <MenuItem
              isActive={pathname === "/"}
              value={homeLbl}
              linkTo="/"
              colors={colors}
            />
            <MenuItem
              isActive={isGalleryPage(pathname, contentPagesInfos.map(({ currentSlug }) => currentSlug))}
              value={galleryLbl}
              linkTo="/gallery"
              colors={colors}
            />
            {contentPagesInfos.map(page => (
              <MenuItem
                key={`cp${page.currentSlug}`}
                isActive={pathname === `/${page.currentSlug}`}
                value={page.menuName}
                linkTo={`/${page.currentSlug}`}
                colors={colors}
              />
            ))}
            <MenuItem
              isActive={pathname === "/about"}
              value={aboutLbl}
              linkTo="/about"
              colors={colors}
            />
            <MenuItem
              isActive={pathname === "/contact"}
              value={contactLbl}
              linkTo="/contact"
              colors={colors}
            />
          </div>
        )
      }}
    </Location>
  )
}

export default MainMenu
