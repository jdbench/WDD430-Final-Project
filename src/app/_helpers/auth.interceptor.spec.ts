import { AuthInterceptorPipe } from './auth.interceptor';

describe('AuthInterceptorPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthInterceptorPipe();
    expect(pipe).toBeTruthy();
  });
});
