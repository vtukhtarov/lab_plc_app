import React, {useState}  from 'react';
import useStore from "./store";
import {Button, Container, Stack} from "@mui/material";

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        background: '#f2f2f2',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    input: {
        margin: '0 8px 8px 0',
        padding: '8px',
    },
    button: {
        padding: '8px',
        margin: '0 8px 8px 0',
        cursor: 'pointer',
    },
    headerCell: {
        background: '#4CAF50',
        color: 'white',
        padding: '8px',
    },
    headerCellSecond: {
        background: 'white',
        color: 'black',
        padding: '8px',
    },
};

export function jsonData() {
    const {
        tact,
        sensors,
        mechanisms,
        sensorStates,
        mechanismStates} = useStore.getState()

    return {
        tact,
        sensors,
        mechanisms,
        sensorStates,
        mechanismStates,
    };
}

export function resetStore() {
    const {reset} = useStore.getState();
    reset();
}

function ActionPanel () {

    const {
        tact,
        sensors,
        mechanisms,
        addTact,
        addSensor,
        addMechanism,
    } = useStore();

    const [actionInput, setActionInput] = useState('');
    const [sensorInput, setSensorInput] = useState('');
    const [mechanismInput, setMechanismInput] = useState('');

    const handleAddTact = () => {
        if (actionInput.trim()) {
            addTact({ id: tact.length + 1, actionInput: actionInput });
            setActionInput(''); // Clear the actionInput input field after adding
        }
    };

    const handleAddSensor = () => {
        if (sensorInput.trim() && !sensors.includes(sensorInput)) {
            addSensor(sensorInput);
            setSensorInput('');
        }
    };

    const handleAddMechanism = () => {
        if (mechanismInput.trim() && !mechanisms.includes(mechanismInput)) {
            addMechanism(mechanismInput);
            setMechanismInput(''); // Clear the mechanism input field
        }
    };

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
                <input
                    value={actionInput}
                    onChange={(e) => setActionInput(e.target.value)}
                    placeholder="Event"
                />
                <Button onClick={handleAddTact}>Add tact and event</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                <input
                    value={sensorInput}
                    onChange={(e) => setSensorInput(e.target.value)}
                    placeholder="Sensors state"
                />
                <Button onClick={handleAddSensor}>
                    Add sensors state
                </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                <input
                    value={mechanismInput}
                    onChange={(e) => setMechanismInput(e.target.value)}
                    placeholder="Mechanisms state"
                />
                <Button onClick={handleAddMechanism}>
                    Add mechanisms state
                </Button>
            </Stack>
        </Stack>
    );
}

function MainLabComponent () {

    const {
        tact,
        sensors,
        mechanisms,
        sensorStates,
        mechanismStates,
        updateSensorState,
        updateMechanismState,
    } = useStore();

    return (
        <Container>
            <ActionPanel />
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.headerCell}>Такт (кроки)</th>
                    <th style={styles.headerCellSecond}>
                        Дії контрольні операції
                    </th>
                    <th style={styles.headerCell} colSpan={sensors.length}>
                        Стан датчиків
                    </th>
                    <th
                        style={styles.headerCellSecond}
                        colSpan={mechanisms.length}>
                        Стан механізмів
                    </th>
                </tr>
                <tr>
                    <th style={styles.th}></th>
                    <th style={styles.th}></th>
                    {sensors.map((sensor, index) => (
                        <th style={styles.th} key={index}>
                            {sensor}
                        </th>
                    ))}
                    {mechanisms.map((mechanism, index) => (
                        <th style={styles.th} key={index}>
                            {mechanism}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tact.map((t, index) => (
                    <tr key={t.id}>
                        <td style={styles.td}>{t.id}</td>
                        <td style={styles.td}>{t.actionInput}</td>
                        {sensors.map((sensor, sensorIndex) => (
                            <td style={styles.td} key={sensorIndex}>
                                <select
                                    value={
                                        sensorStates[t.id]?.[sensor] || ''
                                    }
                                    onChange={(e) =>
                                        updateSensorState(
                                            t.id,
                                            sensor,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="10">10</option>
                                    <option value="01">01</option>
                                    <option value="00">00</option>
                                    <option value="11">11</option>
                                </select>
                            </td> // Adjust as necessary
                        ))}
                        {mechanisms.map((mechanism, mechanismIndex) => (
                            <td style={styles.td} key={mechanismIndex}>
                                <select
                                    value={
                                        mechanismStates[t.id]?.[
                                            mechanism
                                            ] || ''
                                    }
                                    onChange={(e) =>
                                        updateMechanismState(
                                            t.id,
                                            mechanism,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="10">10</option>
                                    <option value="01">01</option>
                                    <option value="00">00</option>
                                    <option value="11">11</option>
                                </select>
                            </td> // Adjust as necessary
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
}

export default MainLabComponent;
