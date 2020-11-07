import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailFormPage } from './mail-form.page';

describe('MailFormPage', () => {
  let component: MailFormPage;
  let fixture: ComponentFixture<MailFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
