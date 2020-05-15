import reducer from "./auth";
import * as actionTypes from "../actions/actionsTypes";

describe("auth reducer", () => {
	let initialState;
	beforeEach(() => {
		initialState = {
			token: null,
			userId: null,
			error: null,
			loading: false,
			authRedirectPath: "/",
		};
	});
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it("should store token on login", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.AUTH_SUCCESS,
				token: "token",
				userId: "userId",
			})
		).toEqual({ ...initialState, token: "token", userId: "userId" });
	});
});
