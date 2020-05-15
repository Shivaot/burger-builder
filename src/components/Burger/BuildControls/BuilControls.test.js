import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import BuildControls from "./BuildControls";

configure({ adapter: new Adapter() });

describe("<BuildControls />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BuildControls price={4.23} disabled />);
	});
	it("should render an exact order now button", () => {
		wrapper.setProps({ isAuth: true });
		expect(wrapper.text()).toContain("ORDER NOW");
	});
	it("should render an exact sign up button", () => {
		wrapper.setProps({ isAuth: false });
		expect(wrapper.text()).toContain("SIGNUP TO ORDER");
	});
});
