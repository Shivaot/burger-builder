import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import * as authActions from "./store/actions/index";

class App extends Component {
	componentDidMount() {
		this.props.onAutoSignIn();
	}
	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={Auth} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to='/' />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAutoSignIn: () => dispatch(authActions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
