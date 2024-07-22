import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from "react-aria-components";

export default function TorusModal() {
  return (
    <div>
      <DialogTrigger>
        <Button>Sign up…</Button>
        <Modal>
          <Dialog>
            {({ close }) => (
              <form>
                <Heading slot="title">Sign up</Heading>
                <TextField autoFocus>
                  <Label>First Name</Label>
                  <Input />
                </TextField>
                <TextField>
                  <Label>Last Name</Label>
                  <Input />
                </TextField>
                <Button onPress={close} style={{ marginTop: 8 }}>
                  Submit
                </Button>
              </form>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    </div>
  );
}
