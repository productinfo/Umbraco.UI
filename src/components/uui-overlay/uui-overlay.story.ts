import { html } from 'lit-html';
import { state } from 'lit/decorators';
import '.';

export default {
  title: 'Misc/Overlay',
  component: 'uui-overlay',
};

export const Default = () => {
  const element = html`
    <div
      style="position: fixed; margin: -24px; width: 50vw; height: 100vh; pointer-events: none; background: #0000ff1a"
    ></div>
    <div
      style="position: fixed; margin: -24px; width: 100vw; height: 50vh; pointer-events: none; background: #ff9d0029"
    ></div>
    <div style="width: 200px">
      The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d
    </div>
    <div style="margin-left: 1000px">
      <dropdown-test></dropdown-test>
    </div>
    <div style="width: 3000px">
      The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d
    </div>
    <div style="width: 200px">
      The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d The overlay should go over me <br />
      Lorem ipsum jasjdkjd jasduwj jsdawlasd as dasdj asd asdjlsakdla jdlkad lsa
      dlkad d asd adw ahs d
    </div>
  `;
  return element;
};
