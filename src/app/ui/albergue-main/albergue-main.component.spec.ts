import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbergueMainComponent } from './albergue-main.component';

describe('AlbergueMainComponent', () => {
  let component: AlbergueMainComponent;
  let fixture: ComponentFixture<AlbergueMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbergueMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbergueMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
