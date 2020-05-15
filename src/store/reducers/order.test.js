import * as actionTypes from "../actions/actionsTypes";
import reducer from "./order";

describe("order reducer", () => {
	let initialState;
	beforeEach(() => {
		initialState = {
			orders: [],
			loading: false,
			purchased: false,
		};
	});
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});
	it("should init purchase", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.PURCHASE_INIT,
			})
		).toEqual({ ...initialState, purchased: false });
	});
	it("should start purchase", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.PURCHASE_BURGER_START,
			})
		).toEqual({ ...initialState, loading: true });
	});
	it("should store purchased order data", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.PURCHASE_BURGER_SUCCESS,
				orderId: 123,
				orderData: { data: "some-data" },
			})
		).toEqual({
			...initialState,
			orders: [{ id: 123, data: "some-data" }],
			loading: false,
			purchased: true,
		});
	});
	it("should stop loading if error occurs", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.PURCHASE_BURGER_FAIL,
			})
		).toEqual({ ...initialState, loading: false });
    });
    
});
