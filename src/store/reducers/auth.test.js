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

	it("should set loading on login start", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.AUTH_START,
			})
		).toEqual({ ...initialState, loading: true });
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

	it("should return error on login fail", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.AUTH_FAIL,
				error: "some-error",
			})
		).toEqual({ ...initialState, error: "some-error" });
	});

	it("should remove token and userId on logout", () => {
		expect(
			reducer(
				{ ...initialState, token: "token", userId: "userId" },
				{
					type: actionTypes.AUTH_LOGOUT,
				}
			)
		).toEqual(initialState);
	});

	it("should store auth Redirect path", () => {
		expect(
			reducer(initialState, {
				type: actionTypes.SET_AUTH_REDIRECT_PATH,
				path: "/test",
			})
		).toEqual({ ...initialState, authRedirectPath: "/test" });
	});
});
