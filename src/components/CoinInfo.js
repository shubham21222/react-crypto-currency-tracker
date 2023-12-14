import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { Line } from 'react-chartjs-2';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import SelectButton from './SelectButton';
import { chartDays } from '../config/data';
import { CryptoState } from '../CryptoContext';
import styled from 'styled-components';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { useCallback } from 'react';

// Register the required components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setFlag] = useState(false);

  const Container = styled('div')(({ theme }) => ({
    backgroundColor : "#14161a",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft : "300px",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
      marginLeft : "300px",
    },
  }));



  const fetchHistoricData = useCallback(async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setHistoricData(data.prices);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  }, [coin, days, currency]);
  
  useEffect(() => {
    if (coin) {
      fetchHistoricData();
    }
  }, [fetchHistoricData,coin]);
  
  

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={Container}>
        {!historicData || !flag ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    type: 'category',
                  },
                  y: {
                    type: 'linear',
                  },
                },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
