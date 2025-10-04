import React, { useState, useCallback, useRef } from "react";
import c from "./create.module.css";
import MainLayout from "../../../layouts/MainLayout";
import StepWrapper from "../../../components/StepWrapper/StepWrapper";
import { Grid, TextField } from "@mui/material";
// import { Button } from '@mui/material';
// import { FileUpload } from '../../../components/FileUpload/FileUpload';
import { useInput } from "../../../hooks/useInput";
import { BACKEND_URL } from "../../../backends";
import { useRouter } from "next/router";
// import { TextSwipeGlow } from "../../../components/TextSwipeGlow/TextSwipeGlow";
import { useDropzone } from "react-dropzone";
// import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { Button } from "../../../components/Button/Button";

const CreateTrack = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [picPreview, setPicPreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [audioPreview, setAudioPreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    if (activeStep !== 2) {
      if (activeStep === 0) {
        if (!name.value || !artist.value || !text.value) {
          alert("Please fill in all fields");
          return;
        }
      }
      if (activeStep === 1) {
        if (!picture) {
          alert("Please upload a picture");
          return;
        }
      }
      setActiveStep((prev) => prev + 1);
    } else {
      if (!audio) {
        alert("Please upload an audio file");
        return;
      }
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture!);
      formData.append("audio", audio!);
      fetch(BACKEND_URL + "/tracks", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Upload failed");
          router.push("/tracks");
        })
        .catch((e) => console.log(e));
    }
  };

  const back = () => {
    if (activeStep === 0) {
      router.push("/tracks");
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const picOnDrop = useCallback((picAcceptedFiles: File[]) => {
    const file = picAcceptedFiles[0];

    if (!file) return null;

    setPicture(file);
    const reader = new FileReader();

    reader.onload = () => {
      setPicPreview(reader.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps: picGetRootProps, getInputProps: picGetInputProps } =
    useDropzone({
      onDrop: picOnDrop,
      accept: {
        "image/*": [],
      },
    });

  const audioOnDrop = useCallback((audioAcceptedFiles: File[]) => {
    const file = audioAcceptedFiles[0];

    if (!file) return null;

    setAudio(file);
    const reader = new FileReader();

    reader.onload = () => {
      setAudioPreview(reader.result);

      setTimeout(() => {
        audioRef.current?.load();
      }, 0);
    };

    reader.readAsDataURL(file);
  }, []);

  return (
    <MainLayout>
      <div className={c.grad1}></div>
      <div className={c.grad2}></div>
      <div className={c.grad3}></div>
      <div className={c.grad4}></div>
      <StepWrapper activeStep={activeStep}>
        <div className={c.step_content}>
          {activeStep === 0 && (
            <Grid container direction="column" spacing={2} sx={{ padding: 2 }}>
              <Grid container>
                <TextField
                  value={name.value}
                  onChange={name.onChange}
                  label="Track name"
                  fullWidth
                  required
                  sx={{
                    "& .MuiInputBase-input, & .MuiInputBase-inputMultiline": {
                      color: "white",
                      fontFamily: "Kanit",
                      fontSize: 18,
                    },
                    "& .MuiInputBase-input::placeholder, & .MuiInputBase-inputMultiline::placeholder":
                      {
                        color: "#fff",
                        opacity: 1,
                      },
                    "& .MuiInputLabel-root": {
                      color: "rgba(208,174,251,0.5)",
                      fontFamily: "Kanit",
                      fontSize: 18,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "rgba(208, 174, 251, 0.50)",
                        borderRadius: 5,
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "rgba(208,174,251,0.5)",
                        borderWidth: "2px",
                      },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(208,174,251,0.5)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(208,174,251,0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#D0AEFB",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#D0AEFB",
                    },
                  }}
                />
              </Grid>
              <Grid container>
                <TextField
                  value={artist.value}
                  onChange={artist.onChange}
                  label="Author name"
                  fullWidth
                  required
                  sx={{
                    "& .MuiInputBase-input, & .MuiInputBase-inputMultiline": {
                      color: "white",
                      fontFamily: "Kanit",
                      fontSize: 18,
                    },
                    "& .MuiInputBase-input::placeholder, & .MuiInputBase-inputMultiline::placeholder":
                      {
                        color: "#fff",
                        opacity: 1,
                      },
                    "& .MuiInputLabel-root": {
                      color: "rgba(208,174,251,0.5)",
                      fontFamily: "Kanit",
                      fontSize: 18,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "rgba(208, 174, 251, 0.50)",
                        borderRadius: 5,
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "rgba(208,174,251,0.5)",
                        borderWidth: "2px",
                      },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(208,174,251,0.5)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(208,174,251,0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#D0AEFB",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#D0AEFB",
                    },
                  }}
                />
              </Grid>
              <Grid container>
                <TextField
                  value={text.value}
                  onChange={text.onChange}
                  label="Lyrics"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  sx={{
                    "& .MuiInputBase-input, & .MuiInputBase-inputMultiline": {
                      color: "white",
                      fontFamily: "Kanit",
                      fontSize: 18,
                    },
                    "& .MuiInputBase-input::placeholder, & .MuiInputBase-inputMultiline::placeholder":
                      {
                        color: "#fff",
                        opacity: 1,
                      },
                    "& .MuiInputLabel-root": {
                      color: "rgba(208,174,251,0.5)",
                      fontFamily: "Kanit",
                      fontSize: 18,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "rgba(208, 174, 251, 0.50)",
                        borderRadius: 5,
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "rgba(208,174,251,0.5)",
                        borderWidth: "2px",
                      },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(208,174,251,0.5)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(208,174,251,0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#D0AEFB",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#D0AEFB",
                    },
                  }}
                />
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && (
            <div className={c.pic_step}>
              <div {...picGetRootProps()} className={c.pic_upload_area}>
                <input {...picGetInputProps()} />
                <div className={c.pic_preview}>
                  {typeof picPreview === "string" ? (
                    <img src={picPreview} alt="Preview" className={c.pic_img} />
                  ) : (
                    <div className={c.pic_placeholder}>
                      <div className={c.pic_icon}>📁</div>
                      <span className={c.pic_span}>Upload an image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={c.pic_info}>
                {picture ? (
                  <div className={c.pic_filename}>
                    <span className={c.file_name_txt}>File name:</span>{" "}
                    {picture.name}
                  </div>
                ) : (
                  <div className={c.pic_filename}>
                    The image has not been published
                  </div>
                )}
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className={c.audio_step}>
              {audio ? (
                <div className={c.audio_uploaded}>
                  <div className={c.audio_filename}>
                    File name: {audio.name}
                  </div>
                  <audio
                    ref={audioRef}
                    controls
                    controlsList="nodownload"
                    className={c.audio_player}
                  >
                    <source src={audioPreview as string} type={audio.type} />
                  </audio>
                </div>
              ) : (
                <div className={c.audio_upload_area}>
                  <div className={c.audio_upload_content}>
                    <div className={c.audio_no_file_text}>
                      The audio has not been published
                    </div>
                    <div className={c.upload_button_wrapper}>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            audioOnDrop([file]);
                          }
                        }}
                        style={{ display: "none" }}
                        id="audio-upload-input"
                      />
                      <button
                        type="button"
                        className={c.upload_button}
                        onClick={() => {
                          const input = document.getElementById(
                            "audio-upload-input"
                          ) as HTMLInputElement;
                          input?.click();
                        }}
                      >
                        Upload +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className={c.buttons}>
            <div className={c.buttons_container}>
              <div className={c.button_wrapper}>
                <Button onClick={back} str={"Back"} />
              </div>
              <div className={c.button_wrapper}>
                <Button onClick={next} str={"Next"} />
              </div>
            </div>
          </div>
        </div>
      </StepWrapper>
    </MainLayout>
  );
};

export default CreateTrack;
