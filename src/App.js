import React from 'react';
import {Router, Route, Link, IndexRoute, browserHistory, hashHistory} from 'react-router';

const DefaultComponent = () => <div>no sub-route, this is Index Route</div>;

const Home = (props) => <div><h1>Home</h1><Links />{props.children}</div>;
const About = (props) => <div><h1>About</h1>{props.children}</div>;
const Contact = (props) => <div><h1>Contact</h1>{props.params.message} {props.children}</div>;

const Links = () => (
	<nav>
		<Link activeClassName="active-nav-link" activeStyle={{color: 'green'}} to="/">Home</Link>
		<Link activeClassName="active-nav-link" activeStyle={{color: 'green'}} to="/about">About</Link>
		<Link activeClassName="active-nav-link" activeStyle={{color: 'green'}} to="/about/contact">Contact</Link>
	</nav>
);

//if want to use browserHistory that provides clean url path, need to set up the server to handle it
class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Home}>
					<Route path="about" component={About}>
						<IndexRoute component={DefaultComponent} />
						<Route path="contact/(:message)" component={Contact}>
							<IndexRoute component={DefaultComponent} />
						</Route>
					</Route>
				</Route>
			</Router>
		);
	}
}

export default App;