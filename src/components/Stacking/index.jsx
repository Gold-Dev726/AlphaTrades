/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Container,
  Box,
  Button,
  TextField,
  Typography,
  InputBase
} from "@mui/material";
import { connect, useDispatch } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginBottom: "15px",
  backdropFilter: "blur(80px)",
  borderRadius: 2,
  "&:before": {
    display: "none"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <KeyboardArrowDownIcon sx={{ fontSize: "2rem", color: "#97c7ff" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  background: "#1d2331",
  paddingLeft: "55px",
  paddingRight: "30px",
  textAlign: "center",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)"
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "12px 55px",
  paddingBottom: 20,
  background: "#2e3442"
}));

const Staking = (props) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <section className="content-wapper staking">
      <div className="header-and-trading">
        <h1>Staking</h1>
      </div>

      <Container>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "80vh", width: 1 }}
          spacing={6}
        >
          <Accordion
            expanded={expanded === `panel1`}
            onChange={handleChange(`panel1`)}
          >
            <AccordionSummary>
              <Typography textAlign="center" fontSize={20} color="white">
                Wolf Staking Pool
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={5}>
                <Stack direction="row" alignItems="center" spacing={5}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ border: "1px solid white", borderRadius: 1, p: 4 }}
                    spacing={5}
                  >
                    <Stack alignItems="center" sx={{ width: 180 }}>
                      <Typography color="white">10% Income Pool</Typography>
                    </Stack>
                    <Typography color="white">1 Month</Typography>
                    <Typography color="white">APY 33%</Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        border: "1px solid white",
                        p: 0.5,
                        borderRadius: 1
                      }}
                    >
                      <InputBase sx={{ color: "white" }} />
                      <Button
                        variant="contained"
                        sx={{ minWidth: 40, height: 20, fontSize: 10, p: 0 }}
                      >
                        Max
                      </Button>
                    </Stack>
                    <Typography color="white">(151346)</Typography>
                  </Stack>
                  <Button variant="contained" color="secondary" size="large">
                    Stake
                  </Button>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={5}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ border: "1px solid white", borderRadius: 1, p: 4 }}
                    spacing={5}
                  >
                    <Stack alignItems="center" sx={{ width: 180 }}>
                      <Typography color="white">10% Income Pool</Typography>
                      <Typography fontSize={14} color="white">
                        (Automatic restaking)
                      </Typography>
                    </Stack>
                    <Typography color="white">1 Month</Typography>
                    <Typography color="white">APY 33%</Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        border: "1px solid white",
                        p: 0.5,
                        borderRadius: 1
                      }}
                    >
                      <InputBase sx={{ color: "white" }} />
                      <Button
                        variant="contained"
                        sx={{ minWidth: 40, height: 20, fontSize: 10, p: 0 }}
                      >
                        Max
                      </Button>
                    </Stack>
                    <Typography color="white">(151346)</Typography>
                  </Stack>
                  <Button variant="contained" color="secondary" size="large">
                    Stake
                  </Button>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === `panel2`}
            onChange={handleChange(`panel2`)}
          >
            <AccordionSummary>
              <Typography textAlign="center" fontSize={20} color="white">
                NFT Staking Pool
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={5}>
                <Stack direction="row" alignItems="center" spacing={5}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ border: "1px solid white", borderRadius: 1, p: 4 }}
                    spacing={5}
                  >
                    <Stack alignItems="center" sx={{ width: 180 }}>
                      <Typography color="white">6% Income Pool</Typography>
                    </Stack>
                    <Typography color="white">1 Month</Typography>
                    <Typography color="white">APY 33%</Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        border: "1px solid white",
                        p: 0.5,
                        borderRadius: 1
                      }}
                    >
                      <InputBase sx={{ color: "white" }} />
                      <Button
                        variant="contained"
                        sx={{ minWidth: 40, height: 20, fontSize: 10, p: 0 }}
                      >
                        Max
                      </Button>
                    </Stack>
                    <Typography color="white">(151346)</Typography>
                  </Stack>
                  <Button variant="contained" color="secondary" size="large">
                    Stake
                  </Button>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={5}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ border: "1px solid white", borderRadius: 1, p: 4 }}
                    spacing={5}
                  >
                    <Stack alignItems="center" sx={{ width: 180 }}>
                      <Typography color="white">6% Income Pool</Typography>
                      <Typography fontSize={14} color="white">
                        (Automatic restaking)
                      </Typography>
                    </Stack>
                    <Typography color="white">1 Month</Typography>
                    <Typography color="white">APY 33%</Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{
                        border: "1px solid white",
                        p: 0.5,
                        borderRadius: 1
                      }}
                    >
                      <InputBase sx={{ color: "white" }} />
                      <Button
                        variant="contained"
                        sx={{ minWidth: 40, height: 20, fontSize: 10, p: 0 }}
                      >
                        Max
                      </Button>
                    </Stack>
                    <Typography color="white">(151346)</Typography>
                  </Stack>
                  <Button variant="contained" color="secondary" size="large">
                    Stake
                  </Button>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CheckIcon sx={{ fontSize: 50, color: "green" }} />
              <Typography color="white" fontSize={20}>
                Access to all Bronze Models
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <CheckIcon sx={{ fontSize: 50, color: "green" }} />
              <Typography color="white" fontSize={20}>
                Access to DAO
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log("Staking state we have ", state);
  return {};
};

export default connect(mapStateToProps, {})(Staking);
