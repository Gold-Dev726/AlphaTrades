/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Container,
  Box,
  Button,
  TextField,
  Typography,
  InputBase,
  ButtonGroup,
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from "@mui/material";
import { connect, useDispatch } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";
const Staking = (props) => {
  const dispatch = useDispatch();
  const [currentButton, setCurrentButton] = useState("wolf");
  return (
    <section className="content-wapper staking">
      <div className="header-and-trading">
        <h1>Income</h1>
      </div>

      <Container sx={{ py: 5 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ width: 1 }}
          spacing={6}
        >
          <ButtonGroup>
            <Button
              variant={currentButton == "wolf" ? "contained" : "outlined"}
              onClick={() => setCurrentButton("wolf")}
              sx={{ width: 160 }}
            >
              Wolf
            </Button>
            <Button
              variant={currentButton == "nfts" ? "contained" : "outlined"}
              onClick={() => setCurrentButton("nfts")}
              sx={{ width: 160 }}
            >
              NFTs
            </Button>
          </ButtonGroup>

          {currentButton === "wolf" ? (
            <TableContainer sx={{ maxWidth: 500, border: "1px solid white", borderRadius: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">WOLF Balance</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>10,000 WOLF</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">
                        Income Pool Share%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>18%</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">
                        Income (month till date)
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>200 WOLF ($2)</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">
                        Income (till date)
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>2000 WOLF ($10)</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">Claimed Income</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography color="white">$0</Typography>
                        {/* <Button size="small">Claim</Button> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight="bold">
                        Unclaimed Income
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography color="white">$0</Typography>
                        <Button size="small">claim</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            // <Stack
            //   alignItems="center"
            //   justifyContent="center"
            //   spacing={6}
            //   sx={{ width: 1 }}
            // >
            //   <Alert severity="error" variant="filled">
            //     Your wolf tokens are not staked in the income pool, only staked
            //     wolf can claim income. Stake now!
            //   </Alert>
            //   <Stack direction="row" alignItems="center" spacing={5}>
            //     <Grid container sx={{ width: 400 }} rowSpacing={3}>
            //       <Grid item md={6}>
            //         <Typography color="white" fontWeight="bold">
            //           WOLF Balance
            //         </Typography>
            //       </Grid>
            //       <Grid item md={6}>
            //         <Typography color="white">10,000 WOLF</Typography>
            //       </Grid>

            //       <Grid item md={6}>
            //         <Typography color="white" fontWeight="bold">
            //           Income Pool Share %
            //         </Typography>
            //       </Grid>
            //       <Grid item md={6}>
            //         <Typography color="white">18%</Typography>
            //       </Grid>

            //       <Grid item md={6}>
            //         <Typography color="white" fontWeight="bold">
            //           Income (month till date)
            //         </Typography>
            //       </Grid>
            //       <Grid item md={6}>
            //         <Typography color="white">200 WOLF ($2)</Typography>
            //       </Grid>

            //       <Grid item md={6}>
            //         <Typography color="white" fontWeight="bold">
            //           Income (till date)
            //         </Typography>
            //       </Grid>
            //       <Grid item md={6}>
            //         <Typography color="white">2000 WOLF ($10)</Typography>
            //       </Grid>

            //       <Grid item md={6}>
            //         <Typography color="white" fontWeight="bold">
            //           Claimed Income
            //         </Typography>
            //       </Grid>
            //       <Grid item md={6}>
            //         <Stack direction="row" alignItems="center" spacing={1}>
            //           <Typography color="white">$0</Typography>
            //           <Button size="small">Claim</Button>
            //         </Stack>
            //       </Grid>
            //     </Grid>
            //   </Stack>
            // </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={6}
              sx={{ width: 1 }}
            >
              <Alert severity="error" variant="filled">
                Your wolf tokens are not staked in the income pool, only staked
                wolf can claim income. Stake now!
              </Alert>
              <Stack direction="row" alignItems="center" spacing={5}>
                <Grid container sx={{ width: 400 }} rowSpacing={3}>
                  <Grid item md={6}>
                    <Typography color="white" fontWeight="bold">
                      NFTs
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography color="white">2</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography color="white" fontWeight="bold">
                      Income Pool Share %
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography color="white">18%</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography color="white" fontWeight="bold">
                      Income (month till date)
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography color="white">200 WOLF ($2)</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography color="white" fontWeight="bold">
                      Income (till date)
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography color="white">2000 WOLF ($10)</Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography color="white" fontWeight="bold">
                      Claimed Income
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography color="white">$0</Typography>
                      <Button size="small">Claim</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>

              <Stack spacing={2} sx={{ width: 1 }}>
                <Typography variant="h5" color="white">
                  NFTs Preview
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                  <Box sx={{ width: 100, height: 100, bgcolor: "white" }} />F
                </Stack>
              </Stack>
            </Stack>
          )}
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
