import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  fetchContactsSuccess,
  addContactSuccess,
  deleteContactSuccess,
  filterContacts,
  patchContactSuccess,
  editContact,
} from '../contacts';

const itemsReducer = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => {
    if (state.find(({ name }) => name === payload.name)) {
      alert(`${payload.name} is already in contacts`);
      return;
    }

    return [...state, payload];
  },
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [patchContactSuccess]: (state, { payload }) =>
    state.map(contact => (contact.id === payload.id ? payload : contact)),
});

const initialContact = {
  name: null,
  number: null,
  id: null,
};

const editReducer = createReducer(initialContact, {
  [editContact]: (_, { payload }) => payload,
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

export default combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  editContact: editReducer,
});
