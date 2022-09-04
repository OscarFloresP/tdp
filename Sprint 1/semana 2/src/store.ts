import {createStore} from 'redux'
import { FilterReducer } from './notesReducer'

export const store = createStore(FilterReducer )