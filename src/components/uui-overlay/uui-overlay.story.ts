import { html } from 'lit-html';
import '.';

export default {
  title: 'Misc/Overlay',
  component: 'uui-overlay',
};

export const Default = () => html`
  <div style="width: 200px">
    The overlay should go over me <br />
    Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
    dlkad d asd adw ahs d
  </div>
  <div style="width: 200px">
    The overlay should go over me <br />
    Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
    dlkad d asd adw ahs d
  </div>
  <div style="margin-left: 200px">
    <div style="border: 1px solid black; height: 50px">
      I will activate the dropdown
    </div>
    <uui-overlay>
      <div
        style="padding: 10px; margin: 10px; border-radius: 10px; border: 1px solid black; background: #9a9affe6; width: 100px; height: 100px"
      >
        I am a dropdown
      </div>
    </uui-overlay>
  </div>
  <div style="width: 200px">
    The overlay should go over me <br />
    Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
    dlkad d asd adw ahs d
  </div>
`;
