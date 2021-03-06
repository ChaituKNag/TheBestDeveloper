/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site, imageSharp } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
        imageSharp(fixed: { originalName: { eq: "smiley-with-coat.jpeg" } }) {
          fixed {
            src
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s of ${site.siteMetadata.title} | Frontend Developer`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: `https://thebestdeveloper.me`,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: imageSharp.fixed.src,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `profile:first_name`,
          content: `Naga Chaitanya`,
        },
        {
          property: `profile:last_name`,
          content: `Konada`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:url`,
          content: `https://thebestdeveloper.me`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: imageSharp.fixed.src,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {`{
            "@context": "http://schema.org/",
            "@type": "Person",
            "name": "Naga Chaitanya Konada",
            "jobTitle": "Frontend Developer (Lead Software Developer @Pepsico)",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana, India"
            }
          }
      `}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
