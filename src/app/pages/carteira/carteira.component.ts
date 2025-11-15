import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAdicionarMeioPagamentoComponent } from './modal-adicionar-meio-pagamento/modal-adicionar-meio-pagamento.component';
import { ModalEditarMeioPagamentoComponent } from './modal-editar-meio-pagamento/modal-editar-meio-pagamento.component';
import { ResumoFinanceiroComponent } from './components/resumo-financeiro/resumo-financeiro.component';
import { ListaMeiosPagamentoComponent } from './components/lista-meios-pagamento/lista-meios-pagamento.component';

interface MeioPagamento {
  id: number;
  nome: string;
  tipo: 'credito' | 'debito' | 'conta';
  limite?: number;
  saldo?: number;
  editando?: boolean;
  cor?: string;
}

@Component({
  selector: 'app-carteira',
  imports: [
    CommonModule, 
    FormsModule, 
    ModalAdicionarMeioPagamentoComponent, 
    ModalEditarMeioPagamentoComponent,
    ResumoFinanceiroComponent,
    ListaMeiosPagamentoComponent
  ],
  templateUrl: './carteira.component.html',
  styleUrl: './carteira.component.scss'
})
export class CarteiraComponent {
  // Cartões de Crédito
  cartoesCredito: MeioPagamento[] = [];
  proximoIdCredito = 1;

  // Cartões de Débito / Contas
  contasDebito: MeioPagamento[] = [];
  proximoIdDebito = 1;

  // Modal de edição
  modalEdicaoAberto = false;
  itemEmEdicao: MeioPagamento | null = null;
  tipoItemEdicao: 'credito' | 'debito' = 'credito';

  // Modal de adição
  modalAdicaoAberto = false;
  tipoAdicao: 'credito' | 'debito' = 'credito';

  // Métodos para Cartões de Crédito
  abrirModalAdicionarCredito() {
    this.tipoAdicao = 'credito';
    this.modalAdicaoAberto = true;
  }

  adicionarCartaoCredito(novoCartao: MeioPagamento) {
    this.cartoesCredito.push({
      id: this.proximoIdCredito++,
      nome: novoCartao.nome,
      tipo: 'credito',
      limite: novoCartao.limite,
      cor: novoCartao.cor,
      editando: false
    });
    this.fecharModalAdicao();
  }

  editarCartaoCredito(cartao: MeioPagamento) {
    this.itemEmEdicao = { ...cartao };
    this.tipoItemEdicao = 'credito';
    this.modalEdicaoAberto = true;
  }

  salvarCartaoCredito(cartaoEditado: MeioPagamento) {
    const index = this.cartoesCredito.findIndex(c => c.id === cartaoEditado.id);
    if (index !== -1) {
      this.cartoesCredito[index] = { ...cartaoEditado };
    }
    this.fecharModalEdicao();
  }

  removerCartaoCredito(id: number) {
    this.cartoesCredito = this.cartoesCredito.filter(c => c.id !== id);
  }

  // Métodos para Contas/Débito
  abrirModalAdicionarDebito() {
    this.tipoAdicao = 'debito';
    this.modalAdicaoAberto = true;
  }

  adicionarContaDebito(novaConta: MeioPagamento) {
    this.contasDebito.push({
      id: this.proximoIdDebito++,
      nome: novaConta.nome,
      tipo: novaConta.tipo,
      saldo: novaConta.saldo,
      cor: novaConta.cor,
      editando: false
    });
    this.fecharModalAdicao();
  }

  editarContaDebito(conta: MeioPagamento) {
    this.itemEmEdicao = { ...conta };
    this.tipoItemEdicao = 'debito';
    this.modalEdicaoAberto = true;
  }

  salvarContaDebito(contaEditada: MeioPagamento) {
    const index = this.contasDebito.findIndex(c => c.id === contaEditada.id);
    if (index !== -1) {
      this.contasDebito[index] = { ...contaEditada };
    }
    this.fecharModalEdicao();
  }

  removerContaDebito(id: number) {
    this.contasDebito = this.contasDebito.filter(c => c.id !== id);
  }

  // Métodos do Modal de Adição
  fecharModalAdicao() {
    this.modalAdicaoAberto = false;
  }

  // Métodos do Modal de Edição
  fecharModalEdicao() {
    this.modalEdicaoAberto = false;
    this.itemEmEdicao = null;
  }

  // Cálculo de totais
  get totalLimiteCredito(): number {
    return this.cartoesCredito.reduce((total, c) => total + (c.limite || 0), 0);
  }

  get totalSaldoContas(): number {
    return this.contasDebito.reduce((total, c) => total + (c.saldo || 0), 0);
  }
}
