'use strict'
import axios from 'axios'

const initialState = {
  images: [],
  smileModal: false,
  angerModal: false,
  contemptModal: false,
}

const TOGGLED_SMILE_MODAL = 'TOGGLED_SMILE_MODAL'
const TOGGLED_ANGER_MODAL = 'TOGGLED_ANGER_MODAL'
const TOGGLED_CONTEMPT_MODAL = 'TOGGLED_CONTEMPT_MODAL'

const ANALYZED_IMAGE = 'ANALYZED_IMAGE'
const FETCHED_IMAGES = 'FETCHED_IMAGES'
const CLEARED_IMAGES = 'CLEARED_IMAGES'

const toggledSmileModal = () => ({
  type: TOGGLED_SMILE_MODAL,
})

const toggledAngerModal = () => ({
  type: TOGGLED_ANGER_MODAL,
})
const toggledContemptModal = () => ({
  type: TOGGLED_CONTEMPT_MODAL,
})

const analyzedImage = imageDetails => ({
  type: ANALYZED_IMAGE,
  imageDetails,
})

const fetchedImages = () => ({
  type: FETCHED_IMAGES,
})

const clearedImages = () => ({
  type: CLEARED_IMAGES,
})

export const toggleSmileModal = () => dispatch => {
  dispatch(toggledSmileModal())
}

export const toggleAngerModal = () => dispatch => {
  dispatch(toggledAngerModal())
}

export const toggleContemptModal = () => dispatch => {
  dispatch(toggledContemptModal())
}

export const analyzeNewImage = blob => async dispatch => {
  try {
    const { data } = await axios.post(
      'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=smile%2Cemotion%2Cexposure',
      blob,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key': '9346ac1329e943b4ae740b22f1508f9b',
        },
      }
    )
    dispatch(analyzedImage(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchImages = () => dispatch => {
  dispatch(fetchedImages())
}

export const clearImages = () => dispatch => {
  dispatch(clearedImages())
}

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLED_SMILE_MODAL: {
      return {
        ...state,
        smileModal: !state.smileModal,
      }
    }
    case TOGGLED_ANGER_MODAL: {
      return {
        ...state,
        angerModal: !state.angerModal,
      }
    }
    case TOGGLED_CONTEMPT_MODAL: {
      return {
        ...state,
        angerModal: !state.contemptModal,
      }
    }
    case ANALYZED_IMAGE: {
      return {
        ...state,
        images: [...state.images, action.imageDetails],
      }
    }
    case FETCHED_IMAGES: {
      return { ...state }
    }
    case CLEARED_IMAGES: {
      return {
        ...state,
        images: [],
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default imageReducer
