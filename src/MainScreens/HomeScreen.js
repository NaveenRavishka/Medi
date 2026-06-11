
import React, { useContext, useState , } from "react";
import { Box, Button, TextField, Typography, Paper, MenuItem } from "@mui/material";
import { Context as SavePredicValuesContext } from "../Context/SavePredicValuesContext";
import { useNavigate } from "react-router-dom";

export default function HealthApp() {

  const navigate = useNavigate();
const [mealPlan, setMealPlan] = useState(null);
  const [sugarFile, setSugarFile] = useState(null);
  const [cholFile, setCholFile] = useState(null);
const { SavePredictData } = useContext(SavePredicValuesContext);
  // extracted values
  const [reportData, setReportData] = useState({
    fbs: "",
    chol: ""
  });

  // your original inputs (UNCHANGED)
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: ""
  });

  const [result, setResult] = useState(null);
  const [prob, setProb] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- OCR ----------------
  const handleExtract = async () => {

  if (!sugarFile || !cholFile) {
    alert("Upload BOTH files first");
    return;
  }

  setLoading(true);

  try {
    // ---------------- SUGAR FILE ----------------
    const sugarForm = new FormData();
    sugarForm.append("file", sugarFile);

    const res1 = await fetch("http://127.0.0.1:5000/upload-sugar", {
      method: "POST",
      body: sugarForm
    });

    const sugarData = await res1.json();

    // ---------------- CHOLESTEROL FILE ----------------
    const cholForm = new FormData();
    cholForm.append("file", cholFile);

    const res2 = await fetch("http://127.0.0.1:5000/upload-cholesterol", {
      method: "POST",
      body: cholForm
    });

    const cholData = await res2.json();

    // ---------------- DEBUG (IMPORTANT) ----------------
    console.log("SUGAR RESPONSE:", sugarData);
    console.log("CHOLESTEROL RESPONSE:", cholData);

    // ---------------- SAVE STATE ----------------
    setReportData({
      fbs: sugarData.fbs ?? null,
      chol: cholData.chol ?? null
    });

    // ---------------- USER ALERT ----------------
    alert(
      `Report Extracted\n\nFBS: ${sugarData.fbs ?? "Not found"}\nCholesterol: ${cholData.chol ?? "Not found"}`
    );

  } catch (err) {
    console.log("OCR ERROR:", err);
    alert("OCR Error - check console");
  }

  setLoading(false);
};

  // ---------------- PREDICT ----------------
  const handlePredict = async (e) => {
    e.preventDefault();

    if (!reportData.fbs || !reportData.chol) {
      alert("Please extract reports first");
      return;
    }

    const finalData = {
      age: Number(formData.age),
      sex: Number(formData.sex),
      cp: Number(formData.cp),
      trestbps: Number(formData.trestbps),
      chol: Number(reportData.chol),
      fbs: Number(reportData.fbs),
      restecg: Number(formData.restecg),
      thalach: Number(formData.thalach),
      exang: Number(formData.exang),
      oldpeak: Number(formData.oldpeak),
      slope: Number(formData.slope),
      ca: Number(formData.ca),
      thal: Number(formData.thal)
    };

    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData)
    });

    const data = await res.json();

    setResult(data.prediction);
    setProb(data.probability);
