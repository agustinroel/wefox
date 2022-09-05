import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAlert } from 'src/assets/models/modal-alert.interface';

@Component({
  selector: 'app-modal-show',
  templateUrl: './modal-show.component.html',
  styleUrls: ['./modal-show.component.scss']
})
export class ModalShowComponent implements OnInit {
  public confirm: boolean;
  public showCancelButton = true;
  constructor(
    private readonly dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalAlert
  ) { 
    this.confirm = false;
  }

  ngOnInit(): void {
    if (this.data.showCancelButton != null && typeof this.data.showCancelButton !== 'undefined') {
      this.showCancelButton = this.data.showCancelButton;
    }
  }

}
