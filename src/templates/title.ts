interface TitleProps {
	titleText: string;
	children?: string;
}

export const Title = ({ titleText, children }: TitleProps) => {
	return `
    <div class="title-wrapper">
      <h2 class="title">${titleText}</h2>
      ${children && children}
    </div>
  `;
};
