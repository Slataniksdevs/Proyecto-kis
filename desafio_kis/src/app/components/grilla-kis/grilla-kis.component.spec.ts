import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaKisComponent } from './grilla-kis.component';

describe('GrillaKisComponent', () => {
  let component: GrillaKisComponent;
  let fixture: ComponentFixture<GrillaKisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrillaKisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrillaKisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
