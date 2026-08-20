import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from '@react-native-material/core';
import * as actions from '../actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 120,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    field: {
        height: 70,
    },
    button: {
        marginTop: 12,
    },
    error: {
        color: '#d32f2f',
        marginTop: 16,
        textAlign: 'center',
    },
});

class AuthScreen extends Component {
    onSignInPress() {
        const { authEmail, authPassword } = this.props;
        this.props.signIn({ email: authEmail, password: authPassword });
    }

    onSignUpPress() {
        const { authEmail, authPassword } = this.props;
        this.props.signUp({ email: authEmail, password: authPassword });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>CRM Login</Text>
                <TextInput label="Email" keyboardType="email-address" autoCapitalize="none" style={styles.field} value={this.props.authEmail} onChangeText={value => this.props.authFormUpdate({ prop: 'authEmail', value })} />
                <TextInput label="Password" secureTextEntry style={styles.field} value={this.props.authPassword} onChangeText={value => this.props.authFormUpdate({ prop: 'authPassword', value })} />
                <View style={styles.button}><Button title={this.props.authLoading ? 'Signing in...' : 'Sign In'} color="#4db6ac" onPress={this.onSignInPress.bind(this)} disabled={this.props.authLoading} /></View>
                <View style={styles.button}><Button title="Create Account" variant="outlined" color="#4db6ac" onPress={this.onSignUpPress.bind(this)} disabled={this.props.authLoading} /></View>
                {this.props.authError ? <Text style={styles.error}>{this.props.authError}</Text> : null}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    authEmail: state.authEmail,
    authPassword: state.authPassword,
    authLoading: state.authLoading,
    authError: state.authError,
});

export default connect(mapStateToProps, actions)(AuthScreen);
