import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MeioPagamento {
  id: number;
  nome: string;
  tipo: 'credito' | 'debito' | 'conta';
  limite?: number;
  saldo?: number;
  cor?: string;
}

@Component({
  selector: 'app-modal-adicionar-meio-pagamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-adicionar-meio-pagamento.component.html',
  styleUrl: './modal-adicionar-meio-pagamento.component.scss'
})
export class ModalAdicionarMeioPagamentoComponent {
  @Input() aberto = false;
  @Input() tipo: 'credito' | 'debito' = 'credito';
  @Output() fechar = new EventEmitter<void>();
  @Output() adicionar = new EventEmitter<MeioPagamento>();

  novoItem: MeioPagamento = { id: 0, nome: '', tipo: 'debito', limite: undefined, saldo: undefined, cor: '#3498db' };
  
  // Cores predefinidas
  coresPredefinidas = [
    { nome: 'Azul', valor: '#3498db' },
    { nome: 'Verde', valor: '#27ae60' },
    { nome: 'Roxo', valor: '#9b59b6' },
    { nome: 'Laranja', valor: '#e67e22' }
  ];
  
  corSelecionada = '#3498db';
  mostrarSeletorCor = false;

  ngOnChanges() {
    if (this.aberto) {
      this.resetarFormulario();
    }
  }

  resetarFormulario() {
    this.corSelecionada = '#3498db';
    this.mostrarSeletorCor = false;
    if (this.tipo === 'credito') {
      this.novoItem = { id: 0, nome: '', tipo: 'credito', limite: undefined, cor: this.corSelecionada };
    } else {
      this.novoItem = { id: 0, nome: '', tipo: 'debito', saldo: undefined, cor: this.corSelecionada };
    }
  }

  selecionarCor(cor: string) {
    this.corSelecionada = cor;
    this.novoItem.cor = cor;
    this.mostrarSeletorCor = false;
  }

  abrirSeletorCor() {
    this.mostrarSeletorCor = true;
  }

  atualizarCorCustomizada(cor: string) {
    this.corSelecionada = cor;
    this.novoItem.cor = cor;
  }

  fecharModal() {
    this.fechar.emit();
  }

  salvar() {
    if (this.tipo === 'credito') {
      if (this.novoItem.nome.trim() && this.novoItem.limite) {
        this.adicionar.emit({ ...this.novoItem });
      }
    } else {
      if (this.novoItem.nome.trim() && this.novoItem.saldo !== undefined) {
        this.adicionar.emit({ ...this.novoItem });
      }
    }
  }
}
