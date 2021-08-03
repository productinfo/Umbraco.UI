import { html } from 'lit-html';
import { UUIIconService } from '../../service/iconservice/UUIIconService';
import { UUIIconServiceEvent } from '../../service/iconservice/UUIIconServiceEvent';
import './index';

export default {
  title: 'Symbols/Icon',
  component: 'uui-icon',
};

// Example of how to just set icon data:
UUIIconService.defineIcon(
  'bug',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M85.065 420.232c-6.507 6.509-6.507 17.054 0 23.56 6.504 6.514 17.056 6.514 23.559.002l33.049-33.042c-5.737-10.21-10.526-21.23-14.25-32.877l-42.358 42.357zm339.124-198.011c6.51-6.501 6.51-17.053 0-23.562-6.502-6.504-17.055-6.504-23.562 0l-29.451 29.452c5.74 10.208 10.526 21.231 14.251 32.879l38.762-38.769zm-305.782 97.213c0-5.818.263-11.562.759-17.226l-46.137-.002c-9.204.002-16.662 7.458-16.662 16.66 0 9.203 7.458 16.664 16.662 16.664h46.046a197.503 197.503 0 0 1-.668-16.096zm8.151-55.715a177.918 177.918 0 0 1 13.86-33.274l-31.786-31.786c-6.51-6.504-17.061-6.504-23.565 0-6.509 6.51-6.509 17.062 0 23.562l41.491 41.498zm257.974 116.854c-3.882 11.521-8.813 22.389-14.676 32.448l30.776 30.772c6.505 6.512 17.056 6.512 23.56-.002 6.507-6.506 6.507-17.051 0-23.56l-39.66-39.658zm51.697-78.367l-42.545.002c.497 5.663.758 11.407.758 17.226 0 5.432-.234 10.8-.666 16.097h42.453c9.203 0 16.662-7.461 16.662-16.664 0-9.203-7.459-16.659-16.662-16.661zM162.407 70.389c27.314.198 39.683 10.33 46.938 21.625 5.964 9.492 7.656 20.515 8.036 27.072-15.226 10.442-26.149 26.689-29.561 45.572h138.623c-3.413-18.886-14.338-35.135-29.564-45.577.376-6.559 2.071-17.583 8.04-27.068 7.246-11.295 19.614-21.425 46.942-21.625a7.233 7.233 0 0 0 0-14.466c-31.162-.202-49.95 13.171-59.234 28.45-5.947 9.627-8.48 19.591-9.55 27.353a70.4 70.4 0 0 0-25.938-4.981 70.43 70.43 0 0 0-25.96 4.986c-1.069-7.761-3.602-17.725-9.549-27.358-9.287-15.281-28.068-28.652-59.223-28.45-4.006 0-7.238 3.238-7.238 7.233s3.232 7.234 7.238 7.234zm-18.253 248.188c0 71.594 44.03 130.722 100.454 138.429V193.879h-37.77c-37.118 22.856-62.684 70.152-62.684 124.698zm14.814 4.98c0-10.557 12.448-19.117 27.805-19.117 15.354 0 27.802 8.561 27.802 19.117s-12.447 19.112-27.802 19.112c-15.357 0-27.805-8.556-27.805-19.112zm54.263 82.629c-7.163 0-12.966-8.796-12.966-19.645 0-10.85 5.803-19.648 12.966-19.648 7.158 0 12.964 8.799 12.964 19.648.001 10.849-5.806 19.645-12.964 19.645zm9.525-132.331c-7.467 7.463-22.32 4.714-33.177-6.146-10.857-10.854-13.61-25.714-6.144-33.176 7.465-7.464 22.318-4.717 33.176 6.141 10.857 10.859 13.611 25.715 6.145 33.181zm84.664-79.976h-37.77v263.127c56.423-7.707 100.459-66.835 100.459-138.429 0-54.546-25.566-101.842-62.689-124.698zm-10.414 46.795c10.859-10.857 25.711-13.604 33.176-6.141 7.469 7.462 4.716 22.322-6.141 33.176-10.861 10.86-25.713 13.609-33.18 6.146-7.465-7.466-4.713-22.322 6.145-33.181zm3.382 165.512c-7.159 0-12.964-8.796-12.964-19.645 0-10.85 5.805-19.648 12.964-19.648 7.16 0 12.964 8.799 12.964 19.648s-5.804 19.645-12.964 19.645zm26.46-63.517c-15.357 0-27.807-8.556-27.807-19.112s12.449-19.117 27.807-19.117c15.355 0 27.804 8.561 27.804 19.117s-12.449 19.112-27.804 19.112z"/></svg>'
);

