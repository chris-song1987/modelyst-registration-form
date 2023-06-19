import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";

import { SubmitButton } from "./App.style";
import type { Option } from "./components/Select/Select.component";
import Select from "./components/Select/Select.component";
import { getUsers } from "./api/userApi";
import { addSampleData } from "./api/registrationApi";

export type FormType = {
  user: string;
  sampleLabels: string;
  proposalNumber: string;
  innerDiameter: string;
  outerDiameter: string;
};

function RegistrationForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormType>();
  const { innerDiameter, outerDiameter } = watch();
  const [userArray, setUserArray] = useState<Option[]>([
    { value: "a", label: "a" },
    { value: "b", label: "b" },
  ]);

  const { isLoading, error, data, isFetching } = useQuery(
    "get-users",
    getUsers
  );
  // isLoading -> use on Submit button
  // data -> userArray

  const { mutate } = useMutation(addSampleData);

  const onSubmit = (data: FormType) => {
    mutate(data);
  };

  return (
    <Container
      maxWidth="sm"
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          "flex-direction": "column",
          "row-gap": 20,
          width: "100%",
          m: 5,
        }}
      >
        <Select
          name="user"
          label="User *"
          control={control}
          options={userArray}
          rules={{ required: true }}
          error={!!errors.user}
          errorText="User is required!"
        />
        <TextField
          label="Sample Labels *"
          variant="outlined"
          {...register("sampleLabels", { required: true })}
          error={!!errors.sampleLabels}
          helperText={errors.sampleLabels ? "Sample Labels is required!" : ""}
        />
        <TextField
          label="Proposal Number *"
          variant="outlined"
          {...register("proposalNumber", { required: true })}
          error={!!errors.proposalNumber}
          helperText={
            errors.proposalNumber ? "Proposal Number is required!" : ""
          }
        />
        <TextField
          type="number"
          label="Inner Diameter (mm) *"
          variant="outlined"
          {...register("innerDiameter", {
            required: "Inner Diameter is required!",
            validate: {
              diameterCheck: (value) => {
                if (parseFloat(value) < 0)
                  return "Inner Diameter should be positive number!";

                // if innerDiameter or outerDiameter is not valid, we don't need to compare
                if (!outerDiameter || !value) return true;

                return parseFloat(outerDiameter) > parseFloat(value)
                  ? true
                  : "Inner Diameter needs to be less than for Outer Diameter!";
              },
            },
          })}
          error={!!errors.innerDiameter}
          helperText={errors.innerDiameter && errors.innerDiameter?.message}
          inputProps={{
            min: 0,
            step: 1,
          }}
        />
        <TextField
          type="number"
          label="Outer Diameter (mm) *"
          variant="outlined"
          {...register("outerDiameter", {
            required: "Outer Diameter is required!",
            validate: {
              diameterCheck: (value) => {
                if (parseFloat(value) < 0)
                  return "Outer Diameter should be positive number!";

                // if innerDiameter or outerDiameter is not valid, we don't need to compare
                if (!innerDiameter || !value) return true;

                return parseFloat(innerDiameter) < parseFloat(value)
                  ? true
                  : "Outer Diameter needs to be greater than for Inner Diameter!";
              },
            },
          })}
          error={!!errors.outerDiameter}
          helperText={errors.outerDiameter && errors.outerDiameter?.message}
          inputProps={{
            inputProps: {
              min: 0,
              step: 1,
            },
          }}
        />

        <SubmitButton variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </SubmitButton>
      </Box>
    </Container>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RegistrationForm />
      </QueryClientProvider>
    </div>
  );
}

export default App;

