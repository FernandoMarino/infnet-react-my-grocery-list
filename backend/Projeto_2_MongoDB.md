# Documentação da API - Smart Grocery List (Módulo MongoDB & Mongoose)

### Autor: Fernando Marino dos Santos

Este documento serve como a documentação oficial da API do backend **Smart Grocery List**, desenvolvida com **Node.js**, **Express**, **TypeScript** e **Mongoose (MongoDB)**. O sistema adota os princípios de Clean Architecture e SOLID para fornecer autenticação segura e gerenciamento persistente de listas de compras e seus itens.

---

## 1. Visão Geral da Arquitetura

O sistema é estruturado em camadas desacopladas com responsabilidades bem definidas:

1. **Camada de Apresentação (`Routes` e `Controllers`):**
    - Endpoints HTTP mapeados via Express.
    - Validação de contratos e dados de entrada interceptados via middlewares utilizando **Zod**.
    - Autenticação e autorização via JWT com middleware `ensureAuthenticated`.
    - Tratamento centralizado de exceções (`AppError` e `ZodError`).

2. **Camada de Negócio (`Services`):**
    - Encapsula as regras de domínio (ex: verificação de propriedade da lista, cálculo de status de checagem, validação de duplicidade).
    - Comunicação estrita com abstrações de persistência, garantindo independência de infraestrutura.

3. **Inversão de Controle e Injeção de Dependências (IoC / DIP):**
    - Os serviços dependem exclusivamente de abstrações/interfaces (`IShoppingListRepository`, `IUserRepository`, `IHashProvider`), desacoplando as regras de negócio das bibliotecas e tecnologias concretas.
    - A instanciação e ligação das dependências ocorrem através de contêineres de injeção (`DIcontainer`) e funções de fábrica centralizadas (`factories`).

4. **Camada de Infraestrutura e Persistência (`Mongoose`, `Models`, `Repositories`):**
    - Conexão com o banco NoSQL gerenciada de forma isolada em `mongo_database.ts`.
    - Repositórios concretos (`ShoppingListRepositoryMongoDB`, `UserRepositoryMongoDB`) encapsulam todas as operações de banco e realizam o mapeamento dos documentos para DTOs de negócio através de métodos internos (`toDTO`, `toItemDTO`).

---

## 2. Modelagem do Banco NoSQL em Documentos

O banco de dados foi modelado para aproveitar as vantagens do paradigma orientado a documentos do MongoDB:

- **Coleção `Users` (Model Independente):**
  Armazena credenciais e dados dos usuários autenticados, com índice exclusivo para e-mail.
- **Coleção `ShoppingLists` (Model Principal):**
  Armazena as listas criadas, vinculadas a um usuário através do campo referencial `userId` indexado.
- **Subdocumento `items` (Sem Model Próprio):**
  Os itens da lista de compras foram modelados como um **array de subdocumentos embutidos** (`ShoppingItemSchema`) diretamente dentro de `ShoppingLists`. Essa abordagem elimina a necessidade de JOINs relacionais, viabiliza alta coesão e garante leituras e mutações atômicas da lista e seus itens em uma única operação.

---

## 3. Operações Mongoose / ODM Implementadas

| Operação             | Mongoose / Operador                        | Endpoint                                 | Descrição                                                               |
| :------------------- | :----------------------------------------- | :--------------------------------------- | :---------------------------------------------------------------------- |
| **Pesquisa**         | `ShoppingListModel.find().lean()`          | `GET /api/lists`                         | Recupera todas as listas pertencentes ao usuário autenticado.           |
| **Cadastro (Lista)** | `new ShoppingListModel().save()`           | `POST /api/lists`                        | Criação de uma nova lista de compras.                                   |
| **Cadastro (Item)**  | `findOneAndUpdate` com `$push`             | `POST /api/lists/:listId`                | Insere atomicamente um novo item na lista com validação de duplicidade. |
| **Atualização**      | `findOneAndUpdate` com `$set` e `items.$.` | `PATCH /api/lists/:listId/:itemId/check` | Atualiza o status `checked` do item utilizando o operador posicional.   |
| **Exclusão**         | `findOneAndUpdate` com `$pull`             | `DELETE /api/lists/:listId/:itemId`      | Remove atomicamente o item especificado do array de subdocumentos.      |

---

## 4. Referência de Endpoints da API

Todos os endpoints da aplicação são prefixados com `/api`. Rotas protegidas exigem o cabeçalho `Authorization: Bearer <JWT_TOKEN>`.

