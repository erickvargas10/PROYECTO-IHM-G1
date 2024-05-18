const MODEL_URL = '/models';
const genero="male"
faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
faceapi.nets.ageGenderNet.loadFromUri('/models'),
faceapi.nets.faceExpressionNet.loadFromUri('/models'),
faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
(async () => {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    await faceapi.loadFaceExpressionModel(MODEL_URL)
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    const image = document.getElementById('inputVideo');
    const canvas = document.getElementById('canvas');
    const detections = await faceapi.detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withAgeAndGender()
        .withFaceExpressions()
         // ponerlas en su sitio
         const resizedDetections = faceapi.resizeResults(detections, canvas)
         // limpiar el canvas
         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
       // dibujar las líneas
       faceapi.draw.drawDetections(canvas, resizedDetections)
       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
       faceapi.draw.drawFaceExpressions(canvas, resizedDetections)    
       resizedDetections.forEach(detection => {
            const box = detection.detection.box
            new faceapi.draw.DrawBox(box, {
                label: Math.round(detection.age) + ' años ' + detection.gender
            }).draw(canvas)
            let entero =parseInt(detection.age)
            alert("Edad reconocida: "+ entero + " años de edad")
            if (genero==detection.gender){
            } else{
              alert("ACCESOS NO AUTORIZADO")
              return
            }
            function validarRango(numero, minimo, maximo) {
                if (numero >= minimo && numero <= maximo) {
                    return true; // El número está dentro del rango
                } else {
                    return false; // El número está fuera del rango
                }
            }
            if (validarRango(entero, 30, 50)) {
                alert("ACCESO AUTORIZADO")
                function abrirURL(url) {
                 // window.open(url, '_blank');
                  window.location.href=url;
                }
                abrirURL('http://127.0.0.1:5500/perfil.html');
            } else {
                alert("ACCESO NO AUTORIZADO")
            }
  
        })
  })
  ();