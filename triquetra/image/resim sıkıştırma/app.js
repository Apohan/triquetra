async function compressImage (event, useWebWorker) {
    var file = event.target.files[0]
    var logDom
    if (useWebWorker) {
      logDom = document.querySelector('#web-worker-log')
    } else {
      logDom = document.querySelector('#main-thread-log')
    }
    document.getElementById('preview').src = URL.createObjectURL(file)

    logDom.innerHTML = 'Source image size:' + (file.size / 1024 / 1024).toFixed(2) + 'mb'
    console.log('input', file)
    console.log('ExifOrientation', await imageCompression.getExifOrientation(file))
    alert(await imageCompression.getExifOrientation(file))
    var options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: useWebWorker }
    const output = await imageCompression(file, options)
    logDom.innerHTML += ', output size:' + (output.size / 1024 / 1024).toFixed(2) + 'mb'
    console.log('output', output)
    const downloadLink = URL.createObjectURL(output)
    logDom.innerHTML += '&nbsp;<a href="' + downloadLink + '" download="' + file.name + '">download compressed image</a>'
    document.getElementById('preview-after-compress').src = downloadLink
    // await uploadToServer(output)
  }

  function uploadToServer (file) {
    var formData = new FormData()
    formData.append('image', file)
    return fetch('http://localhost/image-upload-api', {
      method: 'POST',
      body: formData
    })
  }