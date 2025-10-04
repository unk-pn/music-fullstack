import React, { ReactNode } from "react";
import {
  Container,
  Card,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import c from "./StepWrapper.module.css";

interface StepWrapperProps {
  activeStep: number;
  children: ReactNode;
}

const steps = ["Track Information", "Upload image", "Upload audio"];

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  if (completed) {
    return (
      <div className={`${className} ${c.stepIconCompleted}`}>
        <CheckIcon sx={{ fontSize: "18px" }} />
      </div>
    );
  }

  if (active) {
    return (
      <div className={`${className} ${c.stepIconActive}`}>
        {String(props.icon)}
      </div>
    );
  }

  return (
    <div className={`${className} ${c.stepIconDefault}`}>
      {String(props.icon)}
    </div>
  );
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => (
  <Container className={c.wrapper}>
    <Stepper
      activeStep={activeStep}
      className={c.stepper}
      sx={{
        marginTop: 2,
        "& .MuiStepLabel-root": {
          color: "#ffffff",
          fontFamily: "Kanit",
        },
        "& .MuiStepLabel-label": {
          color: "#ffffff !important",
          fontFamily: "Kanit",
          fontSize: "16px",
          fontWeight: 400,
          "&.Mui-active": {
            color: "#ffffff !important",
            fontWeight: 500,
          },
          "&.Mui-completed": {
            color: "#ffffff !important",
            fontWeight: 400,
          },
        },
        "& .MuiStepConnector-line": {
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderTopWidth: 1,
        },
        "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
          // borderColor: "#C8A8E9",
          borderTopWidth: 1,
        },
        "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
          // borderColor: "#C8A8E9",
          borderTopWidth: 1,
        },
      }}
    >
      {steps.map((label, idx) => (
        <Step key={idx} completed={activeStep > idx}>
          <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <Grid
      container
      justifyContent="center"
      style={{ margin: "70px 0", minHeight: 450 }}
    >
      <Card
        style={{
          borderRadius: "18px",
          background: "rgba(0, 0, 0, 0.40)",
          width: "100%",
          maxWidth: "1200px",
          padding: "24px",
        }}
        className={c.card}
      >
        {children}
      </Card>
    </Grid>
  </Container>
);

export default StepWrapper;
