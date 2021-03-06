'use strict'

let imageCapture

export const getCameraAccess = status => {
  const off = status
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream
      const track = mediaStream.getVideoTracks()[0]
      imageCapture = new ImageCapture(track)
      if (!off) track.stop()
    })
    .catch(error => console.error(error))
}

const drawCanvas = (canvas, img) => {
  canvas.width = getComputedStyle(canvas).width.split('px')[0]
  canvas.height = getComputedStyle(canvas).height.split('px')[0]
  let ratio = Math.min(canvas.width / img.width, canvas.height / img.height)
  let x = (canvas.width - img.width * ratio) / 2
  let y = (canvas.height - img.height * ratio) / 2
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  canvas
    .getContext('2d')
    .drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio
    )
}

export const takeImage = () => {
  imageCapture
    .grabFrame()
    .then(imageBitmap => {
      const canvas = document.querySelector('#grabFrameCanvas')
      drawCanvas(canvas, imageBitmap)
    })
    .catch(error => console.error(error))
}
