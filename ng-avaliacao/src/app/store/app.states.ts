import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromPessoas from '../modules/pessoa/store/reducers';

export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
};

export const metaReducers: Array<MetaReducer<any, any>> = [fromPessoas.metaReducer];