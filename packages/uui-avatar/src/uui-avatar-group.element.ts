import { LitElement, html, css } from 'lit';
import { property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { UUIAvatarElement } from '../uui-avatar/uui-avatar.element';

/**
 * This element is designed to hold uui-avatars. It displays them slightly overlapped, so they are presented nicely. Use it if you need to display many avatars in one place. Set a limit to display certain number of avatars and a number of the ones remaining out of view.
 *  @element uui-avatar-group
 */

export class UUIAvatarGroupElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-flex;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
      }

      ::slotted(uui-avatar),
      uui-avatar {
        margin-left: -0.2em;
        margin-right: -0.2em;
      }

      #overflow-indication {
        margin-left: 6px;
      }
    `,
  ];

  @query('slot')
  protected avatarsSlot!: HTMLSlotElement;

  @queryAssignedNodes(undefined, true, 'uui-avatar')
  private avatarNodes?: UUIAvatarElement[];

  /**
   * This sets a limit of how many avatars can be shown. It will ad a +{number} after the avatars to show the number of hidden avatars.
   * @type {number}
   * @attr
   * @default 0
   */
  @property({ type: Number, attribute: true })
  limit = 0;

  /**
   * This sets the color of the borders around the avatars, usually set this to the color of the background of the element the group is on. Change to "transparent" if you dont want a border. Accepts any valid css color or a custom property (https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
   * @type {string}
   * @attr
   * @default 'white'
   */
  @property({ type: String })
  borderColor = 'white';

  @state()
  private avatarArray: UUIAvatarElement[] = [];

  firstUpdated() {
    this.setAvatarArray();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('limit')) this.updateAvatarVisibility();
  }

  private updateAvatarVisibility() {
    this.avatarArray.forEach((avatar: UUIAvatarElement, index: number) => {
      const avatarNumber: number = index + 1;
      avatar.style.border = `0.1em solid ${this.borderColor}`;
      avatar.style.display =
        avatarNumber <= this.limit || this.limit === 0 ? '' : 'none';
    });
  }

  private onSlotChange() {
    this.setAvatarArray();
    this.updateAvatarVisibility();
  }

  private setAvatarArray() {
    this.avatarArray = this.avatarNodes ? this.avatarNodes : [];
  }

  private shouldShowLimitNumber() {
    return this.limit !== 0 && this.avatarArray.length > this.limit;
  }

  render() {
    return html`
      <slot @slotchange=${this.onSlotChange}></slot>
      ${this.shouldShowLimitNumber()
        ? //prettier-ignore
          html`<small id="overflow-indication">+${this.avatarArray.length - this.limit}</small>`
        : ''}
    `;
  }
}