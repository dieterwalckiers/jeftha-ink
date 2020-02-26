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
    return prevSlug && (
      <Link to={`/${prevSlug}`}>
        <CaretIcon className="w-8" style={{ transform: "rotate(90deg)" }} />
      </Link>
    );
  }, [prevSlug, Link, CaretIcon]);

  const renderNextArrow = useCallback(() => {
    return nextSlug && (
      <Link to={`/${nextSlug}`}>
        <CaretIcon className="w-8" style={{ transform: "rotate(-90deg)" }} />
      </Link>
    );
  }, [nextSlug, Link, CaretIcon]);

  return (
    <Layout>
      <div className="projectview w-full flex">
        <div className="w-1/2 pt-8 pb-8 flex items-center">
          {renderPrevArrow()}
          <Image fluid={mainImage.asset.fluid} alt={title} className="w-full" />
          {renderNextArrow()}
        </div>
        <div className="w-1/2 p-12 flex flex-col items-center relative">
          <Link to="/gallery">
            <CloseIcon className="absolute right-0 top-0 w-6" />
          </Link>
          <h1 className="font-thin text-3xl">{title}</h1>
          <p className="mt-8">{description}</p>
        </div>
      </div>
    </Layout>
  )
}
