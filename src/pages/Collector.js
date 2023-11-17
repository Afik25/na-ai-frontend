import React, { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
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
import { useSelector, useDispatch } from "react-redux";
import {
  isEmpty,
  wait,
  validationCompleteInscriptionStepOne,
  validationCompleteInscriptionStepTwo,
} from "../utils/utils";
import {
  completeInscription,
  completeActivation,
} from "../services/authentication";
import { getOriginsData, translationDatas } from "../services/origins_data";

const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
  bitRate: 128,
});

const Collector = () => {
  const axiosPrivate = useAxiosPrivate();
  const [option, setOption] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
  const [randomNumber, setRandomNumer] = useState(0);
  //
  const [audioOrigin, setAudioOrigin] = useState([]);
  const [audioBlob, setAudioBlob] = useState();
  const [audioCaptionTarget, setAudioCaptionTarget] = useState([]);
  const [language, setLanguage] = useState("");
  const [textCaption, setTextCaption] = useState("");
  const clearTextCaption = useRef("");
  const [captionData, setCaptionData] = useState();
  //
  const dispatch = useDispatch();
  const origins = useSelector(
    (state) => state.setInitConf.initOriginsData.originsData
  );
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    getOriginsData(axiosPrivate, signal).then((result) => {
      dispatch({
        type: "setUp/getOriginsData",
        payload: result,
      });

      setIsLoading(false);
    });
    return () => {
      isMounted = false;
      isMounted && controller.abort();
    };
  }, []);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const min = 1;
    const max = origins?.data.length;
    setRandomNumer(randomNumberInRange(min, max));
    const dat = origins?.data.result.filter((item) => item.id === randomNumber);
    setCaptionData(dat);
  }, [origins]);

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

  // logout
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  //

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

  const start = () => {
    if (recordingState.isBlocked) {
      console.log("Permission Denied");
    } else {
      if (!language && step === 1) {
        swal({
          title: "Target Language!",
          text: "You should first choose the target language among the listed one!",
          icon: "warning",
          buttons: true,
        });
      } else {
        recorder
          .start()
          .then(() => {
            setTime(0);
            setRecordingState({ isRecording: true });
            setIsTimerStarted(true);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  };

  const stop = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setAudioBlob([...audioBlob, { blobURL: blobURL, blob: blob }]);
        setRecordingState({ blobURL: blobURL, isRecording: false });
        if (step === 0) {
          setAudioOrigin([...audioOrigin, { blobURL: blobURL, blob: blob }]);
        }
        setIsTimerStarted(false);
        setTime(time);
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
        console.log(e);
      });
  };

  const onRemove = (i) => {
    if (step === 0) {
      setAudioOrigin((prevState) => {
        const newAudioOrigin = [...prevState];
        newAudioOrigin.splice(i, 1);
        return newAudioOrigin;
      });
    } else {
      setAudioCaptionTarget((prevState) => {
        const newAudioCaptionTarget = [...prevState];
        newAudioCaptionTarget.splice(i, 1);
        return newAudioCaptionTarget;
      });
    }
  };

  const onAddCaption = async () => {
    if (!language) {
      swal({
        title: "Target Language!",
        text: "You should first choose the target language among the listed one!",
        icon: "warning",
        buttons: true,
      });
    } else if (!textCaption) {
      swal({
        title: "Target Language Caption!",
        text: "Enter the text for target language!",
        icon: "warning",
        buttons: true,
      });
    } else {
      setAudioCaptionTarget([
        ...audioCaptionTarget,
        {
          lang: language,
          audio: audioBlob.blob,
          audioUrl: audioBlob.blobURL,
          caption: textCaption,
        },
      ]);
      clearTextCaption.current.value = "";
    }
  };

  const onUpload = async () => {
    console.log({
      "audio version ": audioOrigin,
      "translation ": audioCaptionTarget,
    });
    // const formData = new FormData();
    // //
    // formData.append("origin_audios", audioOrigin);
    // formData.append("translations", audioCaptionTarget);

    const formData = {
      origin_audios: audioOrigin,
      translations: audioCaptionTarget,
    };

    translationDatas(axiosPrivate, formData)
      .then((result) => {
        let response = result;
        if (response?.data?.status === 1) {
          swal({
            title: "Translations Uploade",
            text: `${response?.data?.message}.`,
            icon: "success",
            button: "Ok",
          });
        }
      })
      .catch((error) => {
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
          {isLoading && (
            <div className="loading">
              <div className="loading-content">
                <div className="loader"></div> <span>Loading data...</span>
              </div>
            </div>
          )}
          <div className="container">
            <div className="snapshot">
              <h2 className="title t-2">Snapshot</h2>
              {isEmpty(captionData) ? (
                <>No caption loaded yet!</>
              ) : (
                captionData.map((item) => (
                  <p key={item.id} className="title t-3">
                    {item?.text}
                  </p>
                ))
              )}
            </div>
            <div className="steps">
              {step === 0 && (
                <div className="step step-1 fade-in">
                  <div className="audios">
                    {isEmpty(audioOrigin) ? (
                      <p
                        className="title t-2"
                        style={{ color: "red", textAlign: "center" }}
                      >
                        No converted audio from text.
                      </p>
                    ) : (
                      audioOrigin.map((item, i) => (
                        <div key={i} className="audio-item">
                          <span className="ruban">{i + 1}</span>
                          <audio
                            src={item.blobURL}
                            controls="controls"
                            className="input-audio"
                          ></audio>
                          <span className="icon" onClick={() => onRemove(i)}>
                            <FaTrashAlt />
                          </span>
                        </div>
                      ))
                    )}
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
                  <button className="btn-audio">Add audio</button>
                </div>
              )}
              {step === 1 && (
                <div className="step step-2 fade-in">
                  <div className="caption">
                    <div className="left">
                      <h2 className="title t-2">Traduction target</h2>
                      <form>
                        <div className="tongues">
                          <input
                            type="radio"
                            id="first"
                            name="sign_order"
                            value="lingala"
                            onChange={(e) => setLanguage(e.target.value)}
                          />
                          <label htmlFor="first">Lingala</label>
                          <input
                            type="radio"
                            id="second"
                            name="sign_order"
                            value="swahili"
                            onChange={(e) => setLanguage(e.target.value)}
                          />
                          <label htmlFor="second">Swahili</label>
                          <input
                            type="radio"
                            id="third"
                            name="sign_order"
                            value="tshiluba"
                            onChange={(e) => setLanguage(e.target.value)}
                          />
                          <label htmlFor="third">Tshiluba</label>
                          <input
                            type="radio"
                            id="fourth"
                            name="sign_order"
                            value="kikongo"
                            onChange={(e) => setLanguage(e.target.value)}
                          />
                          <label htmlFor="fourth">Kikongo</label>
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
                            <button
                              type="button"
                              className="button"
                              onClick={start}
                            >
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
                            rows={5}
                            ref={clearTextCaption}
                            onChange={(e) => setTextCaption(e.target.value)}
                          ></textarea>
                          <label htmlFor="username" className="label-form">
                            Text caption
                          </label>
                        </div>
                        <div className="width">
                          <button
                            type="button"
                            className="width button normal"
                            onClick={onAddCaption}
                          >
                            Add Text Caption
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="right">
                      <div className="audios">
                        {isEmpty(audioCaptionTarget) ? (
                          <p
                            className="title t-2"
                            style={{ color: "red", textAlign: "center" }}
                          >
                            No converted audio from snapshot.
                          </p>
                        ) : (
                          audioCaptionTarget.map((item, i) => (
                            <div key={i} className="audio-item">
                              <span className="ruban">{item.lang}</span>
                              <audio
                                src={item.audioUrl}
                                controls="controls"
                                className="input-audio"
                              ></audio>
                              <span
                                className="icon"
                                onClick={() => onRemove(i)}
                              >
                                <FaTrashAlt />
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="captions">
                        {isEmpty(audioCaptionTarget) ? (
                          <p
                            className="title t-2"
                            style={{ color: "red", textAlign: "center" }}
                          >
                            No converted text from snapshot.
                          </p>
                        ) : (
                          audioCaptionTarget.map((item, i) => (
                            <div key={i} className="item">
                              <h2 className="title t-2">
                                Caption {i + 1} - {item.lang}{" "}
                                <span onClick={() => onRemove(i)}>Cancel</span>
                              </h2>
                              <p className="title t-3">{item.caption}</p>
                            </div>
                          ))
                        )}
                      </div>
                      {audioCaptionTarget.length !== 0 && (
                        <div className="width">
                          <button
                            type="submit"
                            className="width button normal"
                            onClick={onUpload}
                          >
                            Validate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className="btn-move"
              onClick={() => setStep(step === 0 ? 1 : 0)}
            >
              {step === 0 ? "Next" : "Previous"}
            </button>
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
