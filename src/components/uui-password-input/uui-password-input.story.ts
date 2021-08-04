import { html } from 'lit-html';
import './index';

export default {
  title: 'Inputs/Password',
  component: 'uui-password-input',
};

export const Overview = () =>
  html`
  <uui-password-input 
    label = "Password"
   .toggleText=${{ showText: 'Vis password', hideText: 'Skjul password' }} 
    @password-toggle=${(e: CustomEvent) =>
      console.log(
        e.detail ? 'Showing your password.' : 'Your password is hidden.'
      )} />
  </uui-password-input>
  `;
