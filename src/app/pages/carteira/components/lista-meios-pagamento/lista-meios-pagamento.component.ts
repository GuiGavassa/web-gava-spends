import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemMeioPagamentoComponent } from '../item-meio-pagamento/item-meio-pagamento.component';

interface MeioPagamento {
  id: number;
  nome: string;
  tipo: 'credito' | 'debito' | 'conta';
  limite?: number;
  saldo?: number;
  cor?: string;
}

@Component({
  selector: 'app-lista-meios-pagamento',
  imports: [CommonModule, ItemMeioPagamentoComponent],
  templateUrl: './lista-meios-pagamento.component.html',
  styleUrl: './lista-meios-pagamento.component.scss'
})
export class ListaMeiosPagamentoComponent {
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() icone: string = '';
  @Input() textoBotao: string = 'Adicionar';
  @Input() items: MeioPagamento[] = [];
  @Input() mensagemVazia: string = 'Nenhum item cadastrado.';
  
  @Output() adicionar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<MeioPagamento>();
  @Output() remover = new EventEmitter<number>();

  onAdicionar() {
    this.adicionar.emit();
  }

  onEditar(item: MeioPagamento) {
    this.editar.emit(item);
  }

  onRemover(id: number) {
    this.remover.emit(id);
  }
}
