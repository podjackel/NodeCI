const Page = require('./helpers/page');
Number.prototype._called = {};
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.setDefaultNavigationTimeout(30000);
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When Logged in', async () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });

  test('Can see blog create form', async () => {
    const label = await page.getContentsOf('form label');

    expect(label).toEqual('Blog Title');
  });
  describe('And using valid inputs', async () => {
    beforeEach(async () => {
      await page.type('.title input', 'TEST TITLE');
      await page.type('.content input', 'TEST CONTENT');
      await page.click('form button');
    });

    test('Submitting takes user to review screen', async () => {
      const text = await page.getContentsOf('h5');
      expect(text).toEqual('Please confirm your entries');
    });

    test('Submitting then saving add blog to index page.', async () => {
      await page.click('button.green');
      await page.waitFor('.card-title');

      const title = await page.getContentsOf('.card-title');
      const content = await page.getContentsOf('p');

      expect(title).toEqual('TEST TITLE');
      expect(content).toEqual('TEST CONTENT');
    });
  });

  describe('And using invalid inputs', async () => {
    beforeEach(async () => {
      await page.click('form button');
    });

    test('the form shows an error message', async () => {
      const titleError = await page.getContentsOf('.title .red-text');
      const contentError = await page.getContentsOf('.content .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});

describe('When Not Logged in', async () => {
  test('User cannon create blog post', async () => {
    const body = {
      title: 'Error Testing Title',
      content: 'Error Testing Content'
    };
    const result = await page.post('/api/blogs', body);

    expect(result).toEqual({ error: 'You must log in!' });
  });

  test('User cannon get a list of posts', async () => {
    const result = await page.get('/api/blogs');

    expect(result).toEqual({ error: 'You must log in!' });
  });
});
