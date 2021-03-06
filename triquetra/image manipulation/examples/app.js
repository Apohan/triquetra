 document.getElementById('exampleResize').addEventListener('change', function (e) {
    var file = e.target.files[0]
    var iM = new BrowserImageManipulation()
        .loadBlob(file, {fixOrientation: true})
        .resize(800, 400)

    iM.saveAsBlob().then(function (blob) {
        var exifTags = iM.getExif()
        document.getElementById('exampleResizeExif').innerHTML = JSON.stringify(exifTags, null, ' ')
        if (blob.size > 3000000) {
            return new Error('Max size 3 mb')
        }
        return iM.saveAsImage()
    }).then(function (base64) {
        document.getElementById('exampleResizeImg').src = base64
    }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleFluent').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .toCircle(400)
        .toGrayscale()
        .pixelize()
        .rotate(90)
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleFluentImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('centerInRectangle').addEventListener('change', function (e) {
    var file = e.target.files[0]
    var iM = new BrowserImageManipulation()
        .loadBlob(file)
        .centerInRectangle(800, 400, {bgColor: 'red'})

    iM.saveAsBlob().then(function (blob) {
        if (blob.size > 3000000) {
            return new Error('Max size 3 mb')
        }
        uploadToServer(blob, 'centerInRectangleServer')
        return iM.saveAsImage()
    }).then(function (base64) {
        document.getElementById('centerInRectangleImg').src = base64
    }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleToCircle').addEventListener('change', function (e) {
    var file = e.target.files[0]
    var iM = new BrowserImageManipulation()
        .loadBlob(file)
        .toCircle(400)

    iM.saveAsBlob().then(function (blob) {
        if (blob.size > 3000000) {
            return new Error('Max size 3 mb')
        }
        uploadToServer(blob, 'exampleToCircleImgServer')
        return iM.saveAsImage()
    }).then(function (base64) {
        document.getElementById('exampleToCircleImg').src = base64
    }).catch(function (e) { alert(e.toString()) })
})

var iMRotate = new BrowserImageManipulation()
var angle = 10
document.getElementById('exampleRotate').addEventListener('change', function (e) {
    var file = e.target.files[0]
    iMRotate.loadBlob(file)
    rotate()
})
document.getElementById('exampleRotateChangeDegree').addEventListener('click', function (e) {
    e.preventDefault()
    angle = angle + 10
    rotate()
})
function rotate () {
    iMRotate.rotate(angle).saveAsBlob().then(function (blob) {
        uploadToServer(blob, 'exampleRotateImgServer')
        return iMRotate.saveAsImage()
    }).then(function (base64) {
        document.getElementById('exampleRotateImg').src = base64
    }).catch(function (e) { alert(e.toString()) })
}

document.getElementById('exampleToGrayscale').addEventListener('change', function (e) {
    var file = e.target.files[0]
    var iM = new BrowserImageManipulation()
        .loadBlob(file)
        .toGrayscale()

    iM.saveAsBlob().then(function (blob) {
        uploadToServer(blob, 'exampleToGrayscaleImgServer')
        return iM.saveAsImage()
    }).then(function (base64) {
        document.getElementById('exampleToGrayscaleImg').src = base64
    }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('examplePixelize').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .pixelize()
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('examplePixelizeImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleBlur').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .gaussianBlur()
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleBlurImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleCrop').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .crop(200, 300)
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleCropImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

var face = {
    'face_landmarks_list': [{
        'chin': [[142, 152], [148, 168], [155, 184], [163, 198], [173, 210], [187, 220], [204, 226], [221, 231], [237, 228], [249, 222], [258, 210], [264, 196], [268, 180], [268, 164], [268, 148], [266, 132], [263, 117]],
        'left_eyebrow': [[152, 138], [161, 131], [172, 128], [184, 129], [196, 132]],
        'right_eyebrow': [[218, 125], [225, 118], [234, 111], [245, 107], [255, 109]],
        'nose_bridge': [[211, 141], [215, 151], [218, 162], [222, 173]],
        'nose_tip': [[212, 182], [218, 182], [225, 182], [229, 178], [233, 175]],
        'left_eye': [[169, 153], [176, 148], [185, 146], [193, 149], [186, 153], [177, 155]],
        'right_eye': [[227, 139], [233, 132], [241, 129], [248, 129], [244, 136], [236, 139]],
        'top_lip': [[203, 204], [211, 197], [220, 191], [228, 191], [233, 187], [242, 188], [250, 190], [246, 192], [235, 196], [229, 198], [222, 199], [208, 204]],
        'bottom_lip': [[250, 190], [245, 201], [239, 207], [233, 210], [225, 211], [215, 210], [203, 204], [208, 204], [223, 200], [230, 199], [236, 196], [246, 192]]
    }]
}

document.getElementById('exampleDrawLine').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .drawLine([[0, 0], [400, 400]]) // simple line
        .drawLine(face['face_landmarks_list'][0]['top_lip'])
        .drawLine(face['face_landmarks_list'][0]['bottom_lip'])
        .drawLine(face['face_landmarks_list'][0]['nose_bridge'])
        .drawLine(face['face_landmarks_list'][0]['chin'])
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleDrawLineImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleDrawPolygon').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .drawPolygon([[0, 0], [0, 400], [200, 400], [200, 0], [0, 0]]) // simple poly
        .drawPolygon(face['face_landmarks_list'][0]['chin'])
        .drawPolygon(face['face_landmarks_list'][0]['right_eye'])
        .drawPolygon(face['face_landmarks_list'][0]['left_eye'])
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleDrawPolygonImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleDrawRectangle').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .drawRectangle([20, 200, 150, 60]) // [left, bottom, right, top]
        .drawRectangle([40, 400, 300, 220], 'green')
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleDrawRectangleImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('exampleDrawText').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .drawText([60, 170], 'Hello world!', {
            fontSize: '10%',
            fill: 'red',
            rotateAngle: 10,
            fillPadding: '20px'
        })
        .drawText([10, 20], 'Hello world!')
        .saveAsImage()
        .then(function (base64) {
            document.getElementById('exampleDrawTextImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

document.getElementById('examplePerspective').addEventListener('change', function (e) {
    new BrowserImageManipulation()
        .loadBlob(e.target.files[0])
        .perspective({
            xy0: ['0%', '8%'],
            xy1: ['100%', '20%'],
            xy2: ['100%', '92%'],
            xy3: ['0%', '100%']
        })
        .saveAsImage('image/png')
        .then(function (base64) {
            document.getElementById('examplePerspectiveImg').src = base64
        }).catch(function (e) { alert(e.toString()) })
})

function uploadToServer (blob, insertToId) {
    var img = document.getElementById(insertToId)

    var canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 50
    var ctx = canvas.getContext('2d')
    ctx.font = '40px'
    ctx.fillStyle = 'red'
    ctx.fillText('Emulate uploading to server...', 5, 10)
    img.src = canvas.toDataURL()

    setTimeout(function () {
        img.src = URL.createObjectURL(blob)
    }, 3000)
}