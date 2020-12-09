const { configureStore } = require("@reduxjs/toolkit")
const { default: rootReducer } = require("./rootReducer")

const store = configureStore({
    reducer: rootReducer
})

export default store;