'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Button,
  Divider,
  Image,
  Icon,
} from 'semantic-ui-react'
import { analyzeNewImage, storeNewImage } from '../store/image'
import { getCameraAccess, takeImage, getImageUrl } from '../ImageCapture'
import Analysis from '../Analysis'

class CameraOutput extends Component {
  state = {
    off: true,
    images: [
      'https://i.imgur.com/bdVNsfz.jpg',
      'https://i.imgur.com/bdVNsfz.jpg',
      'https://i.imgur.com/bdVNsfz.jpg',
      'https://i.imgur.com/bdVNsfz.jpg', //____________________
      'https://i.imgur.com/Hs77tl9.jpg',
      'https://i.imgur.com/Hs77tl9.jpg',
      'https://i.imgur.com/Hs77tl9.jpg',
      'https://i.imgur.com/Hs77tl9.jpg',
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
    const int = setInterval(() => {
      this.props.analyzeNewImage(this.state.images[counter])
      counter++
      if (counter === this.state.images.length - 1) clearInterval(int)
    }, 1500)
  }

  render() {
    return (
      <Container text>
        <div>
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
              <Button onClick={this.cameraToggle} basic color="red">
                <Icon name="share" />Lights, Camera...
              </Button>
              <Button
                onClick={this.handleImage}
                disabled={this.state.off}
                color="red">
                ACTION!
              </Button>
            </div>
          </div>
          <Divider />
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
          <Divider />

          {!this.state.off ? (
            <div id="screen-outputs">
              <video autoPlay />
              <Divider section horizontal>
                Illustrative Capture (to be taken every 2 minutes)
              </Divider>
              <canvas id="grabFrameCanvas" />
              <br />
              <Analysis />
            </div>
          ) : (
            <Header
              size="huge"
              textAlign="center"
              id="recommendation"
              color="red">
              <br />
              <br />
              Let's get to work...
            </Header>
          )}
        </div>
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

// IMAGE TEST CASES -----------------------------------------------

// Frown forming
const frown = [
  'https://i.imgur.com/bdVNsfz.jpg', // happy
  'https://i.imgur.com/bdVNsfz.jpg', // happy
  'https://i.imgur.com/bdVNsfz.jpg', // happy
  'https://i.imgur.com/3qjRuCH.jpg', // meh
  'https://i.imgur.com/Hs77tl9.jpg', // unhappy
  'https://i.imgur.com/bdVNsfz.jpg', // happy
]

// Massive change -- gets way worse than where you started
const negEvent = [
  'https://i.imgur.com/bdVNsfz.jpg',
  'https://i.imgur.com/bdVNsfz.jpg',
  'https://i.imgur.com/bdVNsfz.jpg',
  'https://i.imgur.com/bdVNsfz.jpg',
  'https://i.imgur.com/Hs77tl9.jpg', // Major smile shift
  'https://i.imgur.com/Hs77tl9.jpg',
  'https://i.imgur.com/Hs77tl9.jpg',
  'https://i.imgur.com/Hs77tl9.jpg',
]
