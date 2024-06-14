export const template = /* html */ `
  <div class='modal-wrapper'>
    <div class='modal'>
      <h3 class='modal-title'>{{title}}</h3>
      <{{wrapperType}} class='modal-form'>
        {{each inputs}}
          {{inputs}}
        {{endeach}}
      </{{wrapperType}}>
    </div>
  </div>
`;
