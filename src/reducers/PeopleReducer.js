const initialState = {
    people: [],
    detailView: false,
    personSelected: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    school: '',
    project: '',
    notes: '',
    employee: '',
    _id: '',
    toUpdate: false,
    user: null,
    authEmail: '',
    authPassword: '',
    authLoading: false,
    authError: '',
    contactsLoading: false,
    contactError: '',
};

const resetContactForm = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    school: '',
    project: '',
    notes: '',
    employee: '',
    _id: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOADING':
            return { ...state, authLoading: true, authError: '' };
        case 'AUTH_STATE_CHANGED':
        case 'AUTH_SUCCESS':
            return { ...state, user: action.payload, authLoading: false, authError: '', authPassword: '' };
        case 'AUTH_ERROR':
            return { ...state, authLoading: false, authError: action.payload };
        case 'AUTH_FORM_UPDATE':
            return { ...state, [action.payload.prop]: action.payload.value };
        case 'LOG_OUT':
            return { ...initialState };
        case 'CONTACTS_LOADING':
            return { ...state, contactsLoading: true, contactError: '' };
        case 'CONTACT_ERROR':
            return { ...state, contactsLoading: false, contactError: action.payload };
        case 'INITIAL_FETCH':
            return { ...state, people: action.payload, contactsLoading: false, contactError: '' };
        case 'SELECTED_PERSON':
            return { ...state, detailView: true, personSelected: action.selectId };
        case 'NONE_SELECTED':
            return { ...state, detailView: false, personSelected: null, toUpdate: false };
        case 'FORM_UPDATE':
            return { ...state, [action.payload.prop]: action.payload.value };
        case 'NEW_CONTACT':
            return { ...state, ...resetContactForm, contactError: '' };
        case 'ADD_PERSON':
            return { ...state, ...action.newPerson };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                toUpdate: true,
                firstName: action.payload.firstName || '',
                lastName: action.payload.lastName || '',
                phone: action.payload.phone || '',
                email: action.payload.email || '',
                company: action.payload.company || '',
                school: action.payload.school || '',
                project: action.payload.project || '',
                notes: action.payload.notes || '',
                employee: action.payload.employee || '',
                _id: action.payload._id,
            };
        case 'SAVE_CONTACT':
            return { ...state, ...resetContactForm, toUpdate: false, detailView: false, contactError: '' };
        case 'DELETE_CONTACT':
            return { ...state, detailView: false, personSelected: null, contactError: '' };
        default:
            return state;
    }
};
