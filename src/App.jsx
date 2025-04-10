import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import CountUp from "react-countup";
import { Progress } from "@chakra-ui/react";
import "./App.css";

function App() {
  const [model, setModel] = useState(null);
  const [inputs, setInputs] = useState({
    timeElapsed: "",
    territoryName: "",
    totalMandates: "",
    availableMandates: "",
    numParishes: "",
    numParishesApproved: "",
    blankVotes: "",
    blankVotesPercentage: "",
    nullVotes: "",
    nullVotesPercentage: "",
    preVotersPercentage: "",
    preSubscribedVoters: "",
    preTotalVoters: "",
    party: "",
    mandates: "",
    percentage: "",
    validVotesPercentage: "",
    votes: "",
    hondt: "",
    finalMandates: "",
  });
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("/model.json");
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    if (model) {
      const inputArray = new Array(27).fill(0);

      const parseInput = (value) => {
        return value === null || value === undefined
          ? 0
          : parseFloat(value) || 0;
      };

      inputArray[0] = parseInput(inputs.timeElapsed);
      inputArray[1] = inputs.territoryName === "Território Nacional" ? 1 : 0;
      inputArray[2] = parseInput(inputs.totalMandates);
      inputArray[3] = parseInput(inputs.availableMandates);
      inputArray[4] = parseInput(inputs.numParishes);
      inputArray[5] = parseInput(inputs.numParishesApproved);
      inputArray[6] = parseInput(inputs.blankVotes);
      inputArray[7] = parseInput(inputs.blankVotesPercentage);
      inputArray[8] = parseInput(inputs.nullVotes);
      inputArray[9] = parseInput(inputs.nullVotesPercentage);
      inputArray[10] = parseInput(inputs.preVotersPercentage);
      inputArray[11] = parseInput(inputs.preSubscribedVoters);
      inputArray[12] = parseInput(inputs.preTotalVoters);

      inputArray[13] = inputs.party === "PS" ? 1 : 0;
      inputArray[14] = inputs.party === "PPD/PSD" ? 1 : 0;
      inputArray[15] = inputs.party === "B.E." ? 1 : 0;
      inputArray[16] = inputs.party === "CDS-PP" ? 1 : 0;
      inputArray[17] = inputs.party === "PCP-PEV" ? 1 : 0;

      inputArray[18] = parseInput(inputs.mandates);
      inputArray[19] = parseInput(inputs.percentage);
      inputArray[20] = parseInput(inputs.validVotesPercentage);
      inputArray[21] = parseInput(inputs.votes);
      inputArray[22] = parseInput(inputs.hondt);
      inputArray[23] = parseInput(inputs.finalMandates);

      console.log("Input Array:", inputArray);

      if (inputArray.some(isNaN)) {
        alert("Some inputs are invalid. Please check your input values.");
        return;
      }

      const inputTensor = tf.tensor2d([inputArray], [1, 27]);

      const output = model.predict(inputTensor);

      console.log("Model Output:", output);

      const predictionResult = output.dataSync()[0];
      console.log("Prediction Result:", predictionResult);

      setPrediction(predictionResult);

      inputTensor.dispose();
      output.dispose();
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Election ML Predictor</h1>

        <input
          type="number"
          name="timeElapsed"
          placeholder="Time Elapsed"
          onChange={handleChange}
          className="input-field"
        />
        <select name="territoryName" onChange={handleChange}>
          <option value="">Select Territory</option>
          <option value="Território Nacional">Território Nacional</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="totalMandates"
          placeholder="Total Mandates"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="availableMandates"
          placeholder="Available Mandates"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="numParishes"
          placeholder="Number of Parishes"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="numParishesApproved"
          placeholder="Number of Approved Parishes"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="blankVotes"
          placeholder="Blank Votes"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="blankVotesPercentage"
          placeholder="Blank Votes Percentage"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="nullVotes"
          placeholder="Null Votes"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="nullVotesPercentage"
          placeholder="Null Votes Percentage"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="preVotersPercentage"
          placeholder="Pre Voters Percentage"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="preSubscribedVoters"
          placeholder="Pre Subscribed Voters"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="preTotalVoters"
          placeholder="Pre Total Voters"
          onChange={handleChange}
          className="input-field"
        />
        <select name="party" onChange={handleChange}>
          <option value="">Select Party</option>
          <option value="PS">PS</option>
          <option value="PPD/PSD">PPD/PSD</option>
          <option value="B.E.">B.E.</option>
          <option value="CDS-PP">CDS-PP</option>
          <option value="PCP-PEV">PCP-PEV</option>
        </select>
        <input
          type="number"
          name="mandates"
          placeholder="Mandates"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="percentage"
          placeholder="Percentage"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="validVotesPercentage"
          placeholder="Valid Votes Percentage"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="votes"
          placeholder="Votes"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="hondt"
          placeholder="Hondt"
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="finalMandates"
          placeholder="Final Mandates"
          onChange={handleChange}
          className="input-field"
        />

        <button onClick={handlePredict} className="btn">
          Predict
        </button>

        {prediction && (
          <div className="prediction-container">
            <h2>Predicted Seats for {inputs.party}:</h2>
            <CountUp
              end={prediction}
              duration={2.5}
              className="prediction-number"
            />

            <input
              type="range"
              className="progress-bar"
              color={prediction > 50 ? "green" : "red"}
              value={Math.min(prediction, 100)}
              min={0}
              max={100}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
