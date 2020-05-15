import React from "react";

import BurgerIngredients from "./BurgerIngredients";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerIngredients />", () => {
	let wrapper;
	it("should render  bacon when bacon type is define", () => {
		wrapper = shallow(<BurgerIngredients type={"bacon"} />);
		expect(wrapper.contains(<div className={"Bacon"}></div>)).toEqual(true);
	});
	it("should render cheese when cheese type is define", () => {
		wrapper = shallow(<BurgerIngredients type={"cheese"} />);
		expect(wrapper.contains(<div className={"Cheese"}></div>)).toEqual(true);
	});
	it("should render meat when meat type is define", () => {
		wrapper = shallow(<BurgerIngredients type={"meat"} />);
		expect(wrapper.contains(<div className={"Meat"}></div>)).toEqual(true);
	});
	it("should render salad when salad type is define", () => {
		wrapper = shallow(<BurgerIngredients type={"salad"} />);
		expect(wrapper.contains(<div className={"Salad"}></div>)).toEqual(true);
	});
});
