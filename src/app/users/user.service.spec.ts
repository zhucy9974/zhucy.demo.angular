import {async, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
//fdescribe on force de ne faire que ce test.
//fit, la même principe
fdescribe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
    });
    service = TestBed.inject(UserService);

  });

  it('should return a list of 10 users', async(async () => {
    //const service: UserService = TestBed.get(UserService);
    const res = await service.get();
    expect(res.length).toEqual(10);
  }));
});
