# Frontend Test Bravi

## Execução via heroku

O teste está hospedado na heroku e pode ser acessado por esse link: https://frontend-test-bravi.herokuapp.com/

## Rodar via docker
### Requisitos:
- Você deve ter o backend instalado localmente ou via docker.

Você deve clonar o repositório `git clone https://github.com/itallocastro/test-bravi-frontend.git`
<br>
<br>
Depois você deve acessar a pasta do projeto e rodar: `docker build -t frontend-test-bravi .`
<br>
<br>
Após isso, você rodar `docker run -d -p 4200:80 frontend-test-bravi`
<br>
<br>

## Rodar localmente
### Requisitos:
- Node version: 12.x.x
- Angular-cli: 11.x.x

Você deve clonar o repositório `git clone https://github.com/itallocastro/test-bravi-frontend.git`
<br>
<br>
Depois você deve acessar a pasta do projeto e rodar: `npm install`
<br>
<br>
Depois você deve rodar: `ng serve` e a porta padrão será a 4200.
<br>
<br>
