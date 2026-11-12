# useDev — E-commerce & Estratégia de Testes Automatizados

![Thumbnail do projeto. O título é “useDev: Testes de Integração & TDD na Prática” e o Subtítulo é “adaptado por Bianca Chiquinelli.”](./thumb.png)

Aplicação web de e-commerce com catálogo de produtos, detalhes de itens e carrinho interativo, desenvolvida para validar regras de negócio, fluxos assíncronos e comportamento de interface por meio de testes unitários, de integração e automação de CI.

## 🎯 Objetivo Técnico

Garantir a confiabilidade das operações críticas da aplicação — cálculo financeiro, gerenciamento de estado global e jornadas de compra — aplicando **TDD (Test-Driven Development)** e práticas avançadas com **Jest** e **React Testing Library** em um ambiente tipado com **TypeScript**.

## 🛠️ Stack & Ferramentas

- **Core:** React, TypeScript, React Router
- **Testes & Qualidade:** Jest, React Testing Library, `@testing-library/jest-dom`
- **Automação:** GitHub Actions (CI)

## ⚙️ Arquitetura de Testes e Decisões Técnicas

Em vez de testar detalhes de implementação, a suíte foi estruturada para simular o comportamento real do usuário e isolar dependências externas:

- **Testes de Integração com Context API:** Criação de componentes auxiliares (`CartItemStub`) integrados ao `ContextProvider` real para validar adição, incremento, decremento e remoção de itens no carrinho sem acoplar os testes à estrutura interna do estado.
- **Isolamento de Rede e Roteamento:** Implementação de mocks para `globalThis.fetch` (interceptando chamadas de `/products` e `/categories`) e `jest.mock` parcial no `react-router` (`useNavigate`), garantindo testes determinísticos e rápidos.
- **Fluxos Assíncronos e Transições de Estado:** Validação completa do ciclo de checkout (`Processando...` $\rightarrow$ `Pedido Realizado!` $\rightarrow$ redirecionamento) utilizando `act` e `waitFor` para lidar com atualizações assíncronas da UI.
- **Blindagem de Regras de Negócio (TDD):** Cobertura unitária para funções utilitárias de cálculo de totais e descontos, incluindo sanitização de entradas (strings numéricas e valores negativos) e formatação monetária.
- **Configuração de Ambiente & Compatibilidade:** Resolução de conflitos de ambiente Node/JSDOM (como polyfill de `TextEncoder` para compatibilidade com React Router) e tipagem estrita do Jest no `tsconfig`.
- **Integração Contínua (CI):** Pipeline configurada para executar automaticamente toda a suíte de testes a cada `push` e `pull request`, bloqueando regressões antes do merge.

## 📂 Estrutura dos Testes

```text
src/
├── components/
│   ├── Cart/          # Testes de integração: carrinho vazio, CRUD de itens e checkout
│   └── Header/        # Testes de renderização e navegação via mock de rota
└── utils/             # Testes unitários: cálculo de preços, descontos e sanitização
```

> **Escopo da contribuição:** A partir da base de interface já estruturada, fui responsável por projetar e implementar toda a arquitetura de testes (unitários e de integração), refatorar funções utilitárias críticas via TDD e configurar a automação de testes no GitHub Actions.

## 🚀 Como Executar

```Bash
# Instalar dependências
npm install

# Executar a suíte de testes
npm test

# Executar testes em modo watch
npm run test:watch
```
