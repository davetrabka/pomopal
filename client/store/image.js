import axios from 'axios'

const initialState = {
  images: [],
  currentImageUrl: '',
}

const NEW_IMAGE = 'NEW_IMAGE'

const newImage = imageDetails => ({
  type: NEW_IMAGE,
  imageDetails,
})

export const postNewImage = imageUrl => async dispatch => {
  try {
    const { data } = await axios.post(
      'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=smile%2Cemotion%2Cexposure%2Cnoise',
      imageUrl,
      {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '9346ac1329e943b4ae740b22f1508f9b',
        },
      }
    )
    console.log(data)
    dispatch(newImage(data))
  } catch (error) {
    console.error(error)
  }
}

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_IMAGE: {
      return {
        ...state,
        images: [...state.images, action.imageDetails],
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default imageReducer
