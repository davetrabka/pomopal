'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Button, Divider } from 'semantic-ui-react'
import { analyzeNewImage, storeNewImage } from '../store/image'
import { getCameraAccess, takeImage, getImageUrl } from '../ImageCapture'
import Analysis from '../Analysis'

class CameraOutput extends Component {
  state = {
    off: true,
    images: [
      'https://i.imgur.com/e7eQcml.jpg',
      'https://i.imgur.com/ejn1fgr.jpg',
      'https://i.imgur.com/e7eQcml.jpg',
      'https://i.imgur.com/ejn1fgr.jpg',
      'https://i.imgur.com/MSJEqvM.jpg',
      'https://i.imgur.com/8xTBDP3.jpg',
      'https://i.imgur.com/8xTBDP3.jpg',
      'https://i.imgur.com/ejn1fgr.jpg',
      'https://i.imgur.com/e7eQcml.jpg',
      'https://i.imgur.com/e7eQcml.jpg',
    ],
  }

  cameraToggle = () => {
    getCameraAccess(this.state.off)
    const newState = !this.state.off
    this.setState({ off: newState })
  }

  handleImage = () => {
    takeImage()
    this.analyzeImage()
  }

  analyzeImage = () => {
    // const imageUrl = getImageUrl()
    // imageUrl.replace(/^data:image\/(png|jpg);base64,/, '')
    // this.props.storeNewImage(imageUrl)
    let counter = 0
    while (counter < this.state.images.length) {
      this.props.analyzeNewImage(this.state.images[counter])
      counter++
    }
  }

  render() {
    return (
      <Container text>
        <div>
          <div id="top-container">
            <Header as="h1">PomPal</Header>
            <div>
              <Button onClick={this.cameraToggle} primary>
                Camera {this.state.off ? 'On' : 'Off'}
              </Button>
              <Button
                onClick={this.handleImage}
                disabled={this.state.off}
                secondary>
                Take Image
              </Button>
            </div>
          </div>
          <Divider />

          <div id="screen-outputs">
            <video autoPlay />
            {!this.state.off ? (
              <Divider section horizontal>
                Your Lastest Capture
              </Divider>
            ) : (
              ''
            )}
            <canvas id="grabFrameCanvas" />
          </div>
        </div>
        <Analysis images={this.state.images} />
      </Container>
    )
  }
}

const mapState = state => ({
  images: state.image.images,
  currentImage: state.image.currentImage,
})

const mapDispatch = dispatch => ({
  analyzeNewImage: imageUrl => dispatch(analyzeNewImage(imageUrl)),
  storeNewImage: imageUrl => dispatch(storeNewImage(imageUrl)),
})

export default connect(
  mapState,
  mapDispatch
)(CameraOutput)
