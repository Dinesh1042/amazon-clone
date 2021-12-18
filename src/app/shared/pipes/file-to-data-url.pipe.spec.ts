import { FileToDataUrlPipe } from './file-to-data-url.pipe';

describe('FileToDataUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new FileToDataUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
