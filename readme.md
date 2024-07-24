**## Objetivo**

> Implementar uma API RESTful para uma plataforma onde clientes podem contratar
> prestadores de serviços. A API deve permitir o gerenciamento de usuários (clientes e
> prestadores de serviços), criação de serviços, contratação de serviços, e
> gerenciamento de transações financeiras.
•
Escolha qualquer framework Node.js que se sinta confortável em trabalhar.
Preferimos que utilize Nest.js, mas fique à vontade para escolher outro se
preferir;
•
Você pode, inclusive, não optar por framework nenhum. Neste caso,
recomendamos a implementação do serviço via script para diminuir a
sobrecarga de criar um servidor web;
•
Ainda assim, se optar por um framework tente evitar usar muitos métodos
mágicos ou atalhos já prontos. Sabemos que essas facilidades aumentam a
produtividade no dia-a-dia, mas aqui queremos ver o seu código e a sua
forma (lógica) de/ao resolver os problemas.

**1. Requisitos & Funcionalidades Básicas:**

> Cadastro de Usuarios:
•Dados necessários: Nome Completo, NIF, E-mail, Senha.
•NIF e E-mail devem ser únicos no sistema.
•Tipos de usuário: Cliente, Prestador.

**1.2. Autenticaçao e Autorizaçao:**
> •Usuários devem se autenticar para aceder a API.
> •Utilizar JWT para autenticação.

**1.3. Gerenciamento Gestao de Serviços:**
> •Prestadores podem criar serviços que oferecem.
> •Cada serviço deve ter um título, descrição, preço e prestador associado.

**1.4 Contrataçao de Serviços:**
> •Clientes podem contratar serviços de prestadores.
> •Antes da contratação, verificar se o cliente tem saldo suficiente.
> •Atualizar o saldo do cliente e do prestador após a contratação.

**2. Funcionalidades Avançadas:**

**4.1. Historico de Transaçoes:**
•
> Manter um histórico de todas as transações realizadas na plataforma.

**2.2. Validaçoes:**
•
> Verificar se o usuário autenticado tem permissão para criar, atualizar ou
> excluir um serviço.
•
Garantir que o saldo do cliente seja atualizado de forma atômica.




**Para rodar o projecto**

> 1-fazer o clone do projecto
> 2-instalar as dependencias
> 3-adicionar a variavel de ambiente .env
> 
`.env`

`npm install`

`npm install @prisma/client`

`npx prisma migrate dev`

`npm run dev`