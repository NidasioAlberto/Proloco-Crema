import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathDescriptionComponent } from './path-description.component';

describe('PathDescriptionComponent', () => {
  let component: PathDescriptionComponent;
  let fixture: ComponentFixture<PathDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
