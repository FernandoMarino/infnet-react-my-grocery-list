# Documentação da API - Smart Grocery List

Este documento serve como a documentação oficial da API do backend **Smart Grocery List**. O sistema foi construído utilizando Node.js, Express, TypeScript e Jest, implementando uma simulação de banco de dados em memória para gerenciar contas de usuários e suas respectivas listas de lojas favoritas.

---

## 1. Visão Geral da Arquitetura

Para atender aos padrões acadêmicos exigidos na rúbrica e garantir as melhores práticas de manutenibilidade de software, o projeto implementa os padrões de **Clean Architecture** (Arquitetura Limpa) e princípios **SOLID**:

1.  **Separação em Camadas (Coesão):**
    *   `Routes` ──► Mapeamento de endpoints HTTP e acoplamento de middlewares.
    *   `Controllers` ──► Captura requisições HTTP (body, params, usuário autenticado) e retorna respostas em JSON.
    *   `Services` ──► Executa as regras de negócio centrais (criptografia, validação de duplicidade, verificações).
    *   `Repositories` ──► Abstração de persistência física (simulada em memória RAM através de arrays locais).
2.  **Desacoplamento por Injeção de Dependência:**
    *   As dependências entre classes (como Repositories nos Services e Services nos Controllers) são injetadas estritamente via construtor.
    *   A instanciação da árvore de dependências é isolada das rotas através do padrão de **Layer Barrels (`index.ts`)**, que atuam como fábricas centralizadas, instanciando os *Singletons* de cada camada.
3.  **Segurança e Middlewares:**
    *   `ensureAuthenticated` ──► Middleware stateless que descriptografa assinaturas JWT utilizando a chave secreta e extrai o ID do usuário logado.
    *   `validateBody` ──► Middleware de validação que intercepta requisições e valida o payload com esquemas do **Zod v4** antes que cheguem aos controladores.
    *   `morgan` ──► Middleware interceptor para geração automática de logs de requisições no console do servidor.

---

## 2. Referência de Endpoints da API

Todos os endpoints da aplicação são prefixados com `/api`. Rotas privadas exigem o cabeçalho `Authorization: Bearer <JWT_TOKEN>`.

### 2.1 Módulo de Usuários (`/users`)

#### Cadastro de Usuário (Register)
*   **Método:** `POST`
*   **URL:** `/api/users`
*   **Autenticação Requerida:** Não
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "name": "Sophia",
      "email": "sophia@teste.com",
      "password": "SophiaPassword"
    }
    ```
*   **Resposta de Sucesso (`201 Created`):**
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "fa2abe40-6218-472e-8d9f-9efd8a23e59b",
        "name": "Sophia",
        "email": "sophia@teste.com",
        "createdAt": "2026-08-20T21:00:00.000Z",
        "updatedAt": "2026-08-20T21:00:00.000Z"
      }
    }
    ```
*   **Erros Possíveis:**
    *   `400 Bad Request` (Erros de validação, ex: senha curta ou formato de e-mail inválido).
    *   `409 Conflict` (Endereço de e-mail já cadastrado).

---

