'use strict'
import React from 'react'
import { Divider, Container } from 'semantic-ui-react'
import AnalysisSmile from './AnalysisSmile'

const ScreenOutputs = () => {
  return (
    <Container id="screen-outputs">
      <video autoPlay />
      <Divider section horizontal>
        Illustrative IMAGE Capture (to be taken every 2 minutes)
      </Divider>
      <canvas id="grabFrameCanvas" />
      <br />
      <AnalysisSmile />
    </Container>
  )
}

export default ScreenOutputs
