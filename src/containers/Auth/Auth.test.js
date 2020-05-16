import React from "react";
import { Redirect } from "react-router-dom";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Auth } from "./Auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";

configure({ adapter: new Adapter() });

describe("<Auth />", () => {
	let wrapper;
	let validation = {
		required: true,
	};
	beforeEach(() => {
		wrapper = shallow(<Auth onSetAuthRedirectPath={() => {}} />);
	});
	it("should be invalid if input box in empty", () => {
		expect(wrapper.instance().checkValidity("", validation)).toEqual(false);
	});
	it("should be invalid if email in wrong", () => {
		expect(
			wrapper
				.instance()
				.checkValidity("abce@", { ...validation, isEmail: true })
		).toEqual(false);
	});
	it("should be valid if email in correct", () => {
		expect(
			wrapper
				.instance()
				.checkValidity("abce@mail.in", { ...validation, isEmail: true })
		).toEqual(true);
	});
	it("should be invalid if length is less than 6", () => {
		expect(
			wrapper.instance().checkValidity("12234", { ...validation, minLength: 6 })
		).toEqual(false);
	});
	it("should be valid if length is more than 6", () => {
		expect(
			wrapper
				.instance()
				.checkValidity("12234234", { ...validation, minLength: 6 })
		).toEqual(true);
	});
	it("should render <Spinner/> if loading true", () => {
		wrapper.setProps({ loading: true });
		expect(wrapper.find(Spinner)).toHaveLength(1);
	});
	it("should render error message if error occurs", () => {
		wrapper.setProps({ error: { message: "some-error" } });
		expect(wrapper.contains(<h1>some-error</h1>)).toEqual(true);
	});
	it("should render redirect if authenticated", () => {
		wrapper.setProps({ isAuthenticated: true, authRedirectPath: "/" });
		expect(wrapper.contains(<Redirect to={"/"} />)).toEqual(true);
	});
	it("should render signup button", () => {
		wrapper.setState({ isSignUp: false });
		expect(wrapper.html()).toMatch("SWITCH TO SIGNUP");
	});
});
