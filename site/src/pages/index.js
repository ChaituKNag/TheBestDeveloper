import React from "react"
import Layout from "../components/layouts/no-header"
import Section from "../components/common/Section"
import { Skillset, SkillChip } from "../components/styled/Skillset"
import { navigate, useStaticQuery, graphql } from "gatsby"
import { Typography, Tooltip } from "@material-ui/core"
import { SectionNavButton } from "../components/styled/Buttons"
import MoreAboutMe from "../components/MoreAboutMe"
import ContactInfo from "../components/ContactInfo"
import SEO from "../components/common/seo"

const Index = () => {
  const { contentYaml: content } = useStaticQuery(graphql`
    query HomePageContent {
      contentYaml(page: { eq: "home" }) {
        id
        bio
        funStuffIntro
        page
        projectIntro
        salutation
        skills {
          id
          link
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Portfolio" />
      <Section title="My skills 👨‍💻">
        <Skillset>
          {content.skills
            ? content.skills.map((skill, i) => (
                <Tooltip
                  arrow
                  placement="bottom"
                  title={`All my fun projects including ${skill.title}`}
                  key={`${skill.id}-id`}
                  enterDelay={500}
                >
                  <SkillChip
                    color="primary"
                    label={skill.title}
                    onClick={() => navigate(skill.link)}
                    variant="outlined"
                  />
                </Tooltip>
              ))
            : null}
        </Skillset>
      </Section>

      <Section title="Projects 🏢">
        <Typography gutterBottom>{content.projectIntro}</Typography>
        <SectionNavButton
          variant="outlined"
          color="secondary"
          label="All my official projects"
          onClick={() => navigate("/projects")}
        />
      </Section>

      <Section title="Fun stuff 🌼">
        <Typography gutterBottom>{content.funStuffIntro}</Typography>
        <SectionNavButton
          variant="outlined"
          color="secondary"
          label="Find out more"
          onClick={() => navigate("/works")}
        />
      </Section>

      <Section title="More about me 🤗">
        <MoreAboutMe />
      </Section>

      <Section title="Contact info 📞">
        <ContactInfo />
      </Section>
    </Layout>
  )
}

export default Index
