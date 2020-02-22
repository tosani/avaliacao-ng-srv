import { ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { SecureStorage } from 'src/app/service/secure-storage.service';
import * as fromPessoa from './pessoa-reducers';

export interface PessoaModuloState {
    pessoas: fromPessoa.PessoaState;
}

export const reducerMap: ActionReducerMap<any> = {
    pessoas: fromPessoa.reducers,
};

export const getPessoaModuloState = createFeatureSelector<PessoaModuloState>('pessoaMod');

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    const secureStorage: SecureStorage = new SecureStorage(sessionStorage, 'QW89!@@F648qwfD');
    return localStorageSync({ keys: ['pessoaMod'], rehydrate: true, storage: secureStorage })(reducer);
}

export const metaReducer: MetaReducer<any, any> = localStorageSyncReducer;
