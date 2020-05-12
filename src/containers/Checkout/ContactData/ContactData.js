import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
			},
			zipCode: {

				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code",
				},
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
                value: "",
                validation: {
                    required: true
                ,
                valid: false,
                touched: false
            }
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-mail",
				},
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
                value: "fastest",
                validation: {},
                valid: true
			},
        },
        formIsValid: false
    };
    
    checkValidity(value,rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event,inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderFormElement = {...updatedOrderForm[inputId]}; // deep copying
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputId] = updatedOrderFormElement;   
        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }     
        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid});
    }

	orderHandler = (event) => {
		event.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value; 
        }
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderBurger(order);
    };
	render() {
		let formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				key: key,
				config: this.state.orderForm[key],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.key}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
                        value={formElement.config.elementConfig.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.key)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {

		onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
