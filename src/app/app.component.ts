import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { Posts } from '../assets/posts.interface';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wefox-challenge';
  public dataSource: MatTableDataSource<Posts>;
  displayedColumns: string[] = ['id', 'title', 'content', 'image', 'create_at', 'actions'];
  constructor(private appService: AppServiceService) {

  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.appService.listPosts().pipe(take(1)).subscribe((res) =>
      this.dataSource = res
    )
  }

}


