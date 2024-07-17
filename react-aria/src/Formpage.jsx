import { Button, Form, Input, TextField } from "react-aria-components";

export default function Formpage() {
  return (
    <div>
      <Form>
        <TextField isReadOnly={false} isRequired={true}>
          <Input value={"this is value"} />
        </TextField>

        <TextField isReadOnly={false} isRequired={true}>
          <Input value={"this is value"} />
        </TextField>

        <TextField isReadOnly={false} isRequired={true}>
          <Input value={"this is value"} />
        </TextField>

        <TextField  isRequired={true}>
          <Input value={""} type="password" />
        </TextField>

        <Button type="submit" >Submit</Button>
      </Form>
    </div>
  );
}
