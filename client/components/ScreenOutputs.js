'use strict'
import React from 'react'
import { Divider, Container } from 'semantic-ui-react'
import AnalysisSmile from './AnalysisSmile'
// import AnalysisAnger from './AnalysisAnger'
// import AnalysisContempt from './AnalysisContempt'

const ScreenOutputs = () => {
  return (
    <Container id="screen-outputs">
      <video autoPlay />
      <Divider section horizontal>
        Illustrative Image Capture (to be taken every 2 minutes)
      </Divider>
      <canvas id="grabFrameCanvas" />
      <br />
      <AnalysisSmile />
      {/* <AnalysisAnger /> */}
      {/* <AnalysisContempt /> */}
    </Container>
  )
}

export default ScreenOutputs
