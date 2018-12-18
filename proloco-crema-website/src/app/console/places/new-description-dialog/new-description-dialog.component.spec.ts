import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDescriptionDialogComponent } from './new-description-dialog.component';

describe('NewDescriptionDialogComponent', () => {
  let component: NewDescriptionDialogComponent;
  let fixture: ComponentFixture<NewDescriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
