const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.querySelector('.close-button');
  const minimizeButton = document.querySelector('.minimize-button');
  const maximizeButton = document.querySelector('.maximize-button');

  closeButton.addEventListener('click', () => {
    ipcRenderer.send('close-window');
  });

  minimizeButton.addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
  });

  maximizeButton.addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
  });
});