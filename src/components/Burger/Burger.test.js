import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Burger from "./Burger";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

configure({ adapter: new Adapter() });

describe("<Burger />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
			<Burger ingredients={{ cheese: 0, salad: 0, bacon: 0, meat: 0 }} />
		);
	});
	it("should render 2 <BurgerIngredient /> when all ingredients and 0", () => {
		expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
	});
});
