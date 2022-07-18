import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSumaryComponent } from './billing-sumary.component';

describe('BillingSumaryComponent', () => {
  let component: BillingSumaryComponent;
  let fixture: ComponentFixture<BillingSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingSumaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
