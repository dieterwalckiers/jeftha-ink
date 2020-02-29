import React, { useMemo, useState, useEffect } from "react"
import ProjectTile from "./ProjectTile"
import { byPosition } from "../../helpers"
import { Link } from "gatsby"

const tailwindResolutions = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const Gallery = ({ projects, clickableProjects }) => {

  const [tailwindResolution, setTailwindResolution] = useState();

  useEffect(() => {
    const determine = () => {
      if (window.innerWidth >= tailwindResolutions.xl) { return "xl" }
      if (window.innerWidth >= tailwindResolutions.lg) { return "lg" }
      if (window.innerWidth >= tailwindResolutions.md) { return "md" }
      return "sm";
    }
    setTailwindResolution(determine());
    window.addEventListener("orientationchange", function () {
      setTailwindResolution(determine());
    });
    window.addEventListener("resize", function () {
      setTailwindResolution(determine());
    });
  }, [window, tailwindResolutions, setTailwindResolution]);

  const renderProjectTile = project => {
    const tile = (<ProjectTile key={`gal-tile-${project.id}`} project={project} />)
    return (clickableProjects !== false) ? (
      <Link to={`/${project.slug.current}`} key={`gal-tile-${project.id}`}>
        {tile}
      </Link>
    ) : (
        tile
      )
  }

  const [firstColumn, secondColumn, thirdColumn] = useMemo(() => {
    let i = 0
    const sortedProjects = projects.sort(byPosition)
    if (["lg", "xl"].includes(tailwindResolution)) {
      return sortedProjects.reduce(
        (reduced, { node: project }) => {
          if (i === 0) {
            reduced[0].push(project)
            i++
            return reduced
          }
          if (i === 1) {
            reduced[1].push(project)
            i++
            return reduced
          }
          i = 0
          reduced[2].push(project)
          return reduced
        },
        [[], [], []]
      )
    }
    if (tailwindResolution === "md") {
      return sortedProjects.reduce(
        (reduced, { node: project }, i) => {
          if (i % 2 === 0) {
            reduced[0].push(project)
            return reduced;
          }
          reduced[1].push(project)
          return reduced;
        },
        [[], [], []]);
    }
    return [sortedProjects.map(({ node: project }) => project), [], []]
  }, [projects, tailwindResolution])

  const widthClass = useMemo(() => {
    if (!thirdColumn.length) {
      if (!secondColumn.length) { // 1 column
        return "w-full"
      }
      return "w-full md:w-1/2" // 2 columns
    }
    return "w-full md:w-1/2 lg:w-1/3" // 3 columns
  }, [secondColumn, thirdColumn])

  return (
    <div className="flex flex-wrap">
      <div className={widthClass}>{firstColumn.map(renderProjectTile)}</div>
      {secondColumn.length && (
        <div className={widthClass}>{secondColumn.map(renderProjectTile)}</div>
      )}
      {thirdColumn.length && (
        <div className={widthClass}>{thirdColumn.map(renderProjectTile)}</div>
      )}
    </div>
  )
}

export default Gallery
