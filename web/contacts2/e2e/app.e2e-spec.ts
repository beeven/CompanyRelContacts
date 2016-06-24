import { AccountsPage } from './app.po';

describe('accounts App', function() {
  let page: AccountsPage;

  beforeEach(() => {
    page = new AccountsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
