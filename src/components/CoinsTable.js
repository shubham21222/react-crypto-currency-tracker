import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Pagination } from '@mui/material';
import {
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    Table,
    Paper,
    TableContainer,
} from "@mui/material";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousal";
import "./CoinsTable.css"
import { useRef } from "react";

const StyledContainer = styled(Container)({
    textAlign: "center",
    backgroundColor: "fff",
    backgroundSize: "cover",
    padding: '20px', // Add padding for all screen sizes
    '@media (max-width: 600px)': {
        padding: '10px', // Adjust the padding for smaller screens
    },
    // You can add more responsive styles here
});

const StyledTableContainer = styled(TableContainer)({
    marginBottom: 20,
});

const StyledTextField = styled(TextField)({
    marginBottom: 20, // Adjust the margin for all screen sizes
    width: "100%",
    '& input': {
        color: 'white',  // Set the font color to white
    },
    '& label': {
        color: 'white',  // Set the label color to white if needed
    },
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: "FFE382",
});

const StyledTableRow = styled(TableRow)({
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
});

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "light",
        },
    });

    const mounted = useRef(true);

    useEffect(() => {
        return () => {
            // Set the mounted ref to false when the component unmounts
            mounted.current = false;
        };
    }, []);



    const fetchCoins = async () => {
        try {
            setLoading(true);

            // Introduce a delay of 3 seconds
            await new Promise(resolve => setTimeout(resolve, 6000));

            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
            );

            // Check if the response status is 429 (Too Many Requests)
            if (response.status === 429) {
                console.error("Rate-limiting error. Too many requests.");
                // Handle rate-limiting error (e.g., display a user-friendly message)
                return;
            }

            const data = response.data; // Extract data from the response
            console.log(data);

            // Check if the component is still mounted before updating the state
            if (!mounted.current) {
                return;
            }

            setCoins(data);
        } catch (error) {
            console.error("Error fetching coins:", error);
        } finally {
            // Check if the component is still mounted before updating the state
            if (!mounted.current) {
                return;
            }

            setLoading(false);
        }
    };




    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const navigate = useNavigate(); // Use useNavigate directly

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };


    return (
        <ThemeProvider theme={darkTheme} >
            <StyledContainer>
                <Typography
                    variant="h4"
                    sx={{
                        margin: 18,
                        fontFamily: "Montserrat",
                        textAlign: "justify",
                        alignItems: "center",
                        fontSize: "2rem", // Set your desired base font size
                        '@media (max-width: 600px)': {
                            fontSize: '1.5rem', // Adjust the font size for smaller screens
                        },
                    }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>



                <StyledTextField sx={{ color: "white" }}
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <StyledTableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress sx={{ backgroundColor: "#FFE382" }} />
                    ) : (
                        <Table aria-label="simple table">
                            <StyledTableHead>
                                <TableRow className="table">
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            sx={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </StyledTableHead>

                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <StyledTableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                key={row.name}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                ><img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    </img>
                                                    <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
                                                        <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                                                    </div>

                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14,203,129" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {symbol}{""}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14,203,129" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)} %

                                                </TableCell>
                                                <TableCell align="right" style={{ color: "white" }}>
                                                    {symbol} {""} {numberWithCommas(row.market_cap.toString().slice(0, 6))}
                                                    M
                                                </TableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </StyledTableContainer>

                <Pagination
                    count={Math.ceil(handleSearch().length / 10)}
                    sx={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        '& .MuiPaginationItem-root': {
                            color: 'white',  // Set the color to white
                        },
                    }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />




            </StyledContainer>
        </ThemeProvider>
    );
};

export default CoinsTable;