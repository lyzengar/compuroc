import React from 'react';
import './Inputs.css';

const Inputs = (props) => {

    return (
    <div>
        <select defaultValue="Drag Coefficient" name="Drag Coefficient" onChange={(e) => props.handleChange('dragCoef', e)}>
            <option value='Drag Coefficient'>Drag Coefficient</option>
            <option value="0.25">0.25</option>
            <option value="0.30">0.30</option>
            <option value="0.35">0.35</option>
            <option value="0.40">0.40</option>
            <option value="0.45">0.45</option>
            <option value="0.50">0.50</option>
            <option value="0.55">0.55</option>
            <option value="0.60">0.60</option>
            <option value="0.65">0.65</option>
            <option value="0.70">0.70</option>
            <option value="0.75">0.75</option>
            <option value="0.80">0.80</option>
            <option value="0.85">0.85</option>
        </select>
        <select defaultValue="" onChange={(e) => props.handleChange('diameter', e)}>
            <option value="">Diameter</option>
            <option value="13.8">BT-5</option>
            <option value="18.7">BT-20</option>
            <option value="24.8">BT-50</option>
            <option value="33.7">BT-55</option>
            <option value="41.6">BT-60</option>
            <option value="56.3">BT-70</option>
            <option value="66.0">BT-80</option>
            <option value="">------------</option>
            <option value="32.2">"29"</option>
            <option value="41.9">"38"</option>
            <option value="57.8">"54"</option>
            <option value="79.3">"75"</option>
            <option value="102.2">"98"</option>
            <option value="">------------</option>
            <option value="67.1">"2.6"</option>
            <option value="156.3">"6"</option>
            <option value="194.9">"7.5"</option>
            <option value="296.2">"11.4"</option>
        </select>
        <input type="text" placeholder="Mass (grams)" onChange={(e) => props.handleChange('mass', e)}/><br/>
        <select defaultValue="" onChange={(e) => props.handleChange('motorManu', e)}>
            <option value="">Motor Manufacturer</option>
            <option value="AeroTech">AeroTech (C-N)</option>
            <option value="Animal Motor Works">Animal Motor Works (I-M)</option>
            <option value="Cesaroni Technology">Cesaroni Technology (E-O)</option>
            <option value="Estes Industries">Estes Industries (A-G)</option>
            <option value="Gorilla Rocket Motors">Gorilla Rocket Motors (J-O)</option>
            <option value="Kosdon by Aerotech">Kosdon by Aerotech (G-M)</option>
            <option value="Loki Research">Loki Research (G-N)</option>
            <option value="Quest Aerospace">Quest Aerospace (A-D)</option>
        </select>
        <select defaultValue="" onChange={(e) => props.handleChange('motorLetter', e)}>
            <option value="">Motor Letter</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">N</option>
            <option value="O">O</option>
        </select>
        <select defaultValue="" onChange={(e) => props.handleMotorData(e)}>
            <option value="">Motor Classification</option>
            {props.motorClass ? props.motorClass.map(mclass => (
                <option value={mclass}>{mclass}</option>
            )): ""}
        </select>
    </div>
    )
}

export default Inputs;