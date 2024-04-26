import { Slowact } from './Templater';
import './style.css';
import Button from './templates/button';

Slowact.createRoot('.app');

const DivWrapper = ({ key }: { key: string }) => {
	const smt = Slowact.createState(false);
	const funcSmt = Slowact.changeState(smt, key);

	return Slowact.createElement(
		'div',
		{
			key,
			className: 'wrapper-bigger',
			onClick: () => {
				funcSmt(true)
			}
		},
		'Inside Wrapper ',
		Slowact.createElement(
			'div',
			{
				key: 'second-wrapper',
				className: 'wrapper-er',
			},
			'Privet ',
		),
		{
			value: smt,
			// Make callback like
			render: Button
		},
	);
};

DivWrapper({ key: 'wrapper-bigger' });

Slowact.render();

console.log('RootMap in main.ts', Slowact.rootMap);
