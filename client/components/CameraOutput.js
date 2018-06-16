'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import { analyzeNewImage } from '../store/image'
import { getCameraAccess, takeImage } from '../ImageCapture'
import HeaderBlock from './HeaderBlock'
import DescriptionBlock from './DescriptionBlock'
import ScreenOutputs from './ScreenOutputs'

class CameraOutput extends Component {
  state = { off: true }

  cameraToggle = () => {
    getCameraAccess(this.state.off)
    const newState = !this.state.off
    this.setState({ off: newState })
  }

  handleImage = () => {
    takeImage()
    this.analyzeImage()
  }

  convertImageData = () => {
    const canvas = document.querySelector('#grabFrameCanvas')
    const dataUrl = canvas.toDataURL('image/jpeg')
    const binary = atob(dataUrl.split(',')[1])
    const array = []
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
  }

  analyzeImage = () => {
    setTimeout(() => {
      const blob = this.convertImageData()
      this.props.analyzeNewImage(blob)
    }, 2000)
  }

  render() {
    return (
      <Container text>
        <HeaderBlock
          cameraToggle={this.cameraToggle}
          handleImage={this.handleImage}
          disabled={this.state.off}
        />
        <DescriptionBlock />
        {!this.state.off ? (
          <ScreenOutputs />
        ) : (
          <Header
            size="huge"
            textAlign="center"
            id="recommendation"
            color="red">
            Let's get to work . . .
          </Header>
        )}
      </Container>
    )
  }
}

const mapState = state => ({
  images: state.image.images,
})

const mapDispatch = dispatch => ({
  analyzeNewImage: imageUrl => dispatch(analyzeNewImage(imageUrl)),
})

export default connect(
  mapState,
  mapDispatch
)(CameraOutput)
