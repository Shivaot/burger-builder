import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as authActions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

export const Auth = props => {
	
		const [controls, setControls] = useState({
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Mail",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Your Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		});
		const [isSignUp , setIsSignUp] = useState(true);

		const { buildingBurger,authRedirectPath, onSetAuthRedirectPath } = props;
		useEffect(() => {
			if (!buildingBurger && authRedirectPath !== '/') {
				onSetAuthRedirectPath();
			}
		}, [buildingBurger,authRedirectPath,onSetAuthRedirectPath])

  

	const checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		return isValid;
	}

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...controls,
			[controlName]: {
				...controls[controlName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					controls[controlName].validation
				),
				touched: true,
			},
		};
		setControls(updatedControls);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onAuth(
			controls.email.value,
            controls.password.value,
            isSignUp
		);
	};

	const switchAuthModeHandler = () => {
		setIsSignUp(!isSignUp)
	};

		let formElementsArray = [];
		for (let key in controls) {
			formElementsArray.push({
				key: key,
				config: controls[key],
			});
		}
		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.key}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.elementConfig.value}
				inValid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => inputChangedHandler(event, formElement.key)}
			/>
        ));
        if (props.loading) {
            form = <Spinner />;       
        }
        let errorMessage = null;
        if (props.error) {
            errorMessage = <h1>{props.error.message}</h1>;
        }
        let authRedirect = null;
        if (props.isAuthenticated) {
            authRedirect = <Redirect to={props.authRedirectPath} />;
        }
		return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
				<form onSubmit={submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={switchAuthModeHandler} btnType="Danger">
					SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
				</Button>
			</div>
		);
	
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
	return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirect('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
