import { html } from 'lit-html';
import './index';
import { AvatarSizeNames, AvatarSizeType } from './uui-avatar.element';

export default {
  title: 'Displays/Avatar',
  component: 'uui-avatar',
};

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9';

const avatarSrcSet = [
  `${avatarSrc}&h=100&w=100`,
  `${avatarSrc}&h=200&w=200`,
  `${avatarSrc}&h=300&w=300`,
];

export const Basic = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar title="First Last"></uui-avatar>
    <uui-avatar
      img-src="${avatarSrcSet[0]}"
      img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
      title="First Last"
    >
    </uui-avatar>
  </div>
`;

export const Sizes = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar
      img-src="${avatarSrcSet[0]}"
      img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
    >
    </uui-avatar>
    ${AvatarSizeNames.map(
      (avatarSize: AvatarSizeType) =>
        html`
          <uui-avatar size="${avatarSize}" name="${avatarSize}"> </uui-avatar>
        `
    )}
  </div>

  <div style="display: flex; align-items: center;">
    <uui-avatar
      img-src="${avatarSrcSet[0]}"
      img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
    >
    </uui-avatar>
    ${AvatarSizeNames.map(
      (avatarSize: AvatarSizeType) =>
        html`
          <uui-avatar
            size="${avatarSize}"
            img-src="${avatarSrcSet[0]}"
            img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
          >
          </uui-avatar>
        `
    )}
  </div>
`;

export const Text = () => html`
  <uui-avatar title="First Last" size="m"></uui-avatar>
`;

export const Colors = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar size="m" title="First Last"></uui-avatar>
    <uui-avatar
      size="m"
      title="First Last"
      style="
        background-color: var(--uui-color-space-cadet);
        color: var(--uui-color-spanish-pink);"
    ></uui-avatar>
  </div>
`;

export const SlottedContent = () => html`
  <div style="display: flex; align-items: center;">
    <uui-avatar size="m">+10</uui-avatar>
  </div>
`;