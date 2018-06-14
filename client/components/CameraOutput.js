'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { postNewImage } from '../store/image'
import jQuery from 'jquery'

class CameraOutput extends Component {
  constructor() {
    super()
    this.state = {
      image:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350',
    }
  }

  analyzeImage = () => {
    const key = '9346ac1329e943b4ae740b22f1508f9b'
    const url =
      'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
    const params = {
      returnFaceId: 'true',
      returnFaceLandmarks: 'false',
      returnFaceAttributes: 'smile,emotion,exposure,noise',
    }

    jQuery
      .ajax({
        url: url + '?' + jQuery.param(params),

        // Request headers.
        beforeSend: function(xhrObj) {
          xhrObj.setRequestHeader('Content-Type', 'application/json')
          xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', key)
        },
        type: 'POST',
        // Request body.
        data: '{"url": ' + '"' + this.state.image + '"}',
      })
      .done(function(data) {
        // Show formatted JSON on webpage.
        jQuery('#responseTextArea').val(JSON.stringify(data, null, 2))
      })

      .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString =
          errorThrown === ''
            ? 'Error. '
            : errorThrown + ' (' + jqXHR.status + '): '
        errorString +=
          jqXHR.responseText === ''
            ? ''
            : jQuery.parseJSON(jqXHR.responseText).message
              ? jQuery.parseJSON(jqXHR.responseText).message
              : jQuery.parseJSON(jqXHR.responseText).error.message
        alert(errorString)
      })
  }

  render() {
    return (
      <Container text>
        Image to analyze:
        <input
          type="text"
          name="inputImage"
          id="inputImage"
          value={this.state.image}
        />
        <button
          onClick={() => this.props.postNewImage({ url: this.state.image })}>
          Analyze face
        </button>
        {/* <button onClick={() => this.analyzeImage()}>Analyze face</button> */}
        <br />
        <br />
        <div id="wrapper" style={{ width: '1020px', display: 'table' }}>
          <div
            id="jsonOutput"
            style={{ width: '600px', display: 'table-cell' }}>
            Response:<br />
            <br />
            <textarea
              id="responseTextArea"
              className="UIInput"
              style={{ width: '580px', height: '400px' }}
            />
          </div>
          <div id="imageDiv" style={{ width: '420px', display: 'table-cell' }}>
            Source image:<br />
            <br />
            <img src={this.state.image} id="sourceImage" />
          </div>
        </div>
      </Container>
    )
  }
}

const mapState = state => ({
  currentImageUrl: state.image.currentImageUrl,
})

const mapDispatch = dispatch => ({
  postNewImage: imageUrl => dispatch(postNewImage(imageUrl)),
})

export default connect(
  mapState,
  mapDispatch
)(CameraOutput)
