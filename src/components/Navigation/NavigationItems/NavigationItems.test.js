import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// with this enzyme is configured and connected
configure({ adapter: new Adapter() });

/**
 * takes 2 param
 * @param {string} - bundle of the file being tested in this test file
 * @param {function} - function containing the tests
 */
describe("<NavigationItems />", () => {
	let wrapper;
	/**
	 * automatically be executed before each test runs
	 * @param {function} - function which gets executed before each test
	 */
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	})


	/**
	 * takes 2 param
	 * @param {string} -> what test does
	 * @param {function} -> actual individual unit test
	 */
	it("should render two <NavigationItem /> elements if not authenticated", () => {
		/**
		 * shallow is provided by enzyme so that we don't have to render whole app just to test a single component
		 * wrapper hold the shallow jsx of our component to be tested
		 * shallow does bring its sub child as components but brings them as placeholder
		 */
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
	it("should render three <NavigationItem /> elements if authenticated", () => {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});
	it("should render an exact logout button", () => {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
	});
	it("should render with a class NavigationItems", () => {
		expect(wrapper.find('.NavigationItems').hasClass("NavigationItems")).toEqual(true);
	});


});



