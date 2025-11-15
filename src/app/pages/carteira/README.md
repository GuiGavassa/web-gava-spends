# Componente Carteira

Este componente gerencia os meios de pagamento (cartões de crédito e contas/débito).

## Estrutura de Componentes

### 📁 carteira/
- **carteira.component.ts** - Componente principal que gerencia a lógica
- **carteira.component.html** - Template principal com listagem de meios de pagamento
- **carteira.component.scss** - Estilos da página principal

### 📁 modal-adicionar-meio-pagamento/
Componente modal reutilizável para adicionar novos meios de pagamento.

**Inputs:**
- `aberto: boolean` - Controla visibilidade do modal
- `tipo: 'credito' | 'debito'` - Define se é cartão de crédito ou conta/débito

**Outputs:**
- `fechar()` - Emite evento quando o modal é fechado
- `adicionar(MeioPagamento)` - Emite o novo meio de pagamento criado

### 📁 modal-editar-meio-pagamento/
Componente modal reutilizável para editar meios de pagamento existentes.

**Inputs:**
- `aberto: boolean` - Controla visibilidade do modal
- `item: MeioPagamento` - Item a ser editado
- `tipo: 'credito' | 'debito'` - Define se é cartão de crédito ou conta/débito

**Outputs:**
- `fechar()` - Emite evento quando o modal é fechado
- `salvar(MeioPagamento)` - Emite o meio de pagamento editado

## Interface MeioPagamento

```typescript
interface MeioPagamento {
  id: number;
  nome: string;
  tipo: 'credito' | 'debito' | 'conta';
  limite?: number;  // Para cartões de crédito
  saldo?: number;   // Para contas e débito
}
```

## Funcionalidades

- ✅ Adicionar cartões de crédito com limite
- ✅ Adicionar contas/débito com saldo
- ✅ Editar meios de pagamento
- ✅ Remover meios de pagamento
- ✅ Visualizar totais (limite total de crédito e saldo total)
- ✅ Modals reutilizáveis e separados por responsabilidade
