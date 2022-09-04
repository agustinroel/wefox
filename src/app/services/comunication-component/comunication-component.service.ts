import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationComponentService {
  private readonly _modalPostEditComunication = new BehaviorSubject({});
  readonly modalPostEditComunication$ = this._modalPostEditComunication.asObservable();

  constructor() { }

  setModalPostEdit(modal: any): void{
    this._modalPostEditComunication.next(modal)
  }
}
