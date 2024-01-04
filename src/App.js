import React  from 'react';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from './store';
import {Box, Button, Container, Stack, Toolbar} from "@mui/material";
import MainLabComponent, {jsonData, resetStore} from "./MainLabComponent";

function App() {


    // Function to reset all states
    const handleReset = () => {
        resetStore(); // This will reset all states in the zustand store
    };

    const handleExportToJson = () => {

        const data = jsonData();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'table_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);

                resetStore(); // Reset current state before importing new data

                // Directly set the state to the imported data
                useStore.setState({
                    takt: data.takt,
                    sensors: data.sensors,
                    mechanisms: data.mechanisms,
                    sensorStates: data.sensorStates,
                    mechanismStates: data.mechanismStates,
                });
            };
            reader.readAsText(file);
        }
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <AppBar position="relative">
                <Toolbar>Лабороторна робота 2,3,4: Бохан І., Рускіх А. Тухтаров В.</Toolbar>
            </AppBar>
            <main>
                <Box sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}>
                    <Container>
                        <MainLabComponent />
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" component="label">
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                onChange={handleFileSelect}/>
                            </Button>
                            <Button variant="outlined" onClick={handleExportToJson}>Export to JSON</Button>
                            <Button variant="outlined" onClick={handleReset}>Reset Table</Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default App;
