import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAlert } from '../../assets/models/modal-alert.interface';
import { PostModel } from '../../assets/models/post.model';
import { ComunicationComponentService } from '../services/comunication-component/comunication-component.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  public confirm: boolean;
  public showCancelButton = true;
  post: PostModel;
  postsForm = new FormGroup({
    title: new FormControl('', [Validators.pattern(/^[A-Za-z0-9-_ ]*$/), Validators.required]),
    content: new FormControl('', [Validators.pattern(/^[A-Za-z0-9-_ ]*$/), Validators.required]),
    lat: new FormControl('', [Validators.required]),
    long: new FormControl('', [Validators.required]),
    image_url: new FormControl('', [Validators.required])
  })
  constructor(
    private readonly dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalAlert,
    private readonly comunication: ComunicationComponentService) { 
      this.confirm = false;
      this.post = new PostModel();
    }

  ngOnInit() {
    if(this.data.showCancelButton != null && typeof this.data.showCancelButton !== 'undefined'){
      this.showCancelButton = this.data.showCancelButton;
    }
    if(this.data.element){
      this.postsForm.controls['title'].setValue(this.data.element.title);
      this.postsForm.controls['content'].setValue(this.data.element.content);
      this.postsForm.controls['lat'].setValue(this.data.element.lat);
      this.postsForm.controls['long'].setValue(this.data.element.long);
      this.postsForm.controls['image_url'].setValue(this.data.element.image_url);
    }
  }

  onAccept(){
    console.log('post', this.post)
    console.log('value', this.postsForm.controls['title'].value)
    this.post.id = this.data.element.id;
    this.post.title = this.postsForm.controls['title'].value;
    this.post.content = this.postsForm.controls['content'].value;
    this.post.lat = this.postsForm.controls['lat'].value;
    this.post.long = this.postsForm.controls['long'].value;
    this.post.image_url = this.postsForm.controls['image_url'].value
    console.log('post', this.post)
    this.confirm = true;
    this.dialogRef.close(this.confirm);
    this.comunication.setModalPostEdit(this.post);
  }

}
