'use strict'
import React from 'react'
import { Divider, Container, Icon } from 'semantic-ui-react'

const DescriptionBlock = props => {
  const off = props.off
  return (
    <Container>
      <Divider />
      {off ? (
        <div>
          <Container size="small" textAlign="center" id="subheader">
            A modern twist on that age-old technique.
          </Container>
          <Container textAlign="center">
            <Icon name="circle" color="red" id="circles" />
            <Icon name="circle" color="red" id="circles" />
            <Icon name="circle" color="red" id="circles" />
          </Container>
          <Container textAlign="center" id="subsub">
            <span id="shadows">PomPal </span> is an AI-powered pomodoro app. As
            if your mom doesn't already tell you to smile more, now your
            computer can, too.
          </Container>
        </div>
      ) : (
        <Container textAlign="center">
          <Icon name="circle" color="red" /> Recording!
        </Container>
      )}

      <Divider />
    </Container>
  )
}

export default DescriptionBlock
