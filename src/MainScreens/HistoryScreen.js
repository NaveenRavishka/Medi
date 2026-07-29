import React, { useContext, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import { Context as SavePredicValuesContext } from "../Context/SavePredicValuesContext";

export default function HistoryScreen() {

  const {
    state: { Getall, GetallStatus },
    GetAllDetails
  } = useContext(SavePredicValuesContext);

  useEffect(() => {
    GetAllDetails();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Prediction History
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Cholesterol</TableCell>
              <TableCell>FBS</TableCell>
              <TableCell>Prediction</TableCell>
              <TableCell>Probability</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {Getall.length > 0 ? (
              Getall.map((item) => (
                <TableRow key={item._id}>

                  <TableCell>
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>{item.age}</TableCell>

                  <TableCell>
                    {item.sex === 1 ? "Male" : "Female"}
                  </TableCell>

                  <TableCell>{item.chol}</TableCell>

                  <TableCell>{item.fbs}</TableCell>

                  <TableCell>
                    {item.prediction === 1 ? "High Risk" : "Low Risk"}
                  </TableCell>

                  <TableCell>
                    {(item.probability * 100).toFixed(2)}%
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No prediction history found.
                </TableCell>
              </TableRow>
            )}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}