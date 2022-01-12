import 'expect-puppeteer';

describe('e2e Test', () => {
  beforeAll(async () => {
    await page.goto('https://localhost:3001', { waitUntil: 'domcontentloaded' });
    page.on('dialog', async (dialog) => {
      if (dialog.type() === 'prompt') { await dialog.accept('test name'); } else {
        await page.keyboard.press('Enter');
        await dialog.accept();
      }
    });
  });
  test('login test', async () => {
    await expect(page).toClick('button', { text: 'logIn' });
    await expect(page).toFill('#js-login-user-name', 'user1');
    await expect(page).toFill('#js-login-password', '1234');
    await expect(page).toClick('button', { text: '로그인' });
    await page.waitForResponse((req) => req.url() === 'https://localhost/graphql' && req.headers()['content-length'] > '15');
  });
  test('new test', async () => {
    await expect(page).toClick('button', { text: 'new' });
    await page.waitForResponse(async (req) => {
      const body = await req?.json?.();
      return req.url() === 'https://localhost/graphql' && body?.data?.user?.posts?.[0]?.title === 'untitled';
    });
    const post = await page.$('li.file > .title');
    const postName = await page.evaluate((x) => x.innerText, post);
    expect(postName).toBe('untitled');
  });
  test('save as test', async () => {
    await expect(page).toClick('button', { text: 'save as' });
    await page.waitForResponse(async (req) => {
      const body = await req?.json?.();
      return req.url() === 'https://localhost/graphql' && body?.data?.user?.posts?.[0]?.title === 'test name';
    });
    const post = await page.$('li.file > .title');
    const postName = await page.evaluate((x) => x.innerText, post);
    expect(postName).toBe('test name');
  });
  test('save test', async () => {
    await expect(page).toFill('.text-editor', 'test message');
    await expect(page).toClick('button', { text: 'save' });
    const editor = await page.$('.text-editor');
    const editorText = await page.evaluate((x) => x.innerText, editor);
    expect(editorText).toBe('test message');
  });
  test('deletePost', async () => {
    await expect(page).toClick('button', { text: 'X' });
    await page.waitForResponse(async (req) => {
      const body = await req?.json?.();
      return req.url() === 'https://localhost/graphql' && body?.data?.user?.posts !== undefined;
    });
    const list = await page.$('ul.tab-list');
    const post = await page.evaluate((x) => x.innerText, list);
    expect(post).toBe('');
  });
});
