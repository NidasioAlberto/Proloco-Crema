import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathsListComponent } from './paths-list.component';

describe('PathsListComponent', () => {
  let component: PathsListComponent;
  let fixture: ComponentFixture<PathsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