UUIIconService.defineIcon(
  'info',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M230.384 224.6c4.293-11.035-1.231-16.553-6.143-16.553-22.688 0-52.154 53.374-63.173 53.374-4.311 0-7.99-4.307-7.99-7.985 0-11.043 26.991-36.805 34.982-44.783 24.528-23.312 56.44-41.104 92.027-41.104 26.368 0 54.601 15.945 32.515 75.471L268.42 362.638c-3.665 9.205-10.415 24.557-10.415 34.367 0 4.29 2.438 8.595 7.348 8.595 18.396 0 52.155-52.158 60.748-52.158 3.061 0 7.351 3.675 7.351 9.196 0 17.793-71.771 93.876-133.744 93.876-22.088 0-37.423-10.421-37.423-33.738 0-29.441 20.854-79.757 25.169-90.194l42.93-107.982zm33.125-120.861c0-26.992 23.309-49.073 50.308-49.073 24.556 0 42.336 16.554 42.336 41.716 0 28.233-23.303 49.094-50.914 49.094-25.151 0-41.73-16.576-41.73-41.737z"/></svg>'
);

UUIIconService.defineIcon(
  'delete',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.431 167.814l-58.757-58.76-88.029 88.026-88.028-88.026-58.76 58.76 88.026 88.027-88.026 88.024 58.76 58.768 88.028-88.031 88.029 88.031 58.757-58.768-88.027-88.024z"/></svg>'
);

UUIIconService.defineIcon(
  'eye-open',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 6C9 6 3 10 0 16c3 6 9 10 16 10s13-4 16-10c-3-6-9-10-16-10zm8 5.3c1.8 1.2 3.4 2.8 4.6 4.7-1.2 2-2.8 3.5-4.7 4.7-3 1.5-6 2.3-8 2.3s-6-.8-8-2.3C6 19.5 4 18 3 16c1.5-2 3-3.5 5-4.7l.6-.2C8 12 8 13 8 14c0 4.5 3.5 8 8 8s8-3.5 8-8c0-1-.3-2-.6-2.6l.4.3zM16 13c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z"/></svg>'
);

UUIIconService.defineIcon(
  'eye-closed',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M29.6.4C29 0 28 0 27.4.4L21 6.8c-1.4-.5-3-.8-5-.8C9 6 3 10 0 16c1.3 2.6 3 4.8 5.4 6.5l-5 5c-.5.5-.5 1.5 0 2 .3.4.7.5 1 .5s1 0 1.2-.4l27-27C30 2 30 1 29.6.4zM13 10c1.3 0 2.4 1 2.8 2L12 15.8c-1-.4-2-1.5-2-2.8 0-1.7 1.3-3 3-3zm-9.6 6c1.2-2 2.8-3.5 4.7-4.7l.7-.2c-.4 1-.6 2-.6 3 0 1.8.6 3.4 1.6 4.7l-2 2c-1.6-1.2-3-2.7-4-4.4zM24 13.8c0-.8 0-1.7-.4-2.4l-10 10c.7.3 1.6.4 2.4.4 4.4 0 8-3.6 8-8z"/><path d="M26 9l-2.2 2.2c2 1.3 3.6 3 4.8 4.8-1.2 2-2.8 3.5-4.7 4.7-2.7 1.5-5.4 2.3-8 2.3-1.4 0-2.6 0-3.8-.4L10 25c2 .6 4 1 6 1 7 0 13-4 16-10-1.4-2.8-3.5-5.2-6-7z"/></svg>'
);

// Example of how to implement a listener, emitted when a icon is begin requested:
UUIIconService.addEventListener(UUIIconServiceEvent.ICON_REQUEST, ((
  event: UUIIconServiceEvent
) => {
  console.log(event, event.detail);
  if (event.detail.iconName === 'check') {
    UUIIconService.defineIcon(
      'check',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M461.884 68.14c-132.601 81.297-228.817 183.87-272.048 235.345l-105.874-82.95-46.751 37.691 182.941 186.049c31.485-80.646 131.198-238.264 252.956-350.252L461.884 68.14z"/></svg>'
    );
  }
}) as EventListener);

export const Overview = () => html`
  <uui-icon name="bug"></uui-icon>
  <uui-icon name="check"></uui-icon>
  <uui-icon name="check" style="color:green"></uui-icon>
  <uui-icon name="bug" style="color:red"></uui-icon>
  <uui-icon name="info" style="color:red"></uui-icon>
  <uui-icon name="bug" style="color:blue; font-size:50px;"></uui-icon>
`;
