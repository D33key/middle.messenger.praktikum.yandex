export const template = /* html */ `
  <div class='modal-wrapper'>
    <div class='modal'>
      <h3 class='modal-title'>{{title}}</h3>
      <form class='modal-form'>
        {{each inputs}}
          {{inputs}}
        {{endeach}}
      </form>
    </div>
  </div>
`;
