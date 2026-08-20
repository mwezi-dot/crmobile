import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 8,
    },
    employee: {
        paddingVertical: 4,
        color: '#424242',
    },
});

const SchoolItem = ({ school }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Icon name="school" size={32} color="#4DB6AC" />
                <Text style={styles.title}>{school.school}</Text>
            </View>
            {school.employees.map((employee) => (
                <Text key={employee.name} style={styles.employee}>
                    {employee.name}: {employee.contacts.length} contact{employee.contacts.length === 1 ? '' : 's'}
                </Text>
            ))}
        </View>
    );
};

export default SchoolItem;
