import React, { useMemo } from "react"
import ProjectTile from "./ProjectTile"
import { byPosition } from "../../helpers"
import { Link } from "gatsby"

const Gallery = ({ projects, clickableProjects }) => {
  const renderProjectTile = project => {
    const tile = (<ProjectTile project={project} />)
    return (clickableProjects !== false) ? (
      <Link to={`/${project.slug.current}`} key={`gal-lnk-${project.id}`}>
        {tile}
      </Link>
    ) : (
      tile
    )
  }

  const [firstColumn, secondColumn, thirdColumn] = useMemo(() => {
    let i = 0
    const sortedProjects = projects.sort(byPosition)
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
  }, [projects])

  const widthClass = useMemo(() => {
    if (!thirdColumn.length) {
      if (!secondColumn.length) {
        return "w-full"
      }
      return "w-1/2"
    }
    return "w-1/3"
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
