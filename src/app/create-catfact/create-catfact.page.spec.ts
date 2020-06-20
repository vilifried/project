import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCatfactPage } from './create-catfact.page';

describe('CreateCatfactPage', () => {
  let component: CreateCatfactPage;
  let fixture: ComponentFixture<CreateCatfactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCatfactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCatfactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
