import React from "react"
import Image from "gatsby-image"

const Header = ({ project }) => {
  return (
    <div className="md:hidden">
      <p className="text-2xl m-0">
        {project.title}
      </p>
      <p className="my-2 text-sm m-0">{project.description}</p>
    </div>
  )
}


const ProjectTile = props => {
  const { project } = props
  return (
    <div className="ml-2 mr-2 m-2">
      <Header project={project} />
      <Image fluid={project.mainImage.asset.fluid} alt={project.title} />
    </div>
  )
}

export default ProjectTile
