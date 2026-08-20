import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const contactsCollection = collection(db, 'contacts');

const contactPayload = ({ firstName, lastName, phone, email, company, school, project, notes, employee }) => ({
    firstName: firstName || '',
    lastName: lastName || '',
    phone: phone || '',
    email: email || '',
    company: company || '',
    school: school || '',
    project: project || '',
    notes: notes || '',
    employee: employee || '',
});

export const selectPerson = (peopleId) => ({
    type: 'SELECTED_PERSON',
    selectId: peopleId,
});

export const noneSelected = () => ({
    type: 'NONE_SELECTED',
});

export const formUpdate = ({ prop, value }) => ({
    type: 'FORM_UPDATE',
    payload: { prop, value },
});

export const authFormUpdate = ({ prop, value }) => ({
    type: 'AUTH_FORM_UPDATE',
    payload: { prop, value },
});

export const watchAuthState = () => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_LOADING' });

        return onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'AUTH_STATE_CHANGED', payload: user });

            if (user) {
                dispatch(loadInitialContacts());
            }
        });
    };
};

export const signIn = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_LOADING' });

        return signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch({ type: 'AUTH_SUCCESS', payload: user });
                dispatch(loadInitialContacts());
            })
            .catch(error => dispatch({ type: 'AUTH_ERROR', payload: error.message }));
    };
};

export const signUp = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: 'AUTH_LOADING' });

        return createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch({ type: 'AUTH_SUCCESS', payload: user });
                dispatch(loadInitialContacts());
            })
            .catch(error => dispatch({ type: 'AUTH_ERROR', payload: error.message }));
    };
};

export const logOut = () => {
    return (dispatch) => {
        return signOut(auth)
            .then(() => dispatch({ type: 'LOG_OUT' }))
            .catch(error => dispatch({ type: 'AUTH_ERROR', payload: error.message }));
    };
};

export const createNewContact = (person) => {
    return (dispatch) => {
        return addDoc(contactsCollection, {
            ...contactPayload(person),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        })
            .then(() => dispatch({ type: 'NEW_CONTACT' }))
            .then(() => dispatch(loadInitialContacts()))
            .catch(error => dispatch({ type: 'CONTACT_ERROR', payload: error.message }));
    };
};

export const updateContact = (person) => ({
    type: 'UPDATE_CONTACT',
    payload: person,
});

export const saveContact = ({ _id, ...person }) => {
    return (dispatch) => {
        return updateDoc(doc(db, 'contacts', _id), {
            ...contactPayload(person),
            updatedAt: serverTimestamp(),
        })
            .then(() => dispatch({ type: 'SAVE_CONTACT' }))
            .then(() => dispatch(loadInitialContacts()))
            .catch(error => dispatch({ type: 'CONTACT_ERROR', payload: error.message }));
    };
};

export const deleteContact = (id) => {
    return (dispatch) => {
        return deleteDoc(doc(db, 'contacts', id))
            .then(() => dispatch({ type: 'DELETE_CONTACT' }))
            .then(() => dispatch(loadInitialContacts()))
            .catch(error => dispatch({ type: 'CONTACT_ERROR', payload: error.message }));
    };
};

export const loadInitialContacts = () => {
    return (dispatch) => {
        dispatch({ type: 'CONTACTS_LOADING' });

        return getDocs(query(contactsCollection, orderBy('lastName')))
            .then((snapshot) => {
                const people = snapshot.docs.map((contactDoc) => ({
                    _id: contactDoc.id,
                    ...contactDoc.data(),
                }));

                dispatch({ type: 'INITIAL_FETCH', payload: people });
            })
            .catch(error => dispatch({ type: 'CONTACT_ERROR', payload: error.message }));
    };
};
