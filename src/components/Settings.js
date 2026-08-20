import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '@react-native-material/core';
import * as actions from '../actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 20,
    },
});

const Settings = ({ user, logOut }) => (
    <View style={styles.container}>
        <Text style={styles.label}>Signed in as {user?.email}</Text>
        <Button title="Sign Out" color="#4db6ac" onPress={logOut} />
    </View>
);

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, actions)(Settings);
