import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerrodetalleComponent } from './perrodetalle.component';

describe('PerrodetalleComponent', () => {
  let component: PerrodetalleComponent;
  let fixture: ComponentFixture<PerrodetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerrodetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerrodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
