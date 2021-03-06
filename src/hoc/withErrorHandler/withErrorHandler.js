import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
// import axios from 'axios';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = { error: null };
		componentWillMount() {
			this.requestInterceptors = axios.interceptors.request.use((request) => {
				this.setState({ error: null });
				return request;
			});
			this.responseInterceptors = axios.interceptors.response.use(
				(response) => response,
				(error) => {
					this.setState({ error: error });
				}
			);
		}
		// requestInterceptors = axios.interceptors.request.use(request => {
		//     this.setState({error: null});
		//         return request;
		// });
		// responseInterceptors =axios.interceptors.response.use(response => response,error => {
		//     this.setState({error: error})
		//  });
		componentWillUnmount() {
			axios.interceptors.request.eject(this.requestInterceptors);
			axios.interceptors.response.eject(this.responseInterceptors);
		}
		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
