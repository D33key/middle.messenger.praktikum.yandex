import { Slowact } from '@/Templater/Slowact';

interface ImgProps {
	key: string;
	className?: string;
	attributes: {
		src: string;
		alt: string;
	};
}

const Img = ({ key, attributes, className }: ImgProps) => {
	return Slowact.createElement('img', {
		key,
		className,
		attributes,
	});
};

export default Img;
