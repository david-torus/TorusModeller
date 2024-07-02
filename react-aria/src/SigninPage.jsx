import TorusDateTimePickers from "./torusComponents/TorusDate&TimePickers";
import TorusUnderLinedInput from "./torusComponents/TorusInput";
import TorusModifiedInput from "./torusComponents/TorusInput";

export default function SignIn() {
  return (
    <div className="w-full h-screen bg-gradient-to-tr from-fuchsia-500 to-teal-300 flex justify-center items-center">
      <div className="w-[40%] flex flex-col items-center justify-start bg-slate-200 rounded-xl shadow-xl py-3">
        <h1 className="text-3xl font-bold text-center">Sign In Page</h1>

        <div className="w-[40%]  flex flex-col justify-center items">
          <TorusUnderLinedInput
            label="First Name"
            placeholder="enter your First name"
            value=""
            marginT="mt-8"
            labelColor="text-teal-600"
            borderColor="torus-focus:border-b-teal-600/50"
          />

          <TorusUnderLinedInput
            label="Last Name"
            placeholder="enter your Last name"
            value=""
            marginT="mt-6"
            labelColor="text-teal-600"
            borderColor="torus-focus:border-b-teal-600/50"
          />


<TorusDateTimePickers marginT="mt-6"/>

        </div>
      </div>
    </div>
  );
}
