import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

	// componentWillMount() {
	// 	this.props.onPurchaseInit();
	// 	console.log(this.props.purchased + " in will mount");	
	// }
	
	checkoutCancelledHandler = () => this.props.history.goBack();
	checkoutContinuedHandler = () => this.props.history.replace("/checkout/contact-data");

	render() {
		let summary = <Redirect to='/' />
		if (this.props.ings) {
			console.log(this.props.purchased+" in render");

			const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
			summary = ( 
				<div>
					{purchasedRedirect}
					<CheckoutSummary
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}/>
					{/*nested route*/}
					<Route path={this.props.match.path + "/contact-data"} component={ContactData} /> 
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
}


export default connect(mapStateToProps)(Checkout);
