// funcionamiento carrusel

const container = document.getElementById('carousel'),
    buttonLeft = document.getElementById('button-left'),
    buttonRight = document.getElementById('button-right');

const setPosition = function(num) {container.style.setProperty('--position', num)};
var position = 1;

buttonLeft.addEventListener('click', () => {
    if (position>1) {
        position--;
        setPosition(position);
        if(position==1){
            buttonLeft.style.setProperty("visibility", "hidden");
        }else if(position==4){
            buttonRight.style.setProperty("visibility", "visible");
        }
    }  
    
});

buttonRight.addEventListener('click', () => {
    if (position<5) {
        position++;
        setPosition(position);
        if(position==5){
            buttonRight.style.setProperty("visibility", "hidden");
        }else if(position==2){
            buttonLeft.style.setProperty("visibility", "visible");
        }
    }  
});


// funcionamiento enviar email

const buttonSend = document.getElementById('sendEmail')
buttonSend.addEventListener('click', (event)=> {
    event.preventDefault()
    let Name = document.getElementById('input-name').value,
    Email = document.getElementById('input-email').value,
    Phone = document.getElementById('input-tel').value,
    Message = document.getElementById('input-menssage').value
    Recaptcha = grecaptcha.getResponse();
    
    if (Name!='' & Email!='' & Phone!='' & Message!='' & Recaptcha !=0) {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post('https://formsubmit.co/ajax/c649fc1ce0e6a95831be5af5e93d5957', {
            nombre: Name,
            telefono: Phone,
            email: Email,
            mensaje: Message,
            _subject: "Nuevo cliente",
            _template: "table"
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
    
});