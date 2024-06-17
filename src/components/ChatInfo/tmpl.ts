export const template = /* html*/ `
  <div class='user-info-chat'>
    <div class='user-info'>
      <img src="{{avatar}}" alt="Аватар {{title}}"/>
      <p class="chat-info">{{title}} ({{count}} участников)</p>
    </div>
    {{addButton}}
  </div>
`;
