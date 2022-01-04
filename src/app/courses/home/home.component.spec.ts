import { CoursesService } from './../services/courses.service';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

  beforeEach(async () => {

    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    await TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServiceSpy}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    coursesService = TestBed.inject(CoursesService);
  });

  it("should create the component", () => {

    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {

    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(2, 'Unexpected number of tabs found');
  });


  it("should display advanced courses when tab clicked", fakeAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    fixture.detectChanges();

    flush( /* wait for the tab change to complete */ );


    const cardTitles = el.queryAll(By.css('.mat-card-title'));

    expect(cardTitles.length).toBeGreaterThan(0, 'Could not find card titles');

    expect(cardTitles[0].nativeElement.textContent).toContain('Angular Testing Course');

  }));

});

