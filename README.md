# Teste backend da Liven (Solução)

![GitHub repo size](https://img.shields.io/github/repo-size/taciossbr/teste-backend-liven?style=for-the-badge)

Solução de teste técnico para Backend da Liven, a ideia do projeto e uma API simples para registro de usuários e de endereços.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente do Docker

## 🚀 Executando

Para executar o projeto, siga estas etapas:

```bash
cp docker-compose.development.yml docker-compose.override.yml

docker-compose up # Depois que os conteiners iciarem encerre o processo
docker-compose run app npx knex migrate:latest

docker-compose up
```

