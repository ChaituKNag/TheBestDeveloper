import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Footer from "../common/Footer"
import StyledContainer from "../styled/StyledContainer"
import StyledMain from "../styled/StyledMain"
import HeroBanner from "../HeroBanner"
import { CommonGlobalStyles } from "../../global-styles"

const Layout = ({ children, middle }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      contentYaml(page: { eq: "home" }) {
        bio
        salutation
        social_links {
          backgroundColor
          icon
          infoText
          link
        }
        introUrl
        introCoverImg {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <CommonGlobalStyles />
      <StyledContainer>
        <HeroBanner
          bio={data.contentYaml.bio}
          salutation={data.contentYaml.salutation}
          socialLinks={data.contentYaml.social_links}
          introVideoUrl={data.contentYaml.introUrl}
          introVideoCoverImage={
            data.contentYaml.introCoverImg?.childImageSharp?.fluid?.src
          }
        />
      </StyledContainer>
      <StyledContainer>
        <StyledMain middle={middle}>{children}</StyledMain>
        <Footer />
      </StyledContainer>
    </>
  )
}

export default Layout
