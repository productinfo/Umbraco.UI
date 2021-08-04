import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import '.';
import { UUIPasswordInput } from './uui-password-input.element';

describe('UuiPasswordInput', () => {
  let element: UUIPasswordInput;
  beforeEach(async () => {
    element = await fixture(
      html`<uui-password-input
        .toggleText=${{ showText: 'Show', hideText: 'Hide' }}
      ></uui-password-input>`
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('Show/Hide toggle', async () => {
    const toggle = element.shadowRoot?.querySelector('.password-toggle');

    expect(toggle?.textContent?.trim()).to.eq('Show');
    (toggle as HTMLElement).click();
    await elementUpdated(element);
    expect(toggle?.textContent?.trim()).to.eq('Hide');
  });
});
