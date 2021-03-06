import React, { Component } from "react";
import { connect } from "react-redux";

import logo from "../../logo.svg";

import { getFriends } from "../../actions";
import FriendCard from "../Card/Card";

class Cards extends Component {
  componentDidMount() {
    this.props.getFriends();
  }
  render() {
    // console.log("this.props.state", this.props.state);
    const state = this.props.state;
    const { fetchingFriends, friendsFetched, error, friends } = state;
    // console.log("friends",friends)
    // console.log("fetchingFriends", fetchingFriends);
    return (
      <div className="row">
        {fetchingFriends && !friendsFetched ? (
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <div>Fetching friends</div>
          </div>
        ) : friendsFetched ? (
          friends.map(((friend, i) => this.fillFriendCard(friend, i)))
        ) : (
          <div>
            <h3>Something went wrong, please, reload the page</h3>
            <h4>{error}</h4>
          </div>
        )}
      </div>
    );
  }

  fillFriendCard(friend, i) {
    // console.log("friend", friend);
    return <FriendCard id={i} friend={friend} key={Date.now()+friend.id} />;
  }
}
const stateToProps = state => {
  return {
    state: state.friendsReducer
  };
};
export default connect(stateToProps, { getFriends })(Cards);
