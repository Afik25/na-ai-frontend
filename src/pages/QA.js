import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../components/Header";
import {
  FaMicrophoneAlt,
  FaPlay,
  FaStop,
  FaTrashAlt,
} from "../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaSubmit, wait } from "../utils/utils";

const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
  bitRate: 128,
});

const QA = () => {
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [minute, setMinute] = useState(0);
  const [translatedData, setTranslatedData] = useState({target:'', audios:[], caption:[]});

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaSubmit),
    defaultValues: { gcu: false },
  });

  const onSubmit = async (data) => {
    await wait(1000);
    //
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Afik AI Labs - Q&A</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="qa">
        <Header fix={false} />
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
                      Caption 1 <span>Cancel</span>
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
                      Caption 1 <span>Cancel</span>
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
                      Caption 1 <span>Cancel</span>
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
    </HelmetProvider>
  );
};

export default QA;
