import { html, fixture, expect } from '@open-wc/testing';
import '.';
import { UUIPasswordInput } from './uui-password-input.element';

describe('UuiPasswordInput', () => {
  let element: UUIPasswordInput;
  beforeEach(async () => {
    element = await fixture(html`<uui-password-input></uui-password-input>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('test that disable works', async () => {
    return false;
  });
});
