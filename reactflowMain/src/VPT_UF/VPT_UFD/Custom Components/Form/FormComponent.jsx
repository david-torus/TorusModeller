import React from "react";
import { Card,Spacer,Button,Input,Checkbox} from "@nextui-org/react";

export default function FormComponent({ height, width, stateTrack }) {
  return (
    <div>
      <div
        className="flex justify-center items-center"
        style={{
          height:"100%",
          width: width,
        }}
      >
        <Card
          className="p-[5%] rounded-lg shadow-lg backdrop
        -blur-sm bg-white border-solid border-l-success-50"
          style={{ width: "100%", height: "100%" }}
        >
          <div style={{ width: "100%", height: "100%" }}>
          <h1 className="text-center font-bold">NextUI Login</h1>
          <Spacer y={3} />
            <Input
              clearable
              underlined
              fullWidth
              color="success"
              size="xl"
              placeholder="Email"
            />
            <Spacer y={3} />
            <Input
              clearable
              underlined
              fullWidth
              type=""
              color="success"
              size="xl"
              placeholder="Password"
            />
            <Spacer y={3} />

            <div className="flex justify-between items-center">
              <Spacer y={3} />

              <Checkbox color="success">
                <p size={14}>Remember me</p>
              </Checkbox>
              <p size={14}>Forgot password?</p>
              <Spacer y={3} />
            </div>
            <Spacer y={2} />
            <Button color="success" variant="bordered">
              Sign in
            </Button>
            <Spacer y={2} />
          </div>
        </Card>
      </div>
    </div>
  );
}
