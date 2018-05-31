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
            <option value="">Diameter (mm)</option>
            <option value="13.8">13.8 mm</option>
            <option value="18.7">18.7 mm</option>
            <option value="24.8">24.8 mm</option>
            <option value="32.2">32.2 mm</option>
            <option value="33.7">33.7 mm</option>
            <option value="41.6">41.6 mm</option>
            <option value="41.9">41.9 mm</option>
            <option value="56.3">56.3 mm</option>
            <option value="57.8">57.8 mm</option>
            <option value="66.0">66.0 mm</option>
            <option value="67.1">67.1 mm</option>
            <option value="79.3">79.3 mm</option>
            <option value="102.2">102.2 mm</option>
            <option value="156.3">156.3 mm</option>
            <option value="194.9">194.9 mm</option>
            <option value="296.2">296.2 mm</option>
        </select>
        <input type="text" placeholder="Mass (grams)" onChange={(e) => props.handleChange('mass', e)}/><br/>
        <select defaultValue="" onChange={props.handleManSelected}>
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
        <select defaultValue="" onChange={(e) => props.handleChange('mass', e)}>
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
        <select defaultValue="Motor Classification">
            <option value="Motor Classification">Motor Classification</option>
        </select>
    </div>
    )
}

export default Inputs;