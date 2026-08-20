import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import SchoolItem from './SchoolItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#f5f5f5',
    },
});

class SchoolList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.props.schools} renderItem={({ item }) => <SchoolItem school={item} />} keyExtractor={(item) => item.school} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const schools = _.chain(state.people)
        .groupBy(person => person.school || 'Unassigned school')
        .map((contacts, school) => ({
            school,
            employees: _.chain(contacts)
                .groupBy(person => person.employee || 'Unassigned employee')
                .map((employeeContacts, name) => ({ name, contacts: employeeContacts }))
                .value(),
        }))
        .value();

    return { schools };
};

export default connect(mapStateToProps)(SchoolList);
