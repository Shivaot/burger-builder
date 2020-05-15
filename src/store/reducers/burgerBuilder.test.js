import * as actionTypes from "../actions/actionsTypes";
import reducer from "./burgerBuilder";

describe("burgerBuilder reducer", () => {
	let initialState;
	let INGREDIENT_PRICES;
	beforeEach(() => {
		initialState = {
			ingredients: {
				cheese: 0,
				meat: 0,
				bacon: 0,
				salad: 0,
			},
			totalPrice: 4,
			error: false,
			building: false,
		};
		INGREDIENT_PRICES = {
			salad: 0.5,
			cheese: 0.4,
			meat: 1.3,
			bacon: 0.7,
		};
	});
	it("should set ingredient", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.SET_INGREDIENTS,
				ingredients: initialState.ingredients,
			})
		).toEqual(initialState);
	});
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual({
			...initialState,
			ingredients: null,
		});
	});
	it("should add ingredient", () => {
		expect(
			reducer(
				{ ...initialState },
				{
					type: actionTypes.ADD_INGREDIENT,
					ingredientName: "cheese",
				}
			)
		).toEqual({
			...initialState,
			building: true,
			ingredients: { cheese: 1, meat: 0, bacon: 0, salad: 0 },
			totalPrice: 4 + INGREDIENT_PRICES["cheese"],
		});
	});
	it("should remove ingredient", () => {
		expect(
			reducer(
				{
					...initialState,
					ingredients: { ...initialState.ingredients, cheese: 1 },
					totalPrice: 4.4,
				},
				{
					type: actionTypes.REMOVE_INGREDIENT,
					ingredientName: "cheese",
				}
			)
		).toEqual({
			...initialState,
			building: true,
			ingredients: { cheese: 0, meat: 0, bacon: 0, salad: 0 },
			totalPrice: 4.4 - INGREDIENT_PRICES["cheese"],
		});
	});
	it("should return error if fetch failed", () => {
		expect(
			reducer(
				{ ...initialState },
				{
					type: actionTypes.FETCH_INGREDIENTS_FAILED,
				}
			)
		).toEqual({
			...initialState,
			ingredients: { cheese: 0, meat: 0, bacon: 0, salad: 0 },
			error: true,
		});
	});
});
