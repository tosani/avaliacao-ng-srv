

# Avaliação

### Estrutura do projeto:
 - /avaliacao-svc: API com base no Spring Boot
 - /ng-avaliacao: Front-end com Angular 7

---

### Como rodar localmente e como seria possível realizar o deploy?

#### Opção 1 -  Docker :

 1. Instale o [docker](https://www.docker.com/products) caso não tenha no ambiente
 2. Clone o repositório no local desejado. 
 3. Crie uma imagem do docker compose (pode levar alguns minutos). 
	 Exemplo: `docker-compose -f docker-compose.yml -p avaliacao build `
 4. Rode a imagem criada (pode levar alguns minutos). 
	 Exemplo: `docker-compose -f docker-compose.yml -p avaliacao up -d`	 
 5. Não tem item 5. 
 
#### Opção 2 -  Docker (em 1 click .bat):

 1. Instale o [docker](https://www.docker.com/products) caso não tenha no ambiente
 2. Clone o repositório no local desejado. 
 3. Execute o docker-compose-deploy.bat

#### Opção 3 - MVN e NPM:

 1. Clone o repositório no local desejado.
 2. Instale o maven caso não tenha instalado.
 3. No diretório avaliacao-svc, execute: `mvn clean install`
 4. Rode o jar spring boot: `java -jar target/avaliacao-1.0.0.jar`
 5. Instale o Node caso não tenha instalado.
 6. No diretorio ng-avaliacao execute: `npm install`
 7. Execute `ng serve -o` ou copie o conteúdo do diretório /dist para um servidor HTTP(Apache, IIS, nginx, etc)

#### Ajustes possiveis para alguns ambientes:

 - Pode ser necessário alterar a porta da api caso a 8080 esteja em uso, para isso basta alterar no arquivo **docker-compose.yml** (server.port: 8080) ou -Dserver.port=8080 caso esteja executando via java -jar
 
 - Caso desejar testar o front-end fora do ambiente de deploy, sera necessário alterar o endpoint configurado no arquivo environment.ts (ng-avaliacao\src\environments\environment.ts), propriedade **BASE_SERVICE_URL**.
---

### Como acessar?
##### Swagger Doc API: 
[http://localhost:8080/swagger-ui.html#/](http://localhost:8080/swagger-ui.html#/)

##### Aplicação em Angular 7:
http://localhost/



---
*Paulo Tosani -  (22/02/2020)*
