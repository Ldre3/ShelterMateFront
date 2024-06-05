import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerroComponent } from './editar-perro.component';

describe('EditarPerroComponent', () => {
  let component: EditarPerroComponent;
  let fixture: ComponentFixture<EditarPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPerroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
