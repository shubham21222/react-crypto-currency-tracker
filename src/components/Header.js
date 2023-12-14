import React from 'react';
import { AppBar, Toolbar, Typography, Container, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import btc from  "../assets/biticon.png"


const Header = () => {
    const history = useNavigate();

    const { currency, setCurrency } = CryptoState()
    console.log(currency)

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#040D12",
            },
            type: "dark", 
        },
    });
    

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
 
                    <Toolbar>
                        <Typography
                            onClick={() => history('/')}
                            sx={{
                                flex: 1,
                                color: 'gold',
                                fontFamily: 'Montserrat',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                varient: "h6",
                            }}
                        >
                                              <img src={btc} sx={{
                        marginTop : "30px",
                    }}></img> Crypto Mars
                        </Typography>
                        <Select
                            variant='outlined'
                            style={{ width: 100, height: 80, marginLeft: 15 ,color : "white"}}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                            
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
