import React from "react";

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });


describe('<BurgerBuilder />',() => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}} />);
    }) 

    it('should render <BuildControls /> if ingredients received', () => {
        wrapper.setProps({ings: {cheese : 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})