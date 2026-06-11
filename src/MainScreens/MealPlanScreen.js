import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export default function MealPlanScreen() {
  const location = useLocation();
  const { result, prob, mealPlan } = location.state || {};

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">Prediction Result</Typography>

        <Typography sx={{ mt: 2 }}>
          Risk: {result === 1 ? "High Risk" : "Low Risk"}
        </Typography>

        <Typography>
          Probability: {prob ? (prob * 100).toFixed(2) : 0}%
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4">Meal Recommendation</Typography>

        <Typography sx={{ mt: 2 }}>
          Risk Level: {mealPlan?.risk_level || "Not available"}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          {mealPlan?.message || "No meal recommendation available."}
        </Typography>

        {mealPlan?.foods?.length > 0 ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recommended Foods
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>#</b></TableCell>
                    <TableCell><b>Food Name</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {mealPlan.foods.map((food, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {food
                          .replace(", raw", "")
                          .replace("raw", "")
                          .trim()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }}>
            No strict meal plan required.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}