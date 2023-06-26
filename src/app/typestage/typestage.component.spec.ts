import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypestageComponent } from './typestage.component';

describe('TypestageComponent', () => {
  let component: TypestageComponent;
  let fixture: ComponentFixture<TypestageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypestageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypestageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
