import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Checkout } from "./Checkout";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<Checkout />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Checkout match={{}} />);
	});

	it("should return summary if ingredients received", () => {
		wrapper.setProps({ ings: { cheese: 1 } });
		expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
	});

	it("should redirect to / if purchased", () => {
		wrapper.setProps({ purchased: true });
		expect(wrapper.contains(<Redirect to="/" />)).toEqual(true);
	});
});
