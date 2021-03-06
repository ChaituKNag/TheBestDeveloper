import React from "react"
import Layout from "../components/layouts/default"
import { PageTitle, ItemTitle } from "../components/common/Headings"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import marked from "marked"
import Img from "gatsby-image"
import Text from "../components/styled/Text"

const ImageBox = styled.div`
  width: 100%;
  margin-bottom: 20px;

  & img {
    max-width: 100%;
  }
`

const worksQuery = graphql`
  query WorksPageContent {
    contentYaml(page: { eq: "works" }) {
      id
      title
      disclaimer
      items {
        workDemoLink
        workDescription
        workSourceCode
        workTitle
        workPreview {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const Works = () => {
  const { contentYaml: content } = useStaticQuery(worksQuery)

  return (
    <Layout>
      <PageTitle>{content.title}</PageTitle>
      <Text>{content.disclaimer}</Text>
      {content.items.map((item, i) => (
        <div key={`work-item-${i}`}>
          <ItemTitle>{item.workTitle}</ItemTitle>
          <Text
            as="div"
            dangerouslySetInnerHTML={{ __html: marked(item.workDescription) }}
          ></Text>
          {item.workPreview && item.workPreview.childImageSharp ? (
            <>
              <Text as="h4">Preview: </Text>
              <ImageBox>
                <Img fluid={item.workPreview.childImageSharp.fluid} />
              </ImageBox>
            </>
          ) : null}
          <Link href={item.workDemoLink} target="_blank">
            Demo
          </Link>
          <Link href={item.workSourceCode} target="_blank">
            Source Code
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export default Works
