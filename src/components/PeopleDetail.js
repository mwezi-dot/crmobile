import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import DetailView from './DetailView';
import UpdatePerson from './UpdatePerson';
import * as actions from '../actions';

class PeopleDetail extends Component {
    renderDetails() {
        if (this.props.toUpdate) {
            return <UpdatePerson />;
        }

        return <DetailView />;
    }

    render() {
        return <View>{this.renderDetails()}</View>;
    }
}

const mapStateToProps = state => ({ toUpdate: state.toUpdate });

export default connect(mapStateToProps, actions)(PeopleDetail);
