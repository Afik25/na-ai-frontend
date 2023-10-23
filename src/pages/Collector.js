import React, { useState, useEffect } from "react";
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
  BsFillCameraFill,
  MdOutlineArrowForwardIos,
  FaTrashAlt,
  FaPlay,
  FaStop,
  FaMicrophoneAlt,
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
import { completeInscription, completeActivation } from "../services/users";

const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
  bitRate: 128,
});

const Collector = () => {
  const axiosPrivate = useAxiosPrivate();
  const [option, setOption] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  //
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [minute, setMinute] = useState(0);
  const [translatedData, setTranslatedData] = useState({
    target: "",
    audios: [],
    caption: [],
  });

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setRecordingState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        setRecordingState({ isBlocked: true });
      }
    );

    let interval = null;

    if (isTimerStarted) {
      interval = setInterval(() => {
        setTime((time) => (time === 59 ? 0 : time + 1));
        if (time === 59) {
          setMinute((minute) => minute + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerStarted, time]);

  const start = () => {
    if (recordingState.isBlocked) {
      console.log("Permission Denied");
    } else {
      recorder
        .start()
        .then(() => {
          setRecordingState({ isRecording: true });
          setIsTimerStarted(true);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const stop = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setRecordingState({ blobURL: blobURL, isRecording: false });
        setIsTimerStarted(false);
        setTime(0);
        setMinute(0);
        // do what ever you want with buffer and blob
        // Example: Create a mp3 file and play
        // const file = new File(buffer, "me-at-thevoice.mp3", {
        //   type: blob.type,
        //   lastModified: Date.now(),
        // });

        // const player = new Audio(URL.createObjectURL(file));
        // player.play();
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  };

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
              text: error?.response?.data?.message,
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
        <p className="title t-2">
          Un code de confirmation permettant l'activation de votre compte a été
          envoyé par SMS via le numéro de téléphone que vous avez renseigné.
        </p>
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
        <title>na AI - Administration</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="collector">
        <div className="header">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            className="img-logo"
          />
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
                    // src={
                    //   !connectedUser?.userInfo?.thumbnails
                    //     ? process.env.PUBLIC_URL + "/user.png"
                    //     : `${SERVER_URL}/${connectedUser?.userInfo?.thumbnails}`
                    // }
                    src={process.env.PUBLIC_URL + "/user.png"}
                    alt="user-profile"
                    className="width height"
                  />
                </div>
                <h3 className="title t-2">
                  Username
                  {/* {connectedUser?.userInfo?.prename +
                        " " +
                        connectedUser?.userInfo?.name} */}
                </h3>
                {option ? (
                  <BiChevronUp className="icon" />
                ) : (
                  <BiChevronDown className="icon" />
                )}
              </div>
              <div className={option ? "profile-item display" : "profile-item"}>
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
          <div className="container">
            <div className="snapshot">
              <h2 className="title t-2">Snapshot</h2>
              <p className="title t-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="caption">
              <div className="left">
                <h2 className="title t-2">Traduction target</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="tongues">
                    <input
                      type="radio"
                      id="first"
                      name="sign_order"
                      value="lingala"
                    />
                    <label htmlFor="first">Lingala</label>
                    <input
                      type="radio"
                      id="second"
                      name="sign_order"
                      value="swahili"
                    />
                    <label htmlFor="second">Swahili</label>
                    <input
                      type="radio"
                      id="third"
                      name="sign_order"
                      value="tshiluba"
                    />
                    <label htmlFor="third">Tshiluba</label>
                    <input
                      type="radio"
                      id="fourth"
                      name="sign_order"
                      value="kikongo"
                    />
                    <label htmlFor="fourth">Kikongo</label>
                    <input
                      type="radio"
                      id="fifth"
                      name="sign_order"
                      value="yoruba"
                    />
                    <label htmlFor="fifth">Yoruba</label>
                  </div>
                  <div className="recording">
                    <div
                      className={
                        recordingState.isRecording
                          ? "circle circle-recording"
                          : "circle"
                      }
                    >
                      <FaMicrophoneAlt className="icon" />
                    </div>
                    <p className="title t-3">{minute + ":" + time}</p>
                    {recordingState.isRecording ? (
                      <button
                        type="button"
                        className="button button-recording"
                        onClick={stop}
                      >
                        <FaStop />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button type="button" className="button" onClick={start}>
                        <FaPlay />
                        <span>Start</span>
                      </button>
                    )}
                  </div>
                  <div className="input-div">
                    <textarea
                      type="text"
                      className="input-textarea"
                      autoComplete="none"
                      placeholder=" "
                      // {...register("username")}
                      rows={5}
                    ></textarea>
                    <label htmlFor="username" className="label-form">
                      Text caption
                    </label>
                    {/* {errors.username && (
                      <span className="fade-in">{errors.username.message}</span>
                    )} */}
                  </div>
                  <div className="width">
                    <button type="submit" className="width button normal">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="right">
                <div className="audios">
                  <div className="audio-item">
                    <audio
                      src={recordingState.blobURL}
                      controls="controls"
                      className="input-audio"
                    ></audio>
                    <span className="icon">
                      <FaTrashAlt />
                    </span>
                  </div>
                </div>
                <div className="captions">
                  <div className="item">
                    <h2 className="title t-2">
                      Caption 1 - Lingala <span>Cancel</span>
                    </h2>
                    <p className="title t-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It was popularised in the 1960s with
                      the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                  <div className="item">
                    <h2 className="title t-2">
                      Caption 2 - Swahili <span>Cancel</span>
                    </h2>
                    <p className="title t-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It was popularised in the 1960s with
                      the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                  <div className="item">
                    <h2 className="title t-2">
                      Caption 3 - Kikongo <span>Cancel</span>
                    </h2>
                    <p className="title t-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It was popularised in the 1960s with
                      the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                </div>
                <div className="width">
                  <button type="submit" className="width button normal">
                    Validate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        contentLabel="Complete configuration"
        // isOpen={connectedUser.userInfo?.is_completed ? false : true}
        isOpen={false}
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

export default Collector;
