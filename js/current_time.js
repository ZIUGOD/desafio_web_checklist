const agora = new Date();

const semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const meses  = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

let dia_atual = agora.getDate();
const mes_atual = meses[agora.getMonth()];
const ano_atual = agora.getFullYear();

const data_atual = (`${dia_atual} de ${mes_atual} de ${ano_atual}`);
const dia_semana = semana[agora.getDay()];

let hora_atual = agora.getHours();
let min_atual  = agora.getMinutes();

if (dia_atual < 10) {
    dia_atual = `0${dia_atual}`;
}

if (hora_atual < 10) {
    hora_atual = `0${hora_atual}`;
}

if (min_atual < 10) {
    min_atual = `0${min_atual}`;
}

const relogio = `${hora_atual}:${min_atual}`;

document.querySelector('#data-atual').innerHTML = `${dia_atual} de ${mes_atual} de ${ano_atual}`;
document.querySelector('#dia-semana').innerHTML = dia_semana;
document.querySelector('#hora-atual').innerHTML = relogio;

console.log(`console.log("Made by: ZIUGOD");`);
