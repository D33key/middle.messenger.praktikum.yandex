export const template = /* html */ `
  <div class='chat-user'>
    <img src='{{avatar}}' alt='Аватар {{login}}' />
    <span class='chat-user-name'>{{name}}</span>
    {{if removeBtn}}
      {{removeBtn}}
    {{endif}}
  </div>
`;