### 4.1 Módulo de Usuários (`/users`)

O módulo de usuários foi atualizado para utilizar **Mongoose e MongoDB**, persistindo os dados na coleção `Users` e utilizando criptografia de senhas com `bcrypt`.

#### 4.1.1 Cadastro de Usuário (Register)
Cadastra um novo usuário no banco de dados com senha criptografada via hash.
* **Método:** `POST`
* **URL:** `/api/users`
* **Autenticação:** Não
* **Validação (Zod):** `name` (mín. 2 caracteres), `email` (formato de e-mail), `password` (mín. 6 caracteres), `role` (obrigatório).
* **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Fernando Marino",
    "email": "fernando@exemplo.com",
    "password": "SenhaSegura123",
    "role": "admin"
  }
  ```
* **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "message": "User Created Successfully",
    "user": {
      "id": "6ab8ae97b34fc98953bc9d39",
      "name": "Fernando Marino",
      "email": "fernando@exemplo.com",
      "role": "admin"
    }
  }
  ```
* **Respostas de Erro:**
  - `400 Bad Request`: Dados inválidos segundo o schema do Zod.
  - `409 Conflict`: E-mail já cadastrado no banco de dados.

---

#### 4.1.2 Autenticação de Usuário (Login)
Valida as credenciais do usuário comparando o hash da senha e emite um token JWT válido por 1 dia.
* **Método:** `POST`
* **URL:** `/api/users/login`
* **Autenticação:** Não
* **Corpo da Requisição (JSON):**
  ```json
  {
    "email": "fernando@exemplo.com",
    "password": "SenhaSegura123"
  }
  ```
* **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "message": "Login successful",
    "userEmail": "fernando@exemplo.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
* **Respostas de Erro:**
  - `400 Bad Request`: Campos obrigatórios não preenchidos.
  - `401 Unauthorized`: E-mail não encontrado ou senha incorreta.

---

#### 4.1.3 Listar Usuários Cadastrados
Recupera todos os usuários cadastrados na coleção do MongoDB (com exclusão do campo `passwordHash`).
* **Método:** `GET`
* **URL:** `/api/users`
* **Autenticação:** Não
* **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "users": [
      {
        "_id": "6ab8ae97b34fc98953bc9d39",
        "name": "Fernando Marino",
        "email": "fernando@exemplo.com",
        "role": "admin",
        "createdAt": "2026-09-27T20:00:00.000Z"
      }
    ]
  }
  ```
* **Respostas de Erro:**
  - `404 Not Found`: Nenhum usuário registrado no banco de dados.

---

### 4.2 Módulo de Listas de Compras (`/lists`)

Gerencia as listas de compras e seus itens embutidos como subdocumentos atômicos no MongoDB.

#### 4.2.1 Recuperar Todas as Listas (Pesquisa)
Retorna todas as listas de compras pertencentes ao usuário autenticado (extraído do token JWT).
* **Método:** `GET`
* **URL:** `/api/lists`
* **Autenticação:** Sim (`Authorization: Bearer <TOKEN>`)
* **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "lists": [
      {
        "_id": "6ab9f250f98877e7df305884",
        "userId": "6ab8ae97b34fc98953bc9d39",
        "title": "Lista CostCo",
        "items": [
          {
            "_id": "6ab9f268f98877e7df305886",
            "name": "Detergente",
            "quantity": 2,
            "checked": true
          }
        ]
      }
    ]
  }
  ```
* **Respostas de Erro:**
  - `401 Unauthorized`: Token ausente ou inválido.
  - `404 Not Found`: Usuário não possui listas criadas.

---

#### 4.2.2 Criar Nova Lista (Inclusão de Documento)
Cria uma nova lista de compras vazia associada ao `userId` do usuário autenticado.
* **Método:** `POST`
* **URL:** `/api/lists`
* **Autenticação:** Sim (`Authorization: Bearer <TOKEN>`)
* **Corpo da Requisição (JSON):**
  ```json
  {
    "title": "Lista CostCo"
  }
  ```
