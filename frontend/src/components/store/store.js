import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit'

var store= configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store