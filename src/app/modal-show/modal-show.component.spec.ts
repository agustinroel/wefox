import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalShowComponent } from './modal-show.component';

describe('ModalShowComponent', () => {
  let component: ModalShowComponent;
  let fixture: ComponentFixture<ModalShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ ModalShowComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {provide:MAT_DIALOG_DATA,useValue:{element:{title:'test'}}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
