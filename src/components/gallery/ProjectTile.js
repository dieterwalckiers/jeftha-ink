import React from "react"
import Image from "gatsby-image"

const Header = ({ project }) => {
  return (
    <div className="md:hidden">
      <p className="text-3xl m-0 font-thin">
        {project.title}
      </p>
      <p className="my-2 text-sm m-0">{project.description}</p>
    </div>
  )
}

const ProjectTile = props => {
  const { project, highlightsStyle } = props
  return (
    <div className="ml-2 mr-2 m-2 md:mb-4">
      {!highlightsStyle && <Header project={project} />}
      <Image fluid={project.mainImage.asset.fluid} alt={project.title} />
    </div>
  )
}

export default ProjectTile
