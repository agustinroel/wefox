import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { filter, mergeMap, Subject, take, takeUntil } from 'rxjs';
import { Posts } from '../assets/posts.interface';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { AppServiceService } from './services/app-service.service';
import { ComunicationComponentService } from './services/comunication-component/comunication-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wefox-challenge';
  posts: Posts[] = []
  dataSource = new MatTableDataSource<Posts>(this.posts);
  createdPost: Posts;
  editedPost: Posts;
  private readonly $destroyUntil = new Subject<boolean>();
  displayedColumns: string[] = ['id', 'title', 'content', 'lat', 'long', 'image', 'create_at', 'actions'];
  constructor(
    private appService: AppServiceService,
    private readonly comunication: ComunicationComponentService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.appService.listPosts().pipe(take(1)).subscribe((res) => {
      this.posts = res;
      this.dataSource.data = res;
    }
    )
  }

  onCreatePost(){
    const newPost = this.dialog.open(ModalEditComponent, {
      height: '60%',
      width: '100%',
      data: {
        isEdit: false,
        msg: 'Fill this form to create a new post',
        title: 'Create Post',
        showCancelButton: true
      },
      disableClose: false,
    })

    newPost.afterClosed()
    .pipe(
      filter((value) => !!value),
      mergeMap(() =>
      this.comunication.modalPostEditComunication$.pipe(take(1))
      ),
      mergeMap((element: any) =>
      this.appService.createPost(element).pipe(takeUntil(this.$destroyUntil)))
    )
    .subscribe((response: any) => {
      this.createdPost = response;
      this.dataSource.data.push(this.createdPost);
      this.dataSource._updateChangeSubscription();
    })
  }

  onEdit(element: any){
    const editPost = this.dialog.open(ModalEditComponent, {
      height: '60%',
      width: '100%',
      data: {
        isEdit: true,
        msg: 'Edit this form fields and save to update this post',
        title: 'Update Post',
        showCancelButton: true,
        element: element
      },
      disableClose: false,
    })

    editPost.afterClosed()
    .pipe(
      filter((value) => !!value),
      mergeMap(() =>
      this.comunication.modalPostEditComunication$.pipe(take(1))
      ),
      mergeMap((editedElement: any) => 
      this.appService
      .updatePost(editedElement)
      .pipe(takeUntil(this.$destroyUntil))
      )
    )
    .subscribe((response: any) => {
      this.editedPost = response;
      const index = this.dataSource.data.indexOf(element);
      this.dataSource.data[index] = this.editedPost;
      this.dataSource._updateChangeSubscription();
    })
  }

  onDelete(item: any) {
    const deleteDialog = this.dialog.open(ModalAlertComponent, {
      data: {
        width: '250px',
        height: '200px',
        title: 'Delete post',
        msg: 'Would you like to delete this post?',
        showCancelButton: true,
      },
      disableClose: true
    })

    deleteDialog.afterClosed().subscribe(result => {
      console.log(result)
      if (result !== undefined) {
         this.appService.deletePost(item).pipe(take(1)).subscribe((res) =>
         this.dataSource._updateChangeSubscription()
        ) 
      }
    });
  }

}


