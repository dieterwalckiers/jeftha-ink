import React, { useState, useRef, useEffect, useCallback } from "react"
import Image from "gatsby-image"

const Header = ({ project }) => {
  return (
    <div className="md:hidden">
      <p className="text-3xl m-0 font-thin">{project.title}</p>
      <p className="my-2 text-sm m-0">{project.description}</p>
    </div>
  )
}

const ProjectTile = props => {
  const { project, highlightsStyle } = props
  const wrapperRef = useRef(null)

  const [wrapperStyle, setWrapperStyle] = useState({})
  const [imageStyle, setImageStyle] = useState({})
  const [origDims, setOrigDims] = useState()
  const [hoverEffectActive, setHoverEffectActive] = useState()

  const activateHoverEffect = useCallback(() => {
    setHoverEffectActive(true)
  }, [setHoverEffectActive])

  useEffect(() => {
    setTimeout(activateHoverEffect, 500)
  }, [])

  const startHover = useCallback(() => {
    if (!hoverEffectActive) {
      return
    }
    const {
      clientWidth: currentWidth,
      clientHeight: currentHeight,
    } = wrapperRef.current
    setOrigDims([currentWidth, currentHeight])
    const width = currentWidth * 1.05
    const height = currentHeight * 1.05
    setWrapperStyle({ width: currentWidth, height: currentHeight })
    setImageStyle({
      ...imageStyle,
      top: 0,
      left: 0,
      width: currentWidth,
      height: currentHeight,
    })
    setTimeout(() => {
      setImageStyle({ ...imageStyle, width, height, top: -10, left: -10 })
    }, 0)
  }, [
    hoverEffectActive,
    wrapperRef,
    setOrigDims,
    setWrapperStyle,
    setImageStyle,
    setImageStyle,
    imageStyle,
  ])

  const stopHover = useCallback(() => {
    if (!hoverEffectActive) {
      return
    }
    origDims &&
      setImageStyle({
        ...imageStyle,
        width: origDims[0],
        height: origDims[1],
        top: 0,
        left: 0,
      })
  }, [hoverEffectActive, origDims, setImageStyle, imageStyle])

  return (
    <div
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      ref={wrapperRef}
      style={wrapperStyle}
      className="m-2 md:mb-4 overflow-hidden relative"
    >
      {!highlightsStyle && <Header project={project} />}
      <Image
        fluid={project.mainImage.asset.fluid}
        alt={project.title}
        className="absolute"
        style={{
          ...imageStyle,
          transition: "width 1s, height 1s, top 1s, left 1s",
        }}
      />
    </div>
  )
}

export default ProjectTile
