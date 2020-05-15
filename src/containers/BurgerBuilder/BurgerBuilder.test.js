import React from "react";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Modal from "../../components/UI/Modal/Modal";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}} />);
	});

	it("should render <BuildControls /> if ingredients received", () => {
		wrapper.setProps({ ings: { cheese: 0 } });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    
    it("should render <Modal /> if purchasing", () => {
		wrapper.setState({ purchasing: true});
		expect(wrapper.find(Modal)).toHaveLength(1);
	});
});
