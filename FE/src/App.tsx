import React, { useMemo } from "react";
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
import { UserType } from "./User";

export type FormType = {
  user: string;
  label: string;
  proposals: string;
  innerDiameter: string;
  outerDiameter: string;
};

const formDefaultValues = {
  user: "",
  label: "",
  proposals: "",
  innerDiameter: "",
  outerDiameter: ""
}

function RegistrationForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: formDefaultValues
  });
  const { innerDiameter, outerDiameter } = watch();
  const {
    isLoading,
    error,
    data: usersData,
  } = useQuery<UserType[], Error>("get-users", getUsers);
  // isLoading -> use on Submit button
  // TODO: Error handling if "error" object is not null

  const userArray: Option[] = useMemo(() => {
    return (usersData || []).map((u: UserType) => ({
      value: u.id.toString(),
      label: u.name
    }));
  }, [usersData]);

  const { mutate } = useMutation(addSampleData);

  const onSubmit = (data: FormType) => {
    mutate({
      ...data,
      user: parseInt(data.user),
      innerDiameter: parseFloat(data.innerDiameter),
      outerDiameter: parseFloat(data.outerDiameter),
    }, {
      onSuccess: () => {
        reset(formDefaultValues);
      },
      onError: (error: any) => {
        const data = error?.response?.data
        if (data.code === "duplicate_label") {
          setError("label", { type: "custom", message: data.message })
        }
      }
    });
  };

  return (
    <Container
      maxWidth="sm"
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
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
          {...register("label", { required: true })}
          error={!!errors.label}
          helperText={errors.label ? errors.label.type === "required" ? "Sample Labels is required!" : errors.label.message : ""}
        />
        <TextField
          label="Proposal Number *"
          variant="outlined"
          {...register("proposals", { required: true })}
          error={!!errors.proposals}
          helperText={
            errors.proposals ? "Proposal Number is required!" : ""
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
            min: 0,
            step: 1,
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

