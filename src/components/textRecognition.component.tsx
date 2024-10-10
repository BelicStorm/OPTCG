import React, { useState, useEffect } from 'react';
import dataset from "../services/dataset.json"
import * as tf from '@tensorflow/tfjs';

const IMAGE_SIZE = 150;

function PredictionApp() {
  const [model, setModel] = useState<any>(null);
  const [NUM_CLASSES, setClassess] = useState<any>(1);
  const [training, setTraining] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  // Cargar las imágenes desde las URLs en el JSON
  const loadImage = async (url:any) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const tensor = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([IMAGE_SIZE, IMAGE_SIZE])
          .toFloat()
          .div(tf.scalar(255.0))
          .expandDims(0);
        resolve(tensor);
      };
      img.onerror = (error) => reject(error);
    });
  };

  // Cargar el dataset desde el archivo JSON
  const loadDataset = async (data:any) => {

    const imageTensors:any = [];
    const labelTensors:any = [];
    for (const item of data) {
      const imageTensor = await loadImage(item.image);
      imageTensors.push(imageTensor);

      // Convertir las etiquetas en índices numéricos
      const labelIndex = item.id // Ajusta según tus clases
      const labelTensor = tf.oneHot(tf.tensor1d([labelIndex]).toInt(), NUM_CLASSES);
      labelTensors.push(labelTensor);
    }

    // Apilar todas las imágenes y etiquetas
    const xs = tf.concat(imageTensors);
    const ys = tf.concat(labelTensors);

    return { xs, ys };
  };

  // Definir el modelo CNN
  const createModel = () => {

    const model:any = tf.sequential();
    model.add(tf.layers.conv2d({
      inputShape: [IMAGE_SIZE, IMAGE_SIZE, 3],
      filters: 32,
      kernelSize: 3,
      activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
    model.add(tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: NUM_CLASSES, activation: 'softmax' }));

    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  };

  // Entrenar el modelo
  const trainModel = async () => {
    setTraining(true);
    // const data = await response.json();
    setClassess(dataset.length + 1)
    const model:any = createModel();
    const { xs, ys } = await loadDataset(dataset);
    await model.fit(xs, ys, {
      epochs: 10,
      batchSize: 32,
      validationSplit: 0.2
    });

    setModel(model);
    await model.save('localstorage://my-model');
    setTraining(false);
  };

  // Hacer una predicción con una nueva imagen
  const predict = async (url:any) => {
    if (!model) {
      alert('Por favor entrena el modelo primero.');
      return;
    }

    const imageTensor = await loadImage(url);
    const prediction = model.predict(imageTensor);
    const predictedIndex:any = prediction.argMax(-1).dataSync()[0];
    setPrediction(predictedIndex === 0 ? 'Ace of Spades' : 'King of Hearts');
  };

  // Cargar el modelo guardado desde el almacenamiento local
  const loadSavedModel = async () => {
    const loadedModel = await tf.loadLayersModel('localstorage://my-model');
    setModel(loadedModel);
  };

  return (
    <div className="App">
      <h1>Reconocimiento de Cartas</h1>
      <button onClick={trainModel} disabled={training}>
        {training ? 'Entrenando Modelo...' : 'Entrenar Modelo'}
      </button>
      <button onClick={loadSavedModel}>Cargar Modelo Guardado</button>
      
      <br /><br />
      <input type="text" placeholder="URL de la imagen" id="image-url" />
      {/* <button onClick={() => predict(document.getElementById('image-url')?.value)}>
        Predecir Carta
      </button> */}

      {prediction && <h3>Predicción: {prediction}</h3>}
    </div>
  );
}

export default PredictionApp;
