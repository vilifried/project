import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSingleCatfactPage } from './view-single-catfact.page';

describe('ViewSingleCatfactPage', () => {
  let component: ViewSingleCatfactPage;
  let fixture: ComponentFixture<ViewSingleCatfactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleCatfactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSingleCatfactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
