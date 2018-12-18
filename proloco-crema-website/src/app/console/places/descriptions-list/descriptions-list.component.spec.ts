import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionsListComponent } from './descriptions-list.component';

describe('DescriptionsListComponent', () => {
  let component: DescriptionsListComponent;
  let fixture: ComponentFixture<DescriptionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
