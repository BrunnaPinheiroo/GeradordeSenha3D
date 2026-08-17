// ===== ESCAPE ROOM JS: GERADOR DE SENHAS COMPLETO =====


// ==========================================
// 1. SELEÇÃO DE ELEMENTOS E VARIÁVEIS
// ==========================================

const numeroSenha = document.querySelector('.parametro-senha__texto');

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;


// ==========================================
// 2. CARACTERES DA SENHA
// ==========================================

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';

const numeros = '0123456789';

const simbolos = '!@#$%&*?';


// Emojis separados por vírgula
const emojis = [
    '😀',
    '😎',
    '🔥',
    '💎',
    '🚀',
    '🌈',
    '⭐',
    '❤️',
    '💜',
    '💙',
    '💚',
    '🖤',
    '🤍',
    '👑',
    '🎯',
    '⚡',
    '🌟',
    '🍀',
    '🦄',
    '🐱',
    '🐶',
    '🌸',
    '🌺'
];


// ==========================================
// 3. ELEMENTOS DO HTML
// ==========================================

const botoes = document.querySelectorAll('.parametro-senha__botao');

const campoSenha = document.querySelector('#campo-senha');

const checkbox = document.querySelectorAll('.checkbox');

const forcaSenha = document.querySelector('.forca');

const valorEntropia = document.querySelector('.entropia');


// ==========================================
// 4. BOTÕES
// ==========================================

botoes[0].onclick = diminuiTamanho;

botoes[1].onclick = aumentaTamanho;


function diminuiTamanho() {

    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


function aumentaTamanho() {

    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;

    geraSenha();
}


// ==========================================
// 5. CHECKBOXES
// ==========================================

for (let i = 0; i < checkbox.length; i++) {

    checkbox[i].onclick = geraSenha;

}


// ==========================================
// 6. GERAR SENHA
// ==========================================

function geraSenha() {

    let alfabeto = [];

    
    // Letras maiúsculas
    if (checkbox[0].checked) {

        alfabeto.push(...letrasMaiusculas.split(''));

    }


    // Letras minúsculas
    if (checkbox[1].checked) {

        alfabeto.push(...letrasMinusculas.split(''));

    }


    // Números
    if (checkbox[2].checked) {

        alfabeto.push(...numeros.split(''));

    }


    // Símbolos
    if (checkbox[3].checked) {

        alfabeto.push(...simbolos.split(''));

    }


    // Emojis
    if (checkbox[4] && checkbox[4].checked) {

        alfabeto.push(...emojis);

    }


    // ==========================================
    // SE NENHUMA OPÇÃO ESTIVER MARCADA
    // ==========================================

    if (alfabeto.length === 0) {

        campoSenha.value = '';

        forcaSenha.classList.remove(
            'fraca',
            'media',
            'forte'
        );

        valorEntropia.textContent = '';

        return;
    }


    // ==========================================
    // CRIAR A SENHA
    // ==========================================

    let senha = '';


    for (let i = 0; i < tamanhoSenha; i++) {

        const numeroAleatorio =
            Math.floor(Math.random() * alfabeto.length);

        senha += alfabeto[numeroAleatorio];

    }


    // Coloca a senha no campo
    campoSenha.value = senha;


    // Classifica a força
    classificaSenha(alfabeto.length);

}


// ==========================================
// 7. CLASSIFICAR A FORÇA
// ==========================================

function classificaSenha(tamanhoAlfabeto) {

    const entropia =
        tamanhoSenha * Math.log2(tamanhoAlfabeto);


    console.log(entropia);


    forcaSenha.classList.remove(
        'fraca',
        'media',
        'forte'
    );


    if (entropia > 57) {

        forcaSenha.classList.add('forte');

    } else if (entropia > 35) {

        forcaSenha.classList.add('media');

    } else {

        forcaSenha.classList.add('fraca');

    }


    // ==========================================
    // TEMPO PARA DESCOBRIR A SENHA
    // ==========================================

    const dias = Math.floor(
        2 ** entropia /
        (100e6 * 60 * 60 * 24)
    );


    valorEntropia.textContent =
        'Um computador pode levar até ' +
        dias +
        ' dias para descobrir essa senha.';

}


// ==========================================
// 8. PRIMEIRA SENHA
// ==========================================

geraSenha();

