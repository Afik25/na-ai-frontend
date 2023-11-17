import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "../routes/NavLink";
import {
  FiUser,
  FiUsers,
  FiLogOut,
  BiChevronDown,
  BiChevronUp,
  BiEnvelope,
  IoNotificationsOutline,
  IoHelp,
  MdOutlineDashboard,
  BsFillCameraFill,
  MdOutlineArrowForwardIos,
} from "../middlewares/icons";
import useAxiosPrivate from "../state/context/hooks/useAxiosPrivate";
import useLogout from "../state/context/hooks/useLogout";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import {
  wait,
  validationCompleteInscriptionStepOne,
  validationCompleteInscriptionStepTwo,
} from "../utils/utils";
import {
  completeInscription,
  completeActivation,
  loadData,
} from "../services/authentication";
import { SERVER_URL } from "../routes/index";

const Administration = () => {
  const axiosPrivate = useAxiosPrivate();
  const [option, setOption] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  // logout
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  //
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  let validations = {
    0: validationCompleteInscriptionStepOne,
    1: validationCompleteInscriptionStepTwo,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validations[activeOption]),
    defaultValues: {
      id: connectedUser?.userInfo?.user_id,
      is_completed: true,
      prename: connectedUser?.userInfo?.prename,
      name: connectedUser?.userInfo?.name,
      gender: connectedUser?.userInfo?.gender,
      telephone: connectedUser?.userInfo?.telephone,
      mail: connectedUser?.userInfo?.mail ?? "",
      birth: connectedUser?.userInfo?.birth,
      birth_location: connectedUser?.userInfo?.birth_location,
    },
  });

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length !== 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    // data traitment for submitting
    await wait(1000);
    //
    if (activeOption === 0) {
      setIsSubmitting(!isSubmitting);
      completeInscription(axiosPrivate, data)
        .then((result) => {
          let response = result;
          if (response?.data?.status === 1) {
            setIsSubmitting(false);
            swal({
              title: "Registration completion",
              text: `${response?.data?.message}. Code : ${response?.data?.code}`,
              icon: "success",
              button: "Ok",
            }).then((res) => {
              swal("A confirmation code have been sent by E-mail.");
            });
            setActiveOption(1);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (!error?.response) {
            swal({
              title: "Oups!",
              text: "No server response!",
              icon: "warning",
              buttons: true,
            });
          } else {
            swal({
              title: "Operation failed!",
              text: error?.response?.data?.detail?.message,
              icon: "warning",
              buttons: true,
            });
          }
        });
    } else {
      setIsSubmitting(!isSubmitting);
      completeActivation(axiosPrivate, data)
        .then((result) => {
          let response = result;
          if (response?.data?.status === 1) {
            setIsSubmitting(false);
            swal({
              title: "Completion process",
              text: response?.data?.message,
              icon: "success",
              button: "Ok",
            }).then((res) => {
              swal(
                "The system will automatically disconnect you. And Get connected!"
              );
              signOut();
            });
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (!error?.response) {
            swal({
              title: "Oups!",
              text: "No server response!",
              icon: "warning",
              buttons: true,
            });
          } else {
            swal({
              title: "Operation failed!",
              text: error?.response?.data?.message,
              icon: "warning",
              buttons: true,
            });
          }
        });
    }
  };

  let fragments = {
    0: (
      <>
        <p className="title t-2">Complete your personal informations.</p>
        <div className="first-step containers">
          <div className="input-div" style={{ textAlign: "center" }}>
            <p className="title t-3">Picture for your profile(Optional).</p>
            <div className="input-image">
              <img
                src={
                  !selectedFile
                    ? process.env.PUBLIC_URL + "/user.png"
                    : URL.createObjectURL(selectedFile)
                }
                className="image"
                alt="user-prof"
              />
              <div className="input-upload">
                <input
                  type="file"
                  id="thumbnails"
                  className="input-file"
                  autoComplete="none"
                  placeholder=" "
                  onChange={handleFile}
                  //   {...register("thumbnails")}
                  accept="image/*"
                />
                <label htmlFor="thumbnails" className="input-file-label">
                  <BsFillCameraFill />
                </label>
              </div>
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("prename")}
              />
              <label htmlFor="prename" className="label-form">
                Prename
              </label>
              {errors.prename && (
                <span className="fade-in">{errors.prename.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("name")}
              />
              <label htmlFor="name" className="label-form">
                Name
              </label>
              {errors.name && (
                <span className="fade-in">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <select className="input-form" {...register("gender")}>
                <option value="" style={{ color: "grey" }}>
                  Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              {errors.gender && (
                <span className="fade-in">{errors.gender.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("telephone")}
              />
              <label htmlFor="telephone" className="label-form">
                Telephone
              </label>
              {errors.telephone && (
                <span className="fade-in">{errors.telephone.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("mail")}
              />
              <label htmlFor="mail" className="label-form">
                Mail
              </label>
              {errors.mail && (
                <span className="fade-in">{errors.mail.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="date"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("birth")}
              />
              <label htmlFor="birth" className="label-form">
                Date de Naissance
              </label>
              {errors.birth && (
                <span className="fade-in">{errors.birth.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("birth_location")}
              />
              <label htmlFor="birth_location" className="label-form">
                Lieu de Naissance
              </label>
              {errors.birth_location && (
                <span className="fade-in">{errors.birth_location.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("username")}
              />
              <label htmlFor="username" className="label-form">
                Username
              </label>
              {errors.username && (
                <span className="fade-in">{errors.username.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("old_password")}
              />
              <label htmlFor="old_password" className="label-form">
                Old Password
              </label>
              {errors.old_password && (
                <span className="fade-in">{errors.old_password.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("new_password")}
              />
              <label htmlFor="new_password" className="label-form">
                New Password
              </label>
              {errors.new_password && (
                <span className="fade-in">{errors.new_password.message}</span>
              )}
            </div>
          </div>
          <div className="container-48">
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("confirm_password")}
              />
              <label htmlFor="confirm_password" className="label-form">
                Confirm Password
              </label>
              {errors.confirm_password && (
                <span className="fade-in">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    ),
    1: (
      <>
        <p className="title t-2">A confirmation code was send by SMS.</p>
        <div className="width">
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("confirmation_code")}
            />
            <label htmlFor="username" className="label-form">
              Confirmation code
            </label>
            {errors.confirmation_code && (
              <span className="fade-in">
                {errors.confirmation_code.message}
              </span>
            )}
          </div>
        </div>
      </>
    ),
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>na-AI - Administration</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="user">
        <div className="left">
          <div className="header">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
          </div>
          <div className="body">
            <div className="navigation">
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin"
                exact={true}
              >
                <MdOutlineDashboard className="option-icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/users"
              >
                <FiUsers className="option-icon" />
                <span>Users</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <div className="options display-flex">
              <div className="option">
                <IoNotificationsOutline className="icon-element" />
                <span></span>
              </div>
              <div className="option">
                <BiEnvelope className="icon-element" />
                <span></span>
              </div>
              <div className="profile">
                <div
                  className="profile-item display-flex align-items-center"
                  onClick={() => setOption(!option)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="option">
                    <img
                      src={
                        !connectedUser?.userInfo?.thumbnails
                          ? process.env.PUBLIC_URL + "/user.png"
                          : `${SERVER_URL}/${connectedUser?.userInfo?.thumbnails}`
                      }
                      alt="user-profile"
                      className="width height"
                    />
                  </div>
                  <h3 className="title t-2">
                    {connectedUser?.userInfo?.prename +
                      " " +
                      connectedUser?.userInfo?.name}
                  </h3>
                  {option ? (
                    <BiChevronUp className="icon" />
                  ) : (
                    <BiChevronDown className="icon" />
                  )}
                </div>
                <div
                  className={option ? "profile-item display" : "profile-item"}
                >
                  <Link to="" className="nav-link">
                    <FiUser className="icon" />
                    <span>Profile</span>
                  </Link>
                  <Link to="" className="nav-link">
                    <IoHelp className="icon" />
                    <span>Help</span>
                  </Link>
                  <div className="nav-link" onClick={signOut}>
                    <FiLogOut className="icon" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
      <Modal
        contentLabel="Complete configuration"
        isOpen={connectedUser.userInfo?.is_completed ? false : true}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.75)", zIndex: 5 },
          content: {
            color: "inherit",
            width: "70%",
            height: "90%",
            margin: "auto",
            padding: 0,
          },
        }}
      >
        <div className="modal">
          <div className="modal-head display-flex justify-content-space-between align-items-center">
            <h3 className="title t-1">Complete your Registration</h3>
          </div>
          <div className="modal-body">
            <div className="config-head">
              <div
                className={
                  activeOption === 0 ? "config-tab active-tab" : "config-tab"
                }
              >
                <span>Personal Informations</span>
              </div>
              <div className="config-tab">
                <MdOutlineArrowForwardIos />
              </div>
              <div
                className={
                  activeOption === 1 ? "config-tab active-tab" : "config-tab"
                }
              >
                <span>Account activation</span>
              </div>
            </div>
            <div className="config-body">
              <form className="width" onSubmit={handleSubmit(onSubmit)}>
                {fragments[activeOption]}
                <div className="width">
                  {activeOption !== 1 ? (
                    <div className="col-l-6 col-s-11 m-auto">
                      {isSubmitting ? (
                        <div className="loader"></div>
                      ) : (
                        <button type="submit" className="button normal">
                          Validate
                        </button>
                      )}
                    </div>
                  ) : isSubmitting ? (
                    <div className="loader"></div>
                  ) : (
                    <div className="col-l-7 col-s-11 m-auto">
                      <button type="submit" className="button validate">
                        Confirm & Activate
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </HelmetProvider>
  );
};

export default Administration;
