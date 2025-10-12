//Teste de cópia


/*alert(`Seu saldo na conta é: ${"1500,00"}` )
let nome = prompt('Nome do usuário');
alert('Boas vindas ao nosso site '+ nome);// tem situações em que a virgula não funciona. Este é um destes casos
let diaSemana = prompt("Qual é o dia da semana?")
if (diaSemana=="sábado" || diaSemana=="domingo") 
    {
        alert("Bom fim de Semana!")
    }
    else{
        alert("Boa Semana!")
    }
console.log ("nome: "+nome) // o console.log tem que ser entre parentesis
let idade = prompt('Qual a sua idade?')
console.log ("idade: "+idade)
if (idade>18)
     {        
    alert("Pode tirar a Habilitação! " + nome);
}
else{
    if (idade<0) {
        alert("A idade está negativa!");
        
    }
}



let number = prompt("Qual o número?");
let base = 0;

while (base <= number) {
    console.log('O número é: ' + base);
    base++;

}
    */

let nome = "gilvan";
console.log('Olá, ' + nome);
let lingua = prompt('Qual a sua liguagem de programação favorita?');
console.log(lingua);
let valor1 = parseInt(Math.random()*401-200);
let valor2 = parseInt(Math.random()*401-200);
let resultadoSum = valor1 + valor2;
let resultadoSub = valor1 - valor2;
console.log("A soma de " +valor1 + " e "+  valor2 +  " é igual a "+ resultadoSum);
console.log("A diferença de " +valor1 + " e "+  valor2 +  " é igual a "+ resultadoSub);

if (valor1>0) {
    console.log("O número é positivo!")
    
} else {if (valor1 ==0) {
    console.log("O número é ZERO!")
    
}
    console.log("O número é negativo!")
}

while (valor1<0) {
    console.log(valor1);
    valor1++;
    
}

console.log("Número aleatório de 0 a a 1000: " + parseInt(Math.random()*1000));