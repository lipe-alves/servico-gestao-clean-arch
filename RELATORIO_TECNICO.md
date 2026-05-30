# Relatório Técnico

Aluno: Felipe Alves

Disciplina: Desenvolvimento de Sistemas Backend

Data: 28 de Maio de 2026

---

## Introdução

Sistema de gestão de assinaturas de planos de internet implementado com arquitetura de microsserviços. Quatro serviços independentes comunicam-se via RabbitMQ, cada um com banco de dados próprio, seguindo Clean Architecture e SOLID.

---

## 1. Diagrama de Estrutura (UML e Módulos)

A arquitetura segue um fluxo de dependências de fora para dentro, garantindo que o núcleo (Domínio) seja agnóstico a frameworks e infraestrutura.

Segue abaixo um diagrama do fluxo de dados:

![Diagrama de Estrutura](./imagens/fluxo-de-dados-gestao.png)

A comunicação entre a camada de domínio e os repositórios para a manipulação dos dados ocorre via interfaces, garantindo que o domínio seja agnóstico às implementações.

O mesmo ocorre para qualquer comunicação entre camadas mais internas e externas, sempre via interfaces (ex: Aplicação -> Adaptadores).

### Organização de Módulos

- **src/dominios** - Responsável por definir as regras de negócio. É a parte que mais se conecta com a lógica do mundo do negócio. Utiliza-se de modelos para representar "coisas" do mundo real e serviços para lidar com essas regras (ex: serviço de cliente, serviço de cadastro, etc.). Serviço apenas manipula modelos.

- **src/aplicacao** - Casos de Uso (Orquestração). Casos de uso também lidam com regras de negócio, porém, somente quando elas estiverem intimamente ligadas a mais de um domínio. Ex: Um caso de uso de agendamento de consulta pode utilizar internamente o domínio de pacientes, o domínio de unidades de atendimento, o domínio de especialidades, o domínio de profissionais, etc. Como a tarefa/ação "agendar" envolve muitas coisas ao mesmo tempo, o caso de uso serve como uma ferramenta para "orquestrar" os serviços de domínio. Um serviço tende a ser mais especializado que um caso de uso.

- **src/adaptadores** - Também chamada de "infra" ou "infraestrutura", é a camada "suja" da arquitetura. Implementações de Repositórios, Banco de Dados e Frameworks. Ter uma camada específica para isso nos permite, por exemplo, mudar de banco de dados (ex: TypeORM para Prisma ou MongoDB para MySQL) sem alterar as outras camadas (aplicação e domínio).

- **src/adaptadores/web** - Responsável por criar a ponte de conexão via HTTP. Aqui você verá controllers, middlewares, rotas, etc.

- **src/adaptadores/persistencia** - Responsável por criar a ponte de conexão com o banco de dados. Aqui você verá entidades, repositórios, etc. Entidades, de forma semelhante aos modelos, abstraem as tabelas ou coleções do banco de dados. Por exemplo: se temos uma tabela de pacientes, uma entidade de paciente. Nem sempre há uma equivalência entre entidades de persistência de dados e modelos de domínio. Para coisas mais básicas geralmente há uma relação de 1 para 1, mas, conforme a complexidade aumenta, pode haver uma relação de 1 para muitos ou muitos para muitos. Os repositórios, por outro lado, são classes que manipulam as entidades que estão no banco de dados. Fazem o mapeamento entre entidades e tabelas/coleções, mas não implementam regras de negócio - somente fazem o CRUD (Create, Read, Update, Delete).

- **src/comuns** - Classes e utilitários comuns, que podem ser usadas em qualquer camada. Por exemplo, tipagens, interfaces, funções úteis, etc.

> **Observação:** Para este projeto de estudo em específico, foi feito um caso de uso para cada rota, que ficaram responsáveis apenas por chamar os serviços de domínio. Chamamos isso de "caso de uso passa-prato", pois ele é tão simples que ele apenas "repassa" para os serviços de domínio, não tendo lógica própria. Em projetos reais, costuma-se evitar o uso de casos de uso passa-prato.

---

## 2. Conformidade com os Princípios SOLID

A organização das classes foi fundamentada nos seguintes pilares:

- **SRP (Single Responsibility Principle):** Cada caso de uso (ex: `AtualizarAssinatura.casoUso`) possui uma única razão para mudar.
- **OCP (Open/Closed Principle):** O sistema é extensível para novos bancos de dados via interfaces, sem alterar as regras de negócio.
- **LSP (Liskov Substitution Principle):** Repositórios mockados para testes herdam as mesmas interfaces que os repositórios reais (TypeORM).
- **ISP (Interface Segregation Principle):** Interfaces de domínio são granulares, evitando que o Caso de Uso dependa de métodos que não utiliza.
- **DIP (Dependency Inversion Principle):** A camada de aplicação depende de interfaces, não de implementações concretas (Inversão de Controle).

---

## 3. Padrões de Projeto e Clean Architecture

Além da estrutura de camadas, foram aplicados:

- **Repository Pattern:** Desacoplamento da lógica de persistência, a conexão e manipulação com o banco de dados ficam apenas em um único lugar - no repositório.
- **Dependency Injection:** Utilização de containers ou fábricas para instanciar dependências do Nest.js, como também interfaces e classes base (ex: IRepositorioBase e o RepositorioBase, IServicoBase e o ServicoBase, etc.) para diminuir a complexidade de construção de objetos e também permitir a comunicação entre camadas.
- **DTO (Data Transfer Objects):** Para transição de dados entre camadas sem expor entidades.

---

## 4. Conclusão e Relato de Desenvolvimento

### Desafios Encontrados:

- **Gestão de Validação de Dados via DTO:** Neste projeto, a validação de dados foi feita via DTO, o que tornou o processo de desenvolvimento mais seguro, porém, ligeiramente complexo. Os DTOs foram construídos utilizando a biblioteca **Zod**, utilizando-se de pipes para transformar e validar os dados utilizando o DTO (Schema do Zod) passado.
- **Criação de Classes Bases:** O uso de classes base (ex: `RepositorioBase` e `ServicoBase`) ajudou a diminuir a complexidade de construção de objetos e permitiu a comunicação entre camadas. Como tudo, o investimento inicial é mais demorado, mas, com o tempo, o benefícios se tornam notáveis.
- **Criação de Projeto Compartilhado:** Foram necessárias certas adaptações para fazer o pacote local funcionar em todos os microsserviços.
- **Propagação de Erros pelo RabbitMQ:** Para os erros ocorridos nos microsserviços, o erro não se propaga naturalmente para o `api-gateway`, sendo convertidos para erros genéricos. Portanto, foi utilizada a classe `RpcException`, pois a mesma é convertida para JSON de erro para o api-gateway, que pode ser convertido.

---

## Arquitetura

### 1 Componentes

- **API Gateway (3000)**: Roteamento HTTP
- **Serviço Gestão**: Clientes, planos e assinaturas
- **Serviço Faturamento**: Pagamentos e cobranças
- **Serviço Planos Ativos**: Consulta com cache local

### 2 Comunicação

```
Cliente HTTP → API Gateway → RabbitMQ → Microsserviços → MySQL
```

RabbitMQ gerencia eventos entre serviços (@EventPattern):

- **PAGAMENTO_REGISTRADO** - 'pagamento-registrado';
- **ASSINATURA_ATIVA** - 'assinatura-ativa';
- **ASSINATURA_CANCELADA** - 'assinatura-cancelada';
- **ASSINATURA_CRIADA** - 'assinatura-criada';
- **ASSINATURA_ATUALIZADA** - 'assinatura-atualizada';
- **ASSINATURA_EXCLUIDA** - 'assinatura-excluida'.

E gerencia as seguintes mensagens (@MessagePattern):

- **REGISTRAR_PAGAMENTO**: 'registrar-pagamento';
- **BUSCAR_ASSINATURAS**: 'buscar-assinaturas';
- **CADASTRAR_ASSINATURA**: 'cadastrar-assinatura';
- **ATUALIZAR_ASSINATURA**: 'atualizar-assinatura';
- **EXCLUIR_ASSINATURA**: 'excluir-assinatura';
- **BUSCAR_ASSINATURAS_ATIVAS**: 'buscar-assinaturas-ativas';
- **CACHEAR_ASSINATURA_ATIVA**: 'cachear-assinatura-ativa';
- **BUSCAR_CLIENTES**: 'buscar-clientes';
- **CADASTRAR_CLIENTE**: 'cadastrar-cliente';
- **ATUALIZAR_CLIENTE**: 'atualizar-cliente';
- **EXCLUIR_CLIENTE**: 'excluir-cliente';
- **BUSCAR_PLANOS**: 'buscar-planos';
- **CADASTRAR_PLANO**: 'cadastrar-plano';
- **ATUALIZAR_PLANO**: 'atualizar-plano';
- **EXCLUIR_PLANO**: 'excluir-plano'.

### 3 Estrutura de Camadas

```
Adaptadores (Controllers, Middlewares)
    ↓
Aplicação (Casos de Uso, Orquestração)
    ↓
Domínio (Modelos, Serviços, Regras)
    ↓
Adaptadores (Repositórios, Banco de Dados)
```

## 4. Tecnologias

| Componente | Tecnologia | Versão |
| ---------- | ---------- | ------ |
| Runtime    | Node.js    | 18+    |
| Framework  | NestJS     | 11+    |
| Linguagem  | TypeScript | 5+     |
| Banco      | MySQL      | 8+     |
| ORM        | TypeORM    | 0.3+   |
| Mensageria | RabbitMQ   | 3+     |
| Validação  | Zod        | 4+     |

## 5. Implementação

### 5.1 Serviço de Gestão

Responsável por gerenciar dados de clientes, planos e assinaturas.

Emite eventos:

- **ASSINATURA_ATIVA**: assinatura-ativa;
- **ASSINATURA_CANCELADA**: assinatura-cancelada;
- **ASSINATURA_CRIADA**: assinatura-criada;
- **ASSINATURA_ATUALIZADA**: assinatura-atualizada;
- **ASSINATURA_EXCLUIDA**: assinatura-excluida.

Recebe mensagens:

Módulo Assinaturas

- **BUSCAR_ASSINATURAS**: 'buscar-assinaturas',
- **CADASTRAR_ASSINATURA**: 'cadastrar-assinatura',
- **ATUALIZAR_ASSINATURA**: 'atualizar-assinatura',
- **EXCLUIR_ASSINATURA**: 'excluir-assinatura',

Módulo Clientes

- **BUSCAR_CLIENTES**: 'buscar-clientes',
- **CADASTRAR_CLIENTE**: 'cadastrar-cliente',
- **ATUALIZAR_CLIENTE**: 'atualizar-cliente',
- **EXCLUIR_CLIENTE**: 'excluir-cliente',

Módulo Planos

- **BUSCAR_PLANOS**: 'buscar-planos',
- **CADASTRAR_PLANO**: 'cadastrar-plano',
- **ATUALIZAR_PLANO**: 'atualizar-plano',
- **EXCLUIR_PLANO**: 'excluir-plano',

### 5.2 Serviço de Faturamento

Consome eventos de assinaturas criadas e gera cobranças automaticamente.

Message Patterns:

- Listener para `MENSAGENS.REGISTRAR_PAGAMENTO` (registrar-pagamento) → registra pagamento → emite `EVENTOS.PAGAMENTO_REGISTRADO` (pagamento-registrado)

Tabela: pagamento (dataPagamento, codAssinatura, valorPago)

Endpoint: `POST /gestao/assinaturas/:idAssinatura/pagar`

### 5.3 Serviço de Assinaturas Ativas

Consulta assinaturas ativas com cache local em memória (TTL 1 hora).

Implementação cache-aside:

- Primeira requisição busca do BD e cachea
- Requisições seguintes usam cache

Escuta eventos:

- **EVENTOS.ASSINATURA_ATIVA** - Quando alguma assinatura for ativada via cadastro ou atualização de dados, adiciona ao cache;
- **EVENTOS.ASSINATURA_CANCELADA** - Quando alguma assinatura for cancelada via cadastro ou atualização de dados, remove ao cache;
- **EVENTOS.ASSINATURA_CRIADA** - Quando alguma assinatura for criada e estiver ativa, adiciona ao cache;
- **EVENTOS.ASSINATURA_ATUALIZADA** - Quando alguma assinatura for atualizada e estiver ativa, adiciona ao cache;
- **EVENTOS.ASSINATURA_EXCLUIDA** - Quando alguma assinatura for excluída, remove do cache.

Escuta mensagens:

- **MENSAGENS.BUSCAR_ASSINATURAS_ATIVAS** - Busca assinaturas ativas que já foram salvas no cache;
- **MENSAGENS.CACHEAR_ASSINATURA_ATIVA** - Explicitamente cachea uma lista de assinaturas.

Endpoint: `GET /gestao/assinaturas/ativo`

---
