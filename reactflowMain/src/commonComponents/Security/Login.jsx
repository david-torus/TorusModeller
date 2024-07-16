
import { checkIsActive, loginWithRealm } from "../api/keyCloakAuth";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import logo from "../../asset/favicon.ico";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import picture from "../../asset/google.png";
import pictures from "../../asset/github.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import ForgetPassword from "./ForgetPassword";

const LoginForm = ({ appControl = "TM", setIsLogin, setRelamName }) => {
  const [isreset, setisReset] = useState(false);
  const [checkDetails, setCheckDetails] = useState(false);
  const [realmList, setRealmList] = useState([]);
  const [realmId, setRealmId] = useState("");
  const [data, setData] = useState({
    realm: "",
    username: "",
    password: "",
    client_id: "",
    client_secret: "",
  });
  const [errTenant] = useState();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error] = useState();

  /**
   * Retrieves client credentials for the specified realm ID and updates the state with the data.
   *
   * @return {Promise<void>} A promise that resolves when the state has been updated with the client credentials.
   */
  const handleClientCredentials = useCallback(async () => {
    try {
      if (!realmId) return;
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}keycloak/allClient/${realmId}`
      );
      if (res.data.length > 0) {
        setData({
          ...data,
          client_id: res.data[0].client_id,
          client_secret: res.data[0].secret,
        });
      }
    } catch (error) {
      console.error('Error fetching client credentials:', error);
    }
  }, [realmId,data]);


  useEffect(() => {
    var token = localStorage.getItem("token");
    var user = localStorage.getItem("user");
    if (token && user) {
      setRelamName(JSON.parse(user).realm);
      setIsLogin(true);
      (async () => {
        const res = await checkIsActive(JSON.parse(user), JSON.parse(token));
        if (res.active === false) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setData({
            realm: "",
            username: "",
            password: "",
            client_id: "",
            client_secret: "",
          });
        }
        if (res.active === true) {
          setIsLogin(true);
        }
      })();
    }
  }, [setIsLogin,setRelamName]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}keycloak/allRealm`
        );
        res.status === 200 ? setRealmList(res.data) : setRealmList([]);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    handleClientCredentials();
  }, [handleClientCredentials]);

  /**
   * Asynchronously logs in a user with the provided data.
   * If the user's data is valid, it sends a request to the server to create a tenant,
   * then sets the token, user, and isLogin values in local storage and sets the isLogin state to true.
   * If the request fails, it displays an alert with the error message.
   * If the user's data is invalid, it sets the checkDetails state to true.
   *
   * @return {Promise<void>} A promise that resolves when the login process is complete.
   */
  async function Login() {
    if (
      data.realm &&
      data.username &&
      data.password &&
      data.client_id &&
      data.client_secret
    ) {
      setLoading(true);
      const res = await loginWithRealm(data);
      if (res.access_token) {
        setLoading(false);
        try {
          await axios.get(
            `${process.env.REACT_APP_API_URL}tp/createTenantvpt?tenant=${data.realm}`
          );
        } catch (error) {
          console.error(error);
        }
        localStorage.setItem("token", JSON.stringify(res));
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLogin", "keyCloakTrue");
        setRealmId("");
        setIsLogin(true);
      } else {
        alert(res);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setCheckDetails(true);
    }
  }

  /**
   * Updates the state with the selected realm data.
   *
   * @param {Object} datas - The selected realm data object containing the id and name of the realm.
   * @return {Promise<void>} A promise that resolves when the state has been updated.
   */
  const handleSelectRealm = async (datas) => {
    setRealmId(datas.id);
    setRelamName(datas.name);
    setData({ ...data, realm: datas.name });
  };

  
  /**
   * Updates the state with the new value of a form field.
   *
   * @param {Object} e - The event object containing the name and value of the form field.
   * @return {void} This function does not return anything.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  /**
   * Asynchronously navigates to the registration page by logging a message to the console.
   *
   * @return {Promise<void>} A Promise that resolves when the navigation is complete.
   */
  const handleNavigateToRegister = async () => {};

  //Returning the JSX when the user is not logged in
  if (isreset) return <ForgetPassword setisReset={setisReset} />;
  else {
    return (
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(17,15,18,1) 0%, rgba(110,68,139,1) 45%, rgba(117,59,94,1) 55%, rgba(24,24,23,1) 100%)",
        }}
        className="flex flex-col w-full h-screen justify-center items-center gap-2 overflow-y-auto"
      >
        <div className="flex gap-2 ">
          <img src={logo} width={300} alt="" />

          <h2 className="text-center font-bold text-4xl text-white">Torus</h2>
        </div>

        <div className="p-4 my-1 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45] text-white bg-slate-800/70">
          <div>
            <h2 className="text-2xl font-semibold ">Login</h2>
            <p className="text-slate-400 text-[14px]">
              By creating and account you agree to accept our Terms of Service
              and Privacy Policy Available in the links below.
            </p>
          </div>
          {appControl === "TP" && (
            <div className="flex flex-col justify-center items-center w-full gap-3 ">
              <div className="grid grid-cols-2 gap-1">
                <Button className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
                  <img
                    src={pictures}
                    alt="GitHub logo"
                    width={20}
                    height={25}
                  />
                  <span className="ml-2 text-black text-sm font-semibold">
                    Sign in with GitHub
                  </span>
                </Button>
                <Button className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
                  <img src={picture} alt="Google logo" width={30} height={35} />
                  <span className="ml-2 text-black text-sm font-semibold">
                    Sign in with Google
                  </span>
                </Button>
              </div>
              <h2 className="text-slate-400 text-[14px]">Or continue with</h2>
            </div>
          )}

          <Dropdown className="border border-[#20252B]  p-0 ">
            <DropdownTrigger>
              <Button
                size="lg"
                variant="bordered"
                className={`border-2 border-[#323B45] ${
                  checkDetails && !data.realm ? "text-red-400" : "text-white"
                }`}
              >
                {data.realm ? data.realm : "Select Tenant"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Link Actions"
              className=" text-white rounded-sm h-[250px] overflow-y-auto scrollbar-hide"
              variant="light"
              classNames={{
                base: "bg-[#33304F]",
              }}
            >
              {realmList &&
                realmList.length > 0 &&
                realmList.map((realm, id) => (
                  <DropdownItem
                    className=" text-white hover:bg-slate-200"
                    key={id}
                    onClick={() => handleSelectRealm(realm)}
                  >
                    {realm.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>

          {errTenant && (
            <p className="text-red-500 text-center text-sm">{errTenant}</p>
          )}
          <Input
            type="text"
            label="Email or username"
            name="username"
            labelPlacement="outside"
            color={`${checkDetails && !data.username ? "danger" : "primary"}`}
            onChange={handleChange}
            value={data.username}
            classNames={{
              base: " w-full h-6 my-2",
              label: ["text-xs  text-white focus-within:text-white"],
              inputWrapper: [
                "border border-slate-500/50",
                "text-white",
                "bg-transparent",
                "data-[hover=true]:bg-[#282551]",
                "data-[hover=true]:border-[#4435CF]",
                "focus-within:!bg-[#282551]",
                "focus-within:border-[#4435CF] border-2",
              ],
              innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
            }}
          />
          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
            name="password"
            labelPlacement="outside"
            color={`${checkDetails && !data.password ? "danger" : "primary"}`}
            onChange={handleChange}
            value={data.password}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            classNames={{
              base: " w-full h-6 my-2 ",
              label: ["text-xs  text-white focus-within:text-white"],

              inputWrapper: [
                "border border-slate-500/50",
                "text-white",
                "bg-transparent",
                "data-[hover=true]:bg-[#282551]",
                "data-[hover=true]:border-[#4435CF]",
                "focus-within:!bg-[#282551]",
                "focus-within:border-[#4435CF] border-2",
              ],
              innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
            }}
          />
          <div className="flex flex-center justify-between">
            <Button
              variant="bordered"
              color="primary"
              className="  text-white border-2 border-[#323B45]"
              onClick={() => setisReset(true)}
            >
              Forgot password
            </Button>
            {error && (
              <p className="text-red-500 text-sm my-3 mr-14">{error}</p>
            )}
            <Button
              onClick={Login}
              color="primary"
              variant="bordered"
              className="w-[10%]  text-white border-2 border-[#323B45]"
            >
              {loading ? <CircularProgress size="sm" /> : "Sign in"}
            </Button>
          </div>
          {(appControl === "CG" || appControl === "TP") && (
            <div className="flex justify-center items-center w-full gap-3">
              <p className="text-slate-400 text-[14px]">
                Don't have an account?{" "}
              </p>
              <span
                className="cursor-pointer hover:bg-slate-400 rounded-full p-2 text-[14px] text-green-300"
                onClick={handleNavigateToRegister}
              >
                Sign up
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default LoginForm;
