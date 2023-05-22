## 👋 Fala Dev,

> A seguir teremos anotações sobre a masterclass da rocketseat de typescript, trabalhando em um projeto backend e frontend, a seguir teremos instruções e anotações sobre o projeto. Fique aí e embarque porque foguete não tem ré 🚀

---

## 📝 Notas (importantes)

-

## 📋 Lista de Conteúdo

```toc

```

## ℹ️ Sobre

> O projeto irá abordar o typescript dentro do ambiente de desenvolvimento de backend e frontend, sendo NodeJs o backend e React o frontend.

## 🗄️ Backend

### Configuração do Projeto

Dentro de um arquivo backend dentro do projeto criado, instale as dependências necessárias para configurar o projeto:

```bash
yarn init -y
```

Caso esteja utilizando o npm:

```bash
npm init -y
```

Após a instalação do projeto, você pode dar um comando `ls` para verificar se o package.json está instalado. Caso esteja, pode dar prosseguimento com a instalação do typescript como ferramenta de desenvolvimento através do comando:

```bash
yarn add -D typescript
```

> A própria [documentação](https://www.typescriptlang.org/download) do typescript recomenda que você utilize a versão global, porém utilizar como ferramenta de desenvolvimento garante que você sempre terá acesso a versão instalada para aquele projeto específico

Após a instalação do typescript podemos dar início ao desenvolvimento do backend utilizando o [Express](https://expressjs.com/pt-br/).

```bash
yarn add express
```

Ao importar o express no arquivo `index.ts` dentro do diretório `src` você
irá perceber que a tipagem e o intelisense ainda não funcionam, então para isso devemos adicionar a biblioteca de tipos do express como dependência de desenvolvimento.

```bash
yarn add @types/express -D
```

A partir da instalação dos tipos o express e o IDE consegue utilizar o intelisense ao codar, então pressionado `CTRL + ESPAÇO` você terá acesso a tipagem do express.

Vamos iniciar desenvolvendo apenas uma rota inicial bem simples:

#### **Index.ts**

```typescript
import * as express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(3333);
```

Para rodar projetos NodeJs, geralmente utilizamos o comando `node src/index.ts` porém o node não consegue rodar arquivos de typescript, e para isso utilizamos uma dependência instalada junto com o typescript. O arquivo fica localizado dentro da pasta `node_modules/.bin/tsc` e podemos utilizá-lo através do comando:

```bash
yarn tsc src/index.ts
```

Esse comando irá compilar o arquivo Typescript e gerar o arquivo JS para podermos compilar com NodeJS.

```bash
node src/index.js
```

### Configurações do Typescript

Após conseguir rodar a aplicação no localhost, é a hora de configurarmos o typescript, e para isso podemos usar o comando para gerar nosso arquivo de configuração JSON:

```bash
yarn tsc --init
```

> Depois que o arquivo `tsconfig.json` é gerado, a chave "esModuleInterop" assegura que podemos fazer a importação do express como default, note que no arquivo que escrevemos (vide [[#Index.ts]] ) não permitiu exportarmos o express como default, porém com esModuleInterop configurado para `true` podemos importá-lo como default e o typescript já reconhece apontando o erro no arquivo.

Após o arquivo tsconfig.json ser gerado, voltamos ao index.ts para finalizar a configuração.

```typescript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(3333);
```

Uma das alterações que precisam ser feitas dentro do arquivo `tsconfig.json ` é no `outDir` que nada mais é do que a informação de onde nosso arquivo de saída vai estar.

```json
{
...,
"outDir": "./dist",
}
```

Agora podemos remover o arquivo `index.js` gerado anteriormente e podemos rodar o seguinte comando, uma vez que já temos o arquivo de configuração criado e configurado.

```bash
yarn tsc
```

Direcionamos nosso arquivo compilado para a pasta dist, que é onde ficará nossa aplicação após darmos o build nela, porém o trabalho de ficar digitando `yarn tsc` toda vez que alguma alteração ocorre, pode ser bem trabalhoso, por isso utilizamos um fluxo de desenvolvimento para automatizar esse processo e ter um feedback em tempo real.

Podemos realizar isso de inúmeras maneiras, geralmente dentro de projetos [Node](https://nodejs.org/en/docs/guides) utilizamos o [Nodemon](https://www.npmjs.com/package/nodemon), porém existe inúmeras maneiras de se fazer isso como o [Babel](https://babeljs.io/) e o [Sucrase](https://sucrase.io/) , porém o `Sucrase` não possui suporte para os [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#handbook-content). Então para garantir o suporte utilizaremos a biblioteca [ts-node-dev](https://www.npmjs.com/package/ts-node-dev).

> Caso queira entender melhor sobre a escolha de utilização do
> `ts-node-dev`, recomendo a leitura desse [Artigo](https://blog.rocketseat.com.br/ferramentas-de-compilacao-execucao-em-tempo-de-desenvolvimento-dos-projetos-em-node-js/)

```bash
yarn add -D ts-node-dev
```

Após a instalação do [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) podemos configurar o arquivo `package.json` :

#### **Package.json**

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  }
}
```

> A flag `--transpileOnly` fica responsável por apenas transpilar o código para `Javascript`, e não verificar se o código `ts` está correto. vide [documentação](https://www.npmjs.com/package/ts-node-dev)

Com o script configurado, tudo que precisamos fazer é rodar o comando com yarn, e **Não** será necessário a utilização do **`Nodemon`** , apenas o **`ts-node-dev`**.

```bash
yarn dev
```
