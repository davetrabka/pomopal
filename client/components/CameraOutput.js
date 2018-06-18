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

  timeoutHandler = () => {
    if (
      !this.props.smileModal &&
      !this.props.angerModal &&
      !this.props.contemptModal
    ) {
      setTimeout(() => {
        takeImage()
        this.analyzeImage()
        this.timeoutHandler()
      }, 3000) // 120,000 in production for 2 min
    }
  }

  handleImage = () => {
    this.timeoutHandler()
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
        <DescriptionBlock off={this.state.off} />
        {!this.state.off ? (
          <ScreenOutputs />
        ) : (
          <Header
            size="huge"
            textAlign="center"
            id="recommendation"
            color="red">
            Let's get to work.
          </Header>
        )}
      </Container>
    )
  }
}

const mapState = state => ({
  images: state.image.images,
  smileModal: state.image.smileModal,
  angerModal: state.image.angerModal,
  contemptModal: state.image.contemptModal,
})

const mapDispatch = dispatch => ({
  analyzeNewImage: imageUrl => dispatch(analyzeNewImage(imageUrl)),
})

export default connect(
  mapState,
  mapDispatch
)(CameraOutput)
