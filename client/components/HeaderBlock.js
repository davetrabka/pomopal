'use strict'
import React from 'react'
import { Header, Button, Icon, Image } from 'semantic-ui-react'

const HeaderBlock = props => {
  const cameraToggle = props.cameraToggle
  const handleImage = props.handleImage
  const disabled = props.disabled

  return (
    <div id="top-container">
      <div id="logo">
        <Image src="/img/logo.svg" size="mini" />
        <span>
          <Header size="huge" id="header" color="red">
            PomPal
          </Header>
        </span>
      </div>
      <div>
        <Button onClick={cameraToggle} basic color="red">
          <Icon name="share" />Lights, Camera...
        </Button>
        <Button onClick={handleImage} disabled={disabled} color="red">
          ACTION!
        </Button>
      </div>
    </div>
  )
}

export default HeaderBlock
