import React from "react";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";

import Quiz from "./pages/Quiz";
import Results from "./components/Results";
function App({ userInput }) {
  return (
    <div className="App">
      <Quiz />
      {userInput ? <Results /> : null}
    </div>
  );
}

const mapStateToProps = state => ({
  userInput: state.userInput
});

export default connect(mapStateToProps)(App);
