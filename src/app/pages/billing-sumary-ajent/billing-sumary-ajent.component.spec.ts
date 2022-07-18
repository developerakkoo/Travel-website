import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSumaryAjentComponent } from './billing-sumary-ajent.component';

describe('BillingSumaryAjentComponent', () => {
  let component: BillingSumaryAjentComponent;
  let fixture: ComponentFixture<BillingSumaryAjentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingSumaryAjentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingSumaryAjentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
