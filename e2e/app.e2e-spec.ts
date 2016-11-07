import { TestCliPage } from './app.po';

describe('test-cli App', function() {
  let page: TestCliPage;

  beforeEach(() => {
    page = new TestCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
