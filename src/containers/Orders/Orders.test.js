import React from "react";

import { Orders } from "./Orders";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from '../../components/Order/Order';

configure({ adapter: new Adapter() });

describe("<Orders />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Orders orders={[{id:1}]} onFetchOrders={() => {}} />);
	});

	it("should render Spinner if loading", () => {
		wrapper.setProps({ loading: true });
		expect(wrapper.find(Spinner)).toHaveLength(1);
	});

	it("should render orders if not loading", () => {
        wrapper.setProps({ loading: false });
        expect(wrapper.find(Order)).toHaveLength(1);
	});
});
