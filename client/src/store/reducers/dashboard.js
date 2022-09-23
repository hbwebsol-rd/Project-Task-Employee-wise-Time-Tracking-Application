import {  FETCH_DASHBOARD_SUCCESS, DASHBOARD_LOADER, DASHBOARD_ACTION_FAIL } from "../actions/dashboardActions";

const initialState = {
    loading: false,
    error: null,
    updated: false,
    count:[],
    todayTask:[],
    employeeTask:[]
}

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD_LOADER: {
            return {
                ...state,
                loading: true,
                updated: false
            }
        }
        case DASHBOARD_ACTION_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case FETCH_DASHBOARD_SUCCESS: {
            return {
                ...state,
                loading: false,
                count: action.payload.data.count,
                todayTask: action.payload.data.todayTasks,
                employeeTask:action.payload.data
            };
        }
        default: {
            return state
        }
    }
}

export default dashboard