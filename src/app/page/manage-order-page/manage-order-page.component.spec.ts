import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderPageComponent } from './manage-order-page.component';

describe('ManageOrderPageComponent', () => {
  let component: ManageOrderPageComponent;
  let fixture: ComponentFixture<ManageOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOrderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
