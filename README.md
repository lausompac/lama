<h1 align="center">  
🎸 Labenu Music Awards 🎸
</h1>

Sistema de gerenciamento para organização de festival de música

Projeto final de backend - Módulo 5 - Labenu

## Sobre o projeto

API REST criada para gerenciar um festival de música. Nessa API, podemos cadastrar usuário, atrações musicais e efetuar reservas de ingressos. 
O projeto conta com autenticação JWT e Hash de senha, além de testes unitários. 
A API foi desenvolvida utilizado as tecnologias TYPESCRIPT, NODE.JS, EXPRESS.JS, MYSQL como banco de dados e JEST para testes unitários. Além disso, o projeto foi 
estruturado utilizando PROGRAMAÇÃO ORIENTADA A OBJETOS(POO).

## 📄Documentação

LINK POSTMAN

Os endpoints também podem ser testados diretamente no projeto através do arquivo ``requests.rest``

## 🚀 Deploy

LINK HEROKU

## ✔️ Features

👤 Cadastro/Login

- [x] O sistema deve permitir o registro de usuário. Para se cadastrar, é necessário fornecer um nome, um email válido e uma senha. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). Por padrão, o novo cadastro é registrado como cliente. O login do usuário acontece automaticamente após o cadastro.
- [x] Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário.

🎙 Registrar Atração

- [x] O sistema deve registrar todas as atrações que participarão dos cinco dias de festival. Para uma atração ser criada, é preciso fornecer nome e a data que a mesma se apresentará. Duas Atrações não podem tocar em um mesmo dia. Somente administradores podem registrar atrações.

🎸 Detalhes da Atração

- [x] Cada atração recebe um ID, nome, data e quantidade de ingressos disponíveis. 

🎟️ Reserva de ingressos

- [x] O sistema deve possibilitar a reserva de ingressos. Cada usuários pode reservar apenas 1 ingresso por show.
- [x] O sistema também deve permitir o cancelamento de reserva. Administradores tem permissão para cancelar qualquer reserva, enquanto cada cliente pode cancelar apenas sua própria compra.


<h2 id="back"> 🎲 Rodando o Backend (servidor)</h2>

### Pre-Requisitos

- Para rodar o projeto você vai precisar do [Node.JS](https://nodejs.org/en/download/),
- Uma instancia de um banco de dados MySQL
- Um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Como instalar e Rodar
* Para baixar o projeto
```
1. git clone https://github.com/lausompac/lama.git
2. cd lama
```
* Para instalar e rodar o projeto
```
3. npm install
4. npm dev
    ou
3. yarn install
4. yarn dev
```
* Para rodar os testes 
```
5. npm test
5. yarn test
```

Crie um arquivo ```.env``` na raiz do projeto e preencha as variáveis com seus dados do banco de dados MySQL. É muito importante para a execução do servidor.


## 🛠 Tecnologias utilizadas

- Typescript;
- Express;
- Cors;
- Knex; 
- SQL

## 🚀 Aplicações utilizadas

- VSCode;
- Beekeeper-Studio;
- Postman;

## 👨‍💻 Desenvolvedor:


<a href="https://github.com/lausompac">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/101334115?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Laura Campos</b></sub></a> <a href="https://github.com/lausompac" title="github"></a>
 <br>
 <br>



