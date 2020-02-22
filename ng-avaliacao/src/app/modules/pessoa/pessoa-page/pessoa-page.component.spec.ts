import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaPageComponent } from './pessoa-page.component';

describe('PessoaPageComponent', () => {
  let component: PessoaPageComponent;
  let fixture: ComponentFixture<PessoaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