#### Login de Usuário (Authenticate)
*   **Método:** `POST`
*   **URL:** `/api/users/login`
*   **Autenticação Requerida:** Não
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "email": "sophia@teste.com",
      "password": "SophiaPassword"
    }
    ```
*   **Resposta de Sucesso (`201 Created`):**
    ```json
    {
      "message": "Login Successful",
      "user": {
        "id": "fa2abe40-6218-472e-8d9f-9efd8a23e59b",
        "name": "Sophia",
        "email": "sophia@teste.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Erros Possíveis:**
    *   `401 Unauthorized` (E-mail ou senha incorretos).

---

### 2.2 Módulo de Lojas (`/stores`)

#### Adicionar Loja Favorita (Create)
Associa uma loja à lista de favoritos do usuário logado. Se a loja não existir globalmente, ela é criada. Se já existir, o sistema reaproveita o registro e apenas cria a ponte na tabela de junção.
*   **Método:** `POST`
*   **URL:** `/api/stores`
*   **Cabeçalhos:** `Authorization: Bearer <JWT_TOKEN>`
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "name": "Costco Langley",
      "address": "20437 64 Ave",
      "city": "Langley",
      "province": "BC",
      "postalCode": "V3A 4M8",
      "country": "Canada"
    }
    ```
*   **Resposta de Sucesso (`201 Created`):**
    ```json
    {
      "message": "Store Created Successfully",
      "store": {
        "id": "7cc48ccc-3858-4b88-8449-97f91b5464f4",
        "name": "Costco Langley",
        "googlePlaceId": null,
        "address": "20437 64 Ave",
        "city": "Langley",
        "province": "BC",
        "postalCode": "V3A 4M8",
        "country": "Canada",
        "createdAt": "2026-08-20T21:10:00.000Z",
        "updatedAt": "2026-08-20T21:10:00.000Z"
      }
    }
    ```
*   **Erros Possíveis:**
    *   `401 Unauthorized` (Token JWT ausente ou inválido).
    *   `409 Conflict` (A loja já está favoritada por este usuário).

---

#### Listar Lojas do Usuário (Read)
Retorna a lista de todas as lojas vinculadas (favoritadas) pelo usuário autenticado.
*   **Método:** `GET`
*   **URL:** `/api/stores`
*   **Cabeçalhos:** `Authorization: Bearer <JWT_TOKEN>`
*   **Resposta de Sucesso (`200 OK`):**
    ```json
    {
      "message": "Stores retrieved successfully",
      "stores": [
        {
          "id": "7cc48ccc-3858-4b88-8449-97f91b5464f4",
          "name": "Costco Langley",
          "googlePlaceId": null,
          "address": "20437 64 Ave",
          "city": "Langley",
          "province": "BC",
          "postalCode": "V3A 4M8",
          "country": "Canada",
          "createdAt": "2026-08-20T21:10:00.000Z",
          "updatedAt": "2026-08-20T21:10:00.000Z"
        }
      ]
    }
    ```
*   **Erros Possíveis:**
    *   `404 Not Found` (O usuário logado não possui nenhuma loja vinculada).

---

#### Atualizar Detalhes da Loja (Update)
Atualiza as informações de uma loja (como endereço, código postal, etc.). O usuário logado deve ter a loja favoritada na sua lista para ter autorização de alteração.
*   **Método:** `PUT`
*   **URL:** `/api/stores/:id`
*   **Cabeçalhos:** `Authorization: Bearer <JWT_TOKEN>`
*   **Corpo da Requisição (JSON):** *(todos os campos opcionais; null remove o conteúdo)*
    ```json
    {
      "address": "20437 64 Ave Suite 100",
      "postalCode": "V2Y 1N5"
    }
    ```
*   **Resposta de Sucesso (`200 OK`):**
    ```json
    {
      "message": "Store updated successfully",
      "store": {
        "id": "7cc48ccc-3858-4b88-8449-97f91b5464f4",
        "name": "Costco Langley",
        "googlePlaceId": null,
        "address": "20437 64 Ave Suite 100",
        "city": "Langley",
        "province": "BC",
        "postalCode": "V2Y 1N5",
        "country": "Canada",
        "createdAt": "2026-08-20T21:10:00.000Z",
        "updatedAt": "2026-08-20T22:00:00.000Z"
      }
    }
    ```
*   **Erros Possíveis:**
    *   `404 Not Found` (A loja especificada não está vinculada à lista deste usuário).

---

#### Remover Loja dos Favoritos (Delete)
Desassocia a loja da lista do usuário logado (remove a ponte na tabela de junção sem deletar a loja física global do catálogo).
*   **Método:** `DELETE`
*   **URL:** `/api/stores/:id`
*   **Cabeçalhos:** `Authorization: Bearer <JWT_TOKEN>`
*   **Resposta de Sucesso (`200 OK`):**
    ```json
    {
      "message": "Store deleted successfully"
    }
    ```
*   **Erros Possíveis:**
    *   `404 Not Found` (O vínculo de loja especificado não existe para este usuário).
