import { YetcargoPage } from './app.po';

describe('yetcargo App', function() {
  let page: YetcargoPage;

  beforeEach(() => {
    page = new YetcargoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
