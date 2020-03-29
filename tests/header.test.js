const Page = require('./helpers/page');

let page;

beforeEach( async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach( async () => {
  await page.close();
});

test('Header has text "Blogster"', async () => {
  const text = await page.getContentsOf('a.brand-logo');
  
  expect(text).toEqual('Blogster');
});

test('Clicking on Login', async () => {
  await page.click('#root > div > div > nav > div > ul > li > a');
  const url = page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test('Authenticated : Test for logout button', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual('Logout');
});

// eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWU3YmNjMTdjOTU1NTI0OTkwYmJhNmE2In19
// woNZYtyePgMqRPAaQ32OFKVuQr4
// const id = '5e7bcc17c955524990bba6a6'

