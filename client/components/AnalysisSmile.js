'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Image, Modal, Button, Icon } from 'semantic-ui-react'
import { fetchImages } from '../store/image'

class AnalysisSmile extends Component {
  componentDidMount = async () => {
    await this.props.fetchImages()
  }

  analyzeSmile = () => {
    const smile = this.props.images.map(
      analysis => analysis[0].faceAttributes.smile
    )
    console.log(
      `%c SMILE GRADE OVER TIME: [${smile}]`,
      'color: white; font-weight: bold; background: red'
    )
    for (let i = 0; i < smile.length; i++) {
      if (smile[i] < smile[i - 1] && smile[i - 1] < smile[i - 2]) {
        return true
      }
      if ((smile[i] + smile[i - 1] + smile[i - 2]) / 3 / smile[0] < 0.5) {
        return true
      }
    }
  }

  render() {
    let open = this.analyzeSmile()
    return (
      <Modal size="small" open={open}>
        <Modal.Content image>
          <Image wrapped size="small" src="/img/sad-emoji.png" />
          <Modal.Description>
            <Header>Is everything ok?</Header>
            <p>
              We noticed a frown forming on that face and wanted to check in.
              Take a deep breath, no work is worth getting too worked up about!
            </p>
            <Header as="h1" id="recommendation" color="red">
              Take a 5 minute break!
            </Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey">
            <Icon name="remove" /> I'm fine, go away!
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapState = state => ({
  images: state.image.images,
})

const mapDispatch = dispatch => ({
  fetchImages: () => dispatch(fetchImages()),
})

export default connect(
  mapState,
  mapDispatch
)(AnalysisSmile)
