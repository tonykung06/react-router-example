import React from 'react';
import {Router, Route, Link, Redirect, IndexRoute, browserHistory, hashHistory} from 'react-router';

const DefaultComponent = () => <div>no sub-route, this is Index Route</div>;

// const Home = () => <div><h1>Home</h1><Links /></div>;
class Home extends React.Component {
	componentWillMount() {
		this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
	}

	routerWillLeave(nextLocation) {
		//this will auto give a prompt confirmation
		return `leaving home for ${nextLocation.pathname}`;
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
				<Links />
			</div>
		);
	}
}

Home.contextTypes = {
	router: React.PropTypes.object.isRequired
};

const HomeBody = () => <div><h1>the is the content of Home</h1></div>;
const About = (props) => <div><h1>About</h1>{props.children}</div>;
const AboutBody = (props) => <div><h1>This is the about content</h1>{props.children}</div>;
const Contact = (props) => <div><h1>Contact</h1>{props.params.message} {props.children}</div>;

const Links = () => (
	<nav>
		<Link activeClassName="active-nav-link" activeStyle={{
			color: 'green'
		}} to="/">Home</Link>
		<Link activeClassName="active-nav-link" activeStyle={{
			color: 'green'
		}} to="/about">About</Link>
		<Link activeClassName="active-nav-link" activeStyle={{
			color: 'green'
		}} to="/old-about">Old About</Link>
		<Link activeClassName="active-nav-link" activeStyle={{
			color: 'green'
		}} to="/about/contact">Contact</Link>

		<Link activeClassName="active-nav-link" activeStyle={{
			color: 'green'
		}} to={{
			pathname: '/',
			query: {
				message: 'testing query string'
			}
		}}>testing route with query string</Link>
	</nav>
);

const Container = (props) => (
	<div>
		{props.location.query.message}
		{props.header}
		{props.body}
		<h2>Nested Route Contents</h2>
		{props.children}
	</div>
);

//if want to use browserHistory that provides clean url path,
//    need to set up the server to handle it
class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Container}>
					<IndexRoute components={{
						header: Home,
						body: HomeBody
					}} />
					<Route path="about" components={{
						header: About,
						body: AboutBody
					}}>
						<IndexRoute component={DefaultComponent} />
						<Route path="contact/(:message)" component={Contact}>
							<IndexRoute component={DefaultComponent} />
						</Route>
					</Route>
					<Redirect from="old-about" to="about" />
				</Route>
			</Router>
		);
	}
}

export default App;