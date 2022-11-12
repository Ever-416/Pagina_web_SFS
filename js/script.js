// funcionamiento carrusel
const container = document.getElementById('carousel'),
  buttonLeft = document.getElementById('button-left'),
  buttonRight = document.getElementById('button-right');

const setPosition = function (num) {
  container.style.setProperty('--position', num);
};
var position = 1;

buttonLeft.addEventListener('click', () => {
  if (position > 1) {
    position--;
    setPosition(position);
    if (position == 1) {
      buttonLeft.style.setProperty('visibility', 'hidden');
    } else if (position == 4) {
      buttonRight.style.setProperty('visibility', 'visible');
    }
  }
});

buttonRight.addEventListener('click', () => {
  if (position < 5) {
    position++;
    setPosition(position);
    if (position == 5) {
      buttonRight.style.setProperty('visibility', 'hidden');
    } else if (position == 2) {
      buttonLeft.style.setProperty('visibility', 'visible');
    }
  }
});

// funcionamiento enviar email

const formContact = document.getElementById('formContact'),
  Name = document.getElementById('input-name'),
  Email = document.getElementById('input-email'),
  Phone = document.getElementById('input-tel'),
  Message = document.getElementById('input-menssage'),
  Warning = document.getElementById('formWarning');

formContact.setAttribute('onsubmit', 'return sendForm();');

function popup(action, funct) {
  let overlay = document.getElementById('overlay'),
    items = document.querySelectorAll('#overlay .item');

  if (action === 'hidden') {
    overlay.classList.remove('active');
  } else {
    for (const element of items) {
      element.style.setProperty('display', 'none');
    }
    items[funct].style.setProperty('display', 'flex');
    overlay.classList.add('active');
  }
}

const popupButtons = document.querySelectorAll('#overlay .item button');
popupButtons[0].addEventListener('click', () => {
  popup('hidden', 0);
});
popupButtons[1].addEventListener('click', () => {
  popup('hidden', 0);
});

function clearForm() {
  (Name.value = ''),
    (Email.value = ''),
    (Phone.value = ''),
    (Message.value = ''),
    grecaptcha.reset();
  Warning.innerHTML = '';
}

function sendForm() {
  let Recaptcha = grecaptcha.getResponse(),
    acu = '';

  if (!/^[a-zA-Z ]{4,32}$/.test(Name.value.trim())) {
    acu += 'Campo nombre no valido<br>';
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email.value)) {
    acu += 'Campo Email no valido<br>';
  }
  if (!/^(3|\+57[ ]+3)([0-9]{6,6}|[0-9]{9,9})$/.test(Phone.value)) {
    acu += 'Campo teléfono no valido<br>';
  }
  if ((Message.value.trim().length < 10) | (Message.value.length > 500)) {
    acu += 'Campo mensaje no valido<br>';
  }
  if (Recaptcha.length == 0) {
    acu += 'Complete el captcha <br>';
  }

  if (acu == '') {
    popup('', 0);
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('https://formsubmit.co/ajax/c649fc1ce0e6a95831be5af5e93d5957', {
        nombre: Name.value.trim(),
        telefono: Phone.value.trim(),
        email: Email.value.trim(),
        mensaje: Message.value.trim(),
        _subject: 'Nuevo cliente',
        _template: 'table',
        _replyto: Email.value.trim(),
      })
      .then((response) => {
        if (response.status == 200) {
          popup('hidden', 0);
          popup('', 1);
          clearForm();
        }
      })
      .catch((error) => {
        popup('hidden', 0);
        popup('', 2);
        console.log(error);
      });
  } else {
    Warning.innerHTML = acu;
  }

  return false;
}
