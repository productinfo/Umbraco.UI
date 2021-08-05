import { html } from 'lit-html';
import { state } from 'lit/decorators';
import '.';

export default {
  title: 'Misc/Overlay',
  component: 'uui-overlay',
};

export const Default = () => {
  const element = html`
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
    <div style="width: 3000px; background: gray">
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
