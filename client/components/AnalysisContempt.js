'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Image, Modal, Button, Icon } from 'semantic-ui-react'
import { fetchImages, toggleContemptModal, clearImages } from '../store/image'

class AnalysisContempt extends Component {
  componentDidMount = async () => {
    await this.props.fetchImages()
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.images !== prevProps.images ||
      this.props.toggleContemptModal !== prevProps.toggleContemptModal
    ) {
      this.analyzeContempt()
    }
  }

  analyzeContempt = () => {
    const contempt = this.props.images.map(
      analysis => analysis[0].faceAttributes.emotion.contempt
    )
    console.log(
      `%c CONTEMPT: [${contempt}]`,
      'color: white; font-weight: bold; background: ORANGE'
    )
    for (let i = 0; i < contempt.length; i++) {
      if (
        contempt[i] / contempt[i - 1] - 1 > 1 &&
        contempt[i - 1] / contempt[i - 2] - 1 > 1
      ) {
        if (!this.props.contemptModal) {
          this.props.toggleContemptModal()
          this.props.clearImages()
        }
        return
      }
    }
  }

  render() {
    return (
      <Modal size="small" open={this.props.contemptModal}>
        <Modal.Content image>
          <Image wrapped size="small" src="/img/contempt-emoji.png" />
          <Modal.Description>
            <Header>Working on something dumb?</Header>
            <p>
              It looks like you might have a bit of contempt for that
              assignment. Maybe walk away for it for a little bit ¯\_(ツ)_/¯
            </p>
            <Header as="h1" id="recommendation" color="red">
              Take a 5 minute break!
            </Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={() => this.props.toggleContemptModal()}>
            <Icon name="remove" /> I'm fine, go away!
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapState = state => ({
  images: state.image.images,
  contemptModal: state.image.contemptModal,
})

const mapDispatch = dispatch => ({
  fetchImages: () => dispatch(fetchImages()),
  toggleContemptModal: () => dispatch(toggleContemptModal()),
  clearImages: () => dispatch(clearImages()),
})

export default connect(
  mapState,
  mapDispatch
)(AnalysisContempt)
