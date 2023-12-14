  import axios from "axios";
  import { useEffect, useState } from "react";
  import AliceCarousel from "react-alice-carousel";
  import { Link } from "react-router-dom";
  import { TrendingCoins } from "../../config/api";
  import { CryptoState } from "../../CryptoContext";

  import { styled } from "@mui/system";

  const StyledCarousel = styled('div')({
    height: "50%",
    display: "flex",
    alignItems: "center",
    '@media (max-width: 600px)': {
      height: "70%", // Adjust height for smaller screens
    },
  });

  export function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");   
  }

  const StyledCarouselItem = styled(Link)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",

    '& img': {
      marginBottom: 7,
    },

    '& span': {
      display: 'flex',
      alignItems: 'center',
      fontSize: 22,
      fontWeight: 500,

      '& span': {
        fontWeight: 500,
      },
    },
  });

  const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
      try {
          // Introduce a delay of 3 seconds
          await new Promise(resolve => setTimeout(resolve, 3000));

          const response = await axios.get(TrendingCoins(currency));

          // Check if the response status is 429 (Too Many Requests)
          if (response.status === 429) {
              console.error("Rate-limiting error. Too many requests.");
              // Handle rate-limiting error (e.g., display a user-friendly message)
              return;
          }

          const data = response.data; // Extract data from the response
          console.log(data);
          setTrending(data);
      } catch (error) {
          console.error("Error fetching trending coins:", error);
      }
  };


    useEffect(() => {
      fetchTrendingCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const items = trending.map((coin) => {
      let profit = coin?.price_change_percentage_24h >= 0;

      return (
        <StyledCarouselItem to={`/coins/${coin.id}`}>
          <img src={coin?.image} alt={coin.name} height="80" />
          <span>
            {coin?.symbol}&nbsp;
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </StyledCarouselItem>
      );
    });

    const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 4,
      },
    };

    return (
      <StyledCarousel>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1200}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      </StyledCarousel>
    );
  };

  export default Carousel;