setMealPlan(data.meal_plan);
    await SavePredictData({
  ...finalData,
  prediction: data.prediction,
  probability: data.probability
});
  };

  const ready = reportData.fbs !== "" && reportData.chol !== "";

  return (
    <Box sx={{ p: 3 }}>

      <Typography variant="h4">Heart Disease Prediction System</Typography>

      {/* ================= UPLOAD ================= */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Step 1: Upload Reports</Typography>

        <p>Sugar Report</p>
        <input type="file" onChange={(e) => setSugarFile(e.target.files[0])} />

        <p>Cholesterol Report</p>
        <input type="file" onChange={(e) => setCholFile(e.target.files[0])} />

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={handleExtract}
          disabled={loading}
        >
          {loading ? "Reading..." : "Start PDF Reading"}
        </Button>

        {/* preview */}
        <Typography sx={{ mt: 2 }}>
          FBS: {reportData.fbs || "Not extracted"}
        </Typography>

        <Typography>
          Cholesterol: {reportData.chol || "Not extracted"}
        </Typography>
      </Paper>

      {/* ================= FORM (YOUR EXACT STYLE KEPT) ================= */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6">Step 2: Patient Details</Typography>

        <form onSubmit={handlePredict}>

          <TextField fullWidth label="Age" name="age" type="number"
            margin="normal" value={formData.age} onChange={handleChange} required />

          <TextField fullWidth select label="Sex" name="sex"
            margin="normal" value={formData.sex} onChange={handleChange} required>
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={0}>Female</MenuItem>
          </TextField>

          <TextField fullWidth select label="Chest Pain Type" name="cp"
            margin="normal" value={formData.cp} onChange={handleChange} required>
           <MenuItem value={0}>Typical Angina</MenuItem>
<MenuItem value={0}>Typical Angina</MenuItem>
<MenuItem value={1}>Atypical Angina</MenuItem>
<MenuItem value={2}>Non-anginal Pain</MenuItem>
<MenuItem value={3}>Asymptomatic</MenuItem>
          </TextField>

          <TextField fullWidth label="Blood Pressure" name="trestbps"
            type="number" margin="normal" value={formData.trestbps}
            onChange={handleChange} required />

          <TextField fullWidth select label="Rest ECG" name="restecg"
            margin="normal" value={formData.restecg} onChange={handleChange} required>
            <MenuItem value={0}>Normal</MenuItem>
            <MenuItem value={1}>Abnormal</MenuItem>
            <MenuItem value={2}>LVH</MenuItem>
          </TextField>

          <TextField fullWidth label="Max Heart Rate" name="thalach"
            type="number" margin="normal" value={formData.thalach}
            onChange={handleChange} required />

          <TextField fullWidth select label="Exercise Angina" name="exang"
            margin="normal" value={formData.exang} onChange={handleChange} required>
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </TextField>

         <TextField
  fullWidth
  label="Oldpeak"
  name="oldpeak"
  type="number"
  inputProps={{ min: 0, max: 6.5, step: 0.1 }}
  margin="normal"
  value={formData.oldpeak}
  onChange={handleChange}
  required
/>

          <TextField fullWidth select label="Slope" name="slope"
            margin="normal" value={formData.slope} onChange={handleChange} required>
           <MenuItem value={0}>Upsloping</MenuItem>
<MenuItem value={1}>Flat</MenuItem>
<MenuItem value={2}>Downsloping</MenuItem>
<MenuItem value={2}>Downsloping</MenuItem>
          </TextField>

          <TextField fullWidth select label="Ca" name="ca"
            margin="normal" value={formData.ca} onChange={handleChange} required>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </TextField>

          <TextField fullWidth select label="Thal" name="thal"
            margin="normal" value={formData.thal} onChange={handleChange} required>
            <MenuItem value={3}>Normal</MenuItem>
            <MenuItem value={6}>Fixed defect</MenuItem>
            <MenuItem value={7}>Reversible defect</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={!ready}
          >
            Predict Disease
          </Button>

        </form>
      </Paper>

      {/* ================= RESULT ================= */}
      {result !== null && (
        <Paper sx={{ p: 3, mt: 3, textAlign: "center" }}>
          <Typography variant="h5">
            {result === 1 ? "⚠ High Risk" : "✅ Low Risk"}
          </Typography>

          <Typography>
            Probability: {(prob * 100).toFixed(2)}%
          </Typography>
           <Button
      variant="outlined"
      sx={{ mt: 2 }}
      onClick={() =>
        navigate("/MealPlanScreen", {
          state: {
            result,
            prob,
            mealPlan
          }
        })
      }
    >
      Check Meal Plan
    </Button>
        </Paper>
      )}

    </Box>
  );
}