import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectivaComponent } from './affectiva.component';

describe('AffectivaComponent', () => {
  let component: AffectivaComponent;
  let fixture: ComponentFixture<AffectivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectivaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
