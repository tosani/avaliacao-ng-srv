import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  static RESULT_OK = 'OK';
  static RESULT_CANCEL = 'CANCEL';

  @Input()
  titulo: string;

  @Input()
  mensagem: string;

  @Input()
  botaoOkTitulo: string = 'Ok';

  @Input()
  botaoCancelTitulo: string = 'Cancelar';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
