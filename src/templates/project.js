import React, { useMemo, useCallback } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Image from "gatsby-image"
import CloseIcon from "./close.inline.svg"
import CaretIcon from "./caret.inline.svg";
import { byPosition } from "../helpers";

export const query = graphql`
  query($slug: String) {
    allSanityProject {
      edges {
        node {
          id
          slug {
            current
          }
          position
        }
      }
    }
    sanityProject(slug: { current: { eq: $slug } }) {
      id
      title
      description
      mainImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`

export default ({ data }) => {
  const {
    allSanityProject: { edges: allSanityProjectEdges },
    sanityProject: { id: projectId, title, mainImage, description },
  } = data

  const sortedAllSanityProjectEdges = useMemo(() => allSanityProjectEdges.sort(byPosition), [allSanityProjectEdges]);

  /*
  * @param id the id of the project
  * @param isNext true if next neigbour false if previous
  */
  const findNeighbourEdge = useCallback((id, isNext) => {
    const i = sortedAllSanityProjectEdges.findIndex(({ node: { id: projId } }) => projId === id);
    if (i === -1) {
      return undefined;
    }
    if (isNext && ((i + 1) < sortedAllSanityProjectEdges.length)) {
      return sortedAllSanityProjectEdges[i + 1];
    }
    if (!isNext && ((i - 1) >= 0)) {
      return sortedAllSanityProjectEdges[i - 1];
    }
    return undefined;
  }, [sortedAllSanityProjectEdges]);

  const [prevSlug, nextSlug] = useMemo(() => {
    const prevNeighbour = findNeighbourEdge(projectId, false);
    const nextNeighbour = findNeighbourEdge(projectId, true);
    const prevSlug = prevNeighbour && prevNeighbour.node.slug.current;
    const nextSlug = nextNeighbour && nextNeighbour.node.slug.current;
    return [prevSlug, nextSlug];
  }, [
    findNeighbourEdge, projectId
  ]);

  const renderPrevArrow = useCallback(() => {
    return (
      <div className="w-8">
        {
          prevSlug && (
            <Link to={`/${prevSlug}`}>
              <CaretIcon className="w-8" style={{ transform: "rotate(90deg)" }} />
            </Link>
          )
        }
      </div>
    )
  }, [prevSlug, Link, CaretIcon]);

  const renderNextArrow = useCallback(() => {
    return (
      <div className="w-8">
        {
          nextSlug && (
            <Link to={`/${nextSlug}`}>
              <CaretIcon className="w-8" style={{ transform: "rotate(-90deg)" }} />
            </Link>
          )
        }
      </div>
    )
  }, [nextSlug, Link, CaretIcon]);

  return (
    <Layout>
      <div className="projectview w-full lg:flex">
        <div className="lg:w-1/2 pt-8 pb-8 flex items-center">
          {renderPrevArrow()}
          <Image fluid={mainImage.asset.fluid} alt={title} className="w-full" />
          {renderNextArrow()}
        </div>
        <div className="p-8 flex flex-col items-center relative lg:w-1/2 lg:flex lg:flex-col justify-center items-center">
          <Link to="/gallery" className="hidden lg:block">
            <CloseIcon className="absolute right-0 top-0 w-6 mt-8 mr-8" />
          </Link>
          <h1 className="font-thin text-3xl">{title}</h1>
          <p className="m-4">{description}</p>
          <div className="text-center lg:absolute lg:bottom-0 lg:w-full lg:mb-8">
            <Link to="/gallery">
              <label className="mx-auto my-12 text-teal-800 text-xs">
                Terug naar de Galerij
              </label>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
