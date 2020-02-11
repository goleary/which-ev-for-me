import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

export default function VehiclesTable({ rows }) {
  const classes = useStyles();
  console.log("vehicles table");
  console.log("vehicles rows:", rows);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(rows[0]).map((property, index) => (
              <TableCell key={index}>{property}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.brand}</TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.availableNow}</TableCell>
              <TableCell>{row.rangeMi}</TableCell>
              <TableCell>{row.seats}</TableCell>
              <TableCell>{formatter.format(row.priceUsd)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
