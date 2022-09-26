import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../09_index.html'), 'utf8');

describe('sample ui test', () => {
  let document = {};

  beforeEach(() => {
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
  });

  // 最初は何も表示されていない
  test('message does not show at initial', () => {
    const message = document.querySelector('#message > p');
    expect(message).toBe(null);
  });

  // クリックした後はYou Passed!!!が表示されている
  test('show message after clicking the button', () => {
    const button = document.querySelector('#showMessage');
    const click = document.createEvent('Event');
    click.initEvent('click');
    button.dispatchEvent(click);

    const message = document.querySelector('#message > p');
    expect(message.textContent).toBe('You Passed!!!');
  });

  // 2回クリックしても表示されているメッセージは1つ
  it('show only one message after clicking the button twice', () => {
    const button = document.querySelector('#showMessage');
    const click = document.createEvent('Event');
    click.initEvent('click');
    button.dispatchEvent(click);
    button.dispatchEvent(click);

    const messages = document.querySelectorAll('#message > p');
    expect(messages.length).toBe(1);
    expect(messages[0].textContent).toBe('You Passed!!!');
  });
});
