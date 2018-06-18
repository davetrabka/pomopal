'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Image, Modal, Button, Icon } from 'semantic-ui-react'
import { fetchImages, toggleAngerModal, clearImages } from '../store/image'

class AnalysisAnger extends Component {
  componentDidMount = async () => {
    await this.props.fetchImages()
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.images !== prevProps.images ||
      this.props.toggleAngerModal !== prevProps.toggleAngerModal
    ) {
      this.analyzeAnger()
    }
  }

  analyzeAnger = () => {
    const anger = this.props.images.map(
      analysis => analysis[0].faceAttributes.emotion.anger
    )
    // console.log(
    //   `%c ANGER: [${anger}]`,
    //   'color: white; font-weight: bold; background: orange'
    // )
    for (let i = 0; i < anger.length; i++) {
      if (
        anger[i] / anger[i - 1] - 1 > 0.5 &&
        anger[i - 1] / anger[i - 2] - 1 > 0.5
      ) {
        if (!this.props.angerModal) {
          this.props.toggleAngerModal()
          this.props.clearImages()
        }
        return
      }
    }
  }

  render() {
    return (
      <Modal size="small" open={this.props.angerModal}>
        <Modal.Content image>
          <Image wrapped size="small" src="/img/angry-emoji.png" />
          <Modal.Description>
            <Header>You mad bro?</Header>
            <p>
              It looks like something is getting you fired up over there. You
              need some time to cool off?
            </p>
            <Header as="h1" id="recommendation" color="red">
              Take a 5 minute break!
            </Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={() => this.props.toggleAngerModal()}>
            <Icon name="remove" /> I'm fine, go away!
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapState = state => ({
  images: state.image.images,
  angerModal: state.image.angerModal,
  smileModal: state.image.smileModal,
  contemptModal: state.image.contemptModal,
})

const mapDispatch = dispatch => ({
  fetchImages: () => dispatch(fetchImages()),
  toggleAngerModal: () => dispatch(toggleAngerModal()),
  clearImages: () => dispatch(clearImages()),
})

export default connect(
  mapState,
  mapDispatch
)(AnalysisAnger)