* **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "message": "Lista CostCo successfully created",
    "newList": {
      "_id": "6ab9f250f98877e7df305884",
      "userId": "6ab8ae97b34fc98953bc9d39",
      "title": "Lista CostCo",
      "items": []
    }
  }
  ```
* **Respostas de Erro:**
  - `400 Bad Request`: Título da lista inválido ou ausente.
  - `401 Unauthorized`: Token não informado ou inválido.

---

#### 4.2.3 Inserir Item na Lista (Inclusão de Subdocumento com `$push`)
Insere atomicamente um novo item no array de subdocumentos da lista especificada.
* **Método:** `POST`
* **URL:** `/api/lists/:listId`
* **Autenticação:** Sim (`Authorization: Bearer <TOKEN>`)
* **Parâmetros de Rota:**
  - `listId`: `_id` da lista de compras.
* **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Detergente Dawn",
    "quantity": 3,
    "unitOfMeasure": "un"
  }
  ```
  *(Campos `quantity` e `unitOfMeasure` são opcionais. Unidades aceitas: `un`, `kg`, `g`, `L`, `ml`, `pct`, `cx`, `oz`, `gal`).*
* **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "message": "Lista CostCo successfully created",
    "newList": {
      "_id": "6ab9f250f98877e7df305884",
      "userId": "6ab8ae97b34fc98953bc9d39",
      "title": "Lista CostCo",
      "items": [
        {
          "_id": "6aba0fad7ec2d16aeefb84af",
          "name": "Detergente Dawn",
          "quantity": 3,
          "unitOfMeasure": "un",
          "checked": false
        }
      ]
    }
  }
  ```
* **Respostas de Erro:**
  - `400 Bad Request`: Payload não validado pelo Zod.
  - `404 Not Found`: Lista informada não encontrada.
  - `409 Conflict`: Item com este nome já existe nesta lista.

---

#### 4.2.4 Alternar Marcação do Item (Atualização com `$set`)
Atualiza o status `checked` de um item embutido utilizando o operador posicional `items.$.checked`.
* **Método:** `PATCH`
* **URL:** `/api/lists/:listId/:itemId/check`
* **Autenticação:** Sim (`Authorization: Bearer <TOKEN>`)
* **Parâmetros de Rota:**
  - `listId`: `_id` da lista.
  - `itemId`: `_id` do item a ser alterado.
* **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "message": "Detergente Dawn checked successfully",
    "updatedList": {
      "_id": "6aba0fad7ec2d16aeefb84af",
      "name": "Detergente Dawn",
      "quantity": 3,
      "checked": true
    }
  }
  ```
* **Respostas de Erro:**
  - `401 Unauthorized`: Não autenticado.
  - `403 Forbidden`: Usuário não é o proprietário desta lista.
  - `404 Not Found`: Lista ou item não encontrados.

---

#### 4.2.5 Excluir Item da Lista (Exclusão com `$pull`)
Remove atomicamente o item do array de subdocumentos da lista utilizando `$pull`.
* **Método:** `DELETE`
* **URL:** `/api/lists/:listId/:itemId`
* **Autenticação:** Sim (`Authorization: Bearer <TOKEN>`)
* **Parâmetros de Rota:**
  - `listId`: `_id` da lista.
  - `itemId`: `_id` do item a ser removido.
* **Resposta de Sucesso (`202 Accepted`):**
  ```json
  {
    "message": "Item deleted successfully",
    "updateList": {
      "_id": "6ab9f250f98877e7df305884",
      "userId": "6ab8ae97b34fc98953bc9d39",
      "title": "Lista CostCo",
      "items": []
    }
  }
  ```
* **Respostas de Erro:**
  - `401 Unauthorized`: Token inválido ou expirado.
  - `403 Forbidden`: Usuário não tem permissão para manipular esta lista.
  - `404 Not Found`: Lista ou item inexistentes.

---

## 5. Declaração do Uso de Ferramentas de Inteligência Artificial

Em estrito cumprimento às instruções do enunciado e ao código de integridade acadêmica da instituição, declara-se a utilização de ferramentas de Inteligência Artificial nas seguintes tarefas autorizadas:

1. **Gemini 3.1 Pro:**
   - Apoio na **Depuração** de erros de tipagem e tempo de execução em TypeScript.
   - **Pesquisa e Consulta de Sintaxe** dos operadores atômicos e métodos do ODM Mongoose e MongoDB (ex: `$push`, `$pull` e `$set` com operador posicional). 
   
2. **Antigravity (Gemini 3.8 Flash High):**
   - Apoio na estruturação, formatação e revisão desta **Documentação Técnica** (`Projeto_MongoDB.md`).

A concepção da arquitetura, a modelagem dos documentos e subdocumentos, a implementação dos repositórios e o desenvolvimento de todas as operações de negócios e persistência foram executadas manualmente e devidamente compreendidas.
