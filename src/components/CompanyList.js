import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import CompanyItem from './CompanyItem';

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 80 },
});

class CompanyList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.props.companies} renderItem={({ item }) => <CompanyItem companies={item} />} keyExtractor={(item, index) => index.toString()} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const companies = _.chain(state.people)
        .groupBy('company')
        .map((value, key) => ({ company: key, names: value }))
        .value();

    return { companies };
};

export default connect(mapStateToProps)(CompanyList);
