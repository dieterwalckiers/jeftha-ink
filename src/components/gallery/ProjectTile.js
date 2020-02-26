import React from "react"
import Image from "gatsby-image"

const ProjectTile = props => {
  const { project } = props
  return (
    <div className="ml-2 mr-2 mb-4">
      <Image fluid={project.mainImage.asset.fluid} alt={project.title}/>
    </div>
  )
}

export default ProjectTile
