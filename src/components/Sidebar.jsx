import { counterActions } from '../store/index';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Sidebar.module.css';

export default function Sidedebar({posts}) {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter);

	const incrementHandler = () => {
		dispatch(counterActions.inc());
	};

	const decrementHandler = () => {
		dispatch(counterActions.dec());
	};

	let error;

	if (Math.abs(counter) > posts.length) {
		error = "You have viewed fewer publications than you have rated.";
	}

	return (
		<div className={classes.wrapper}>
			<p>How many posts did you like?</p>
			<div className={classes.counter}>
				<button onClick={incrementHandler}>+</button>
				<span>{counter}</span>
				<button onClick={decrementHandler}>-</button>
			</div>
			{error}
		</div>
	);
}
