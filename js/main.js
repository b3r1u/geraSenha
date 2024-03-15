let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");
let sizePassword = document.querySelector("#valor");
let password = document.querySelector("#password");
let containerPassword = document.querySelector("#container-password");
let rep = document.querySelector('#cb3-8');

let facilPronunciarOption = document.querySelector("#facil_pronunciar");
let facilLerOption = document.querySelector("#facil_ler");
let todosCaracteresOption = document.querySelector("#todos_caracteres");

let progress = document.querySelector('.barra div');
let progresPass = document.querySelector('.barra');

let letraMaiuscula = document.querySelector('#letra_maiuscula');
let letraMinuscula = document.querySelector('#letra_minuscula');
let numeros = document.querySelector('#numeros');
let simbolos = document.querySelector('#simbolos');


//Escondendo o botão gerar senha

progresPass.classList.add("config")
buttonElement.classList.add("config")

// -----------------------------------

// Eventos dos Radios -----------------------------------------

facilPronunciarOption.addEventListener('change', (event) => {
    if(event.target.checked) {
        letraMaiuscula.checked = true;
        letraMinuscula.checked = true; 
        numeros.checked = false;
        simbolos.checked = false;
        buttonElement.classList.remove("config")
        
    }
})

facilLerOption.addEventListener('change', (event) => {
    if(event.target.checked) {
        letraMaiuscula.checked = true;
        letraMinuscula.checked = true; 
        numeros.checked = true;
        buttonElement.classList.remove("config")  
    }
})

todosCaracteresOption.addEventListener('change', (event) => {
    if(event.target.checked) {
        letraMaiuscula.checked = true;
        letraMinuscula.checked = true; 
        numeros.checked = true;
        simbolos.checked = true;
        buttonElement.classList.remove("config") 
    }
})

// ------------------------------------------------------------

sizePassword.innerHTML = sliderElement.value;

slider.oninput = function(){
    sizePassword.innerHTML = this.value;
}

let novaSenha = "";

function generatePassword() {
    let charset = "";
    
    if (facilPronunciarOption.checked) {
        for (let i = 97; i <= 122; i++) {
            charset += String.fromCharCode(i);
        }
        
        for (let i = 65; i <= 90; i++) {
            charset += String.fromCharCode(i);
        }
        
    } else if (facilLerOption.checked) {
        
        for (let i = 97; i <= 122; i++) {
            if (i !== 108) {
                charset += String.fromCharCode(i);
            }
        }
        
        for (let i = 65; i <= 90; i++) {
            if (i !== 73 && i !== 79) {
                charset += String.fromCharCode(i);
            }
        }
        
        for (let i = 48; i <= 57; i++) {
            if (i !== 48 && i !== 49) {
                charset += String.fromCharCode(i);
            }
            
        }

    } else if (todosCaracteresOption.checked) {
       
        for (let i = 97; i <= 122; i++) {
            charset += String.fromCharCode(i);
        }
        
        for (let i = 65; i <= 90; i++) {
            charset += String.fromCharCode(i);
        }
        
        for (let i = 48; i <= 57; i++) {
            charset += String.fromCharCode(i);
        }
        
        charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }   
    
    let pass = "";
    
    //Lógica para criação de caracteres sem repetição
    
    if(!rep.checked){
        
        let passwordSet = new Set();
        let passArray = [];
        
        while(passArray.length < sliderElement.value) {
            let newChar = charset.charAt(Math.floor(Math.random() * charset.length));
            
            if(!passwordSet.has(newChar)){
                passArray.push(newChar);
                passwordSet.add(newChar);
            }
        }
        
        pass = passArray.join("");

        console.log("Senha sem repetição gerada:", pass);
        
        containerPassword.classList.remove("hide");
        password.innerHTML = pass;
        novaSenha = pass;

        
        
    } else {
        let usedChar = new Set();
        
        for(let i = 0, n = charset.length; i < sliderElement.value; i++) {
            let newChar = '';
            do{
                newChar = charset.charAt(Math.floor(Math.random() * n));
            } while (usedChar.has(newChar));
            pass += newChar;
            usedChar.add(newChar);
        }

        //Lógica de confirmação de repetição de caractere
        
        let senha = pass.split(""); 
        let aleatorioIndice = Math.floor(Math.random() * senha.length);
        let aleatorioRemovido = senha.splice(aleatorioIndice, 1)[0];
        let caracterAleatorio = senha[Math.floor(Math.random() * senha.length)];
        senha.splice(aleatorioIndice, 0, caracterAleatorio);
        
        
        containerPassword.classList.remove("hide");
        pass = (senha.join(""));
        password.innerHTML = pass;
        novaSenha = pass;

        
    }

    calculateSecutiryLvl(novaSenha);
    
}

//Configuração barra de progresso

function calculateSecutiryLvl(pass){
   
    let nivel = 0;
    let length = pass.length;

    if(length >= 8 && length <= 11){
        nivel += 10;
    } else if(length >= 12 && length <= 15){
        nivel += 20;
    } else if(length >= 16 && length <= 20){
        nivel += 30;
    } else if(length >= 21 && length <= 25){
        nivel += 40;
    } else if(length >= 26){
        nivel += 50;
    }


   if(/[A-Z]/.test(pass)){
    nivel += 10;
   }

   if(/[a-z]/.test(pass)){
    nivel += 10;
   }

   if(/\d/.test(pass)){
    nivel += 10;
   }

   if(/[!@#$%^&*(),.?":{}|<>]/.test(pass)){
    nivel += 10;
   }
   
   if (!/(.)\1/.test(pass)) {
    nivel += 10;
   }

   
   progressPass(nivel);
   console.log(nivel)

}

function progressPass(nivel) {

    if(nivel <= 24){
        progress.setAttribute("style", `width: ${nivel}%`);
        progress.style.backgroundColor = '#FF0000'
    } else if(nivel <= 49){
        progress.setAttribute("style", `width: ${nivel}%`);
        progress.style.backgroundColor = '#FFFF00'
    } else {
        progress.setAttribute("style", `width: ${nivel}%`);
        progress.style.backgroundColor = '#00FF00'
    }
}

//----------------------------------

buttonElement.addEventListener('click', () => {
    generatePassword()
    progresPass.classList.remove("config")

})

function copyPassword() {
    navigator.clipboard.writeText(novaSenha);
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------