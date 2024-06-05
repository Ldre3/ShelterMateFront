import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroalbergueComponent } from './registroalbergue.component';

describe('RegistroalbergueComponent', () => {
  let component: RegistroalbergueComponent;
  let fixture: ComponentFixture<RegistroalbergueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroalbergueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroalbergueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
