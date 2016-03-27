import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

const Home = () => <div><h1>Home</h1><Links /></div>;
const About = () => <div><h1>About</h1><Links /></div>;
const Contact = () => <div><h1>Contact</h1><Links /></div>;

const Links = () => (
	<nav>
		<div><Link to="/">Home</Link></div>
		<div><Link to="/about">About</Link></div>
		<div><Link to="/contact">Contact</Link></div>
	</nav>
);

//if want to use browserHistory that provides clean url path, need to set up the server to handle it
class App extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Home} />
				<Route path="/About" component={About} />
				<Route path="/contact" component={Contact} />
			</Router>
		);
	}
}

export default App;