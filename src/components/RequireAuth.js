import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AuthScreen from './AuthScreen';
import * as actions from '../actions';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class RequireAuth extends Component {
    componentDidMount() {
        this.unsubscribe = this.props.watchAuthState();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        if (this.props.authLoading && !this.props.user) {
            return <View style={styles.loading}><ActivityIndicator size="large" color="#4db6ac" /></View>;
        }

        if (!this.props.user) {
            return <AuthScreen />;
        }

        return this.props.children;
    }
}

const mapStateToProps = state => ({
    user: state.user,
    authLoading: state.authLoading,
});

export default connect(mapStateToProps, actions)(RequireAuth);
