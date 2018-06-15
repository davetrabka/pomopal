'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchImages } from './store/image'

class Analysis extends Component {
  componentDidMount = async () => {
    await this.props.fetchImages()
  }

  analyzeSmile = () => {
    console.log('THIS>PROPS>IMAGES', this.props.images)
    const smile =
      this.props.images.length > 0
        ? this.props.images.map(analysis => analysis[0].faceAttributes.smile)
        : null
    console.log('SMILE ARRAY: ', smile)
  }

  render() {
    this.analyzeSmile()
    return <div />
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
)(Analysis)
