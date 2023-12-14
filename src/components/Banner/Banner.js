import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import banner from "../../assets/aq.jpg";
import Carousal from "./Carousal";
import btc from "../../assets/biticon.png";
import "./Banner.css";
import btc2 from "../../assets/Free_btc-remove.png";

const StyledBanner = styled("div")({
  backgroundImage: `url(${banner})`,
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "black",
});

const StyledBannerContent = styled(Container)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const StyledTagline = styled("div")({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const Banner = () => {
  return (
    <div>
      <StyledBanner>
        <StyledBannerContent>
          <StyledTagline>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "Montserrat",
                
                textAlign: "center",
                position: "relative",
                '@media (max-width: 600px)': {
                  fontSize: '1.5rem', // Adjust font size for smaller screens
                },
              }}
            >
              <img
                src={btc2}
                alt="BTC2 Image"
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100px",
                  position: "absolute",
                  top: "145px",
                  left: "70%", // Center horizontally
                  transform: "translateX(-50%)", // Center horizontally
                  animation: "floatUpDown 2s infinite",
                  '@media (max-width: 600px)': {
                    top: "50px", left: "20px",// Adjust top position for smaller screens
                  },
                }}
              />
              Crypto Mars{" "}
              <img
                src={btc}
                alt="BTC Image"
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  position: "relative",
                  alignItems: "center",
                  animation: "floatUpDown 2s infinite",
                  '@media (max-width: 600px)': {
                    marginBottom: "15px", // Adjust margin for smaller screens
                  },
                }}
              />
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
                
              }}
            >
              Get all the Info regarding your favorite Crypto Currency
            </Typography>
          </StyledTagline>
          <Carousal />
        </StyledBannerContent>
      </StyledBanner>
    </div>
  );
};

export default Banner;
