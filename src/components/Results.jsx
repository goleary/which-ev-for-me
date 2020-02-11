import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from "../services/firebase";

import VehiclesTable from "./VehiclesTable";
const Row = ({}) => <div></div>;

const ResultsComponent = ({ userInput }) => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    const getResults = async () => {
      var addMessage = firebase
        .functions()
        .httpsCallable("getMatchingVehicles");
      addMessage({ userInput }).then(response => {
        console.log("got result:", response);
        setResults(response.data);
      });
    };
    getResults();
  }, [userInput]);
  return (
    <React.Fragment>
      <div>results length: {results.length}</div>
      {results.length > 0 ? <VehiclesTable rows={results} /> : null}
    </React.Fragment>
  );
};
export default connect(
  state => ({ userInput: state.userInput }),
  {}
)(ResultsComponent);
