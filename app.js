//variables
const colorPickerBtn = document.querySelector('.color-piker');
const colorList = document.querySelector('.all-colors');
const clearAll = document.querySelector('.clear-all');
const pikedcolors = JSON.parse(localStorage.getItem('picked-colors') || '[]');

//*funciones
const copycolor = (elem) => {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText = 'COPIADO';
  setTimeout(() => (elem.innerText = elem.dataset.color), 1000);
};

//mostrar los colores guardados en la extension
const showColors = () => {
  if (!pikedcolors.length) return;
  colorList.innerHTML = pikedcolors
    .map(
      (color) => `<li class="color">
    <span class="rect" style="background: ${color}; border: 1px solid ${
        color === '#cabebe' ? '#000' : color
      } "></span>
    <span class="value" data-color="${color}">${color}</span>
  </li>`
    )
    .join('');
  document.querySelector('.piked-colors').classList.remove('hide');
  //copiar el color al que le demos click en la extencion
  document.querySelectorAll('.color').forEach((li) => {
    li.addEventListener('click', (e) =>
      copycolor(e.currentTarget.lastElementChild)
    );
  });
};
showColors();

const activeEyeDropper = () => {
  document.body.style.display = 'none';
  setTimeout(async () => {
    try {
      //*abir lupa y selecionar elementos
      const eyeDropper = new EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      navigator.clipboard.writeText(sRGBHex);

      if (!pikedcolors.includes(sRGBHex)) {
        pikedcolors.push(sRGBHex);
        //*inicializar local storage
        localStorage.setItem('picked-colors', JSON.stringify(pikedcolors));
        showColors();
      }
    } catch (error) {
      alert(`fallo al copiar`);
    }
    document.body.style.display = 'block';
  }, 10);
};

const clearAllColors = () => {
  pikedcolors.length = 0;
  localStorage.setItem('picked-colors', JSON.stringify(pikedcolors));
  document.querySelector('.piked-colors').classList.add('hide');
};

//evebtlistener
colorPickerBtn.addEventListener('click', activeEyeDropper);
clearAll.addEventListener('click', clearAllColors);
