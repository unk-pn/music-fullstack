import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TrackInterface } from "../../state/types/track";
import { GetServerSideProps } from "next";
import { BACKEND_URL } from "../../backends";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import c from "./id.module.css";
import { Button } from "../../components/Button/Button";
import { usePlayer } from "../../hooks/usePlayer";

interface TrackPageProps {
  serverTrack: TrackInterface;
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
  const [track, setTrack] = useState<TrackInterface>(serverTrack);
  const [openLyrics, setOpenLyrics] = useState<boolean>(false);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");
  const [player, { setActiveTrack, play, pause }] = usePlayer();
  const isCurrent = player.active?._id == track._id;

  const addComment = async () => {
    if (!username.value || !text.value) {
      alert("Please fill in both fields");
      return;
    }
    try {
      const response = await fetch(BACKEND_URL + "/tracks/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          text: text.value,
          trackId: track._id,
        }),
      });
      const data = await response.json();
      setTrack({ ...track, comments: [...track.comments, data] });
      username.setValue("");
      text.setValue("");
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCurrent) {
      setActiveTrack(track);
      play();
    } else if (player.pause) {
      play();
    } else {
      pause();
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const response = await fetch(
        BACKEND_URL + "/tracks/comments/" + commentId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
    } catch (e) {
      console.error(e);
    }
    router.reload();
  };

  return (
    <MainLayout
      title={track.name + "-" + track.artist}
      keywords={"Music" + track.name + ", " + track.artist}
      key={track._id}
      className={c.main}
    >
      <div className={c.grad1}></div>
      <div className={c.grad2}></div>
      <div className={c.grad3}></div>
      <div className={c.grad4}></div>
      <div className={c.main_wrapper}>
        <div className={c.track_info}>
          <Button
            onClick={() => router.push("/music")}
            str={"Back to tracks"}
            className={c.back_btn}
          />
          <Grid container style={{ margin: "20px 0" }} spacing={2}>
            <Grid container>
              <img
                className={c.track_image}
                src={BACKEND_URL + "/" + track.picture}
                alt={track.name}
              />
            </Grid>
            <Grid className={c.info_wrapper}>
              <h1 className={c.track_name}>{track.name}</h1>
              <h2 className={c.artist}>{track.artist}</h2>

              <Button
                onClick={togglePlay}
                str={"Listen"}
                className={c.listen}
              />
            </Grid>
          </Grid>
        </div>

        <div className={c.lyrics_section}>
          <div
            onClick={() => setOpenLyrics(!openLyrics)}
            className={c.lyrics_toggle}
          >
            {openLyrics ? (
              <p className={c.show_hide}>Hide Lyrics</p>
            ) : (
              // <img src='' alt='' className={c.lyrics_arrow}/>
              <p className={c.show_hide}>Show Lyrics</p>
              // <img src='' alt='' className={c.lyrics_arrow}/>
            )}
          </div>

          <div
            ref={(el) => {
              if (!el) return;
              el.style.maxHeight = openLyrics ? `${el.scrollHeight}px` : "0";
            }}
            className={c.lyrics_content + (openLyrics ? " " + c.open : "")}
          >
            <pre className={c.lyrics_text}>{track.text}</pre>
          </div>
        </div>

        <h3 className={c.comments_title}>Comments</h3>
        <div className={c.comments_section}>
          <Grid
            container
            direction="column"
            spacing={2}
            className={c.comments_form}
          >
            <Grid container className={c.username_wrapper}>
              <TextField
                {...username}
                label="Your Name"
                fullWidth
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
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
                      borderColor: "rgba(208,174,251,0.5)", // обычный
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(208,174,251,0.5)", // при наведении
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#D0AEFB", // при фокусе
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#D0AEFB", // цвет label при фокусе (убираем синий)
                  },
                }}
              />
            </Grid>
            <Grid container>
              <TextField
                {...text}
                label="Your Comment"
                fullWidth
                multiline
                rows={4}
                sx={{
                  "& .MuiInputBase-input, & .MuiInputBase-inputMultiline": {
                    color: "white",
                    fontFamily: "Kanit",
                    fontSize: 18,
                  },
                  // сам placeholder
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
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
                      borderColor: "rgba(208,174,251,0.5)", // обычный
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(208,174,251,0.5)", // при наведении
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#D0AEFB", // при фокусе
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#D0AEFB", // цвет label при фокусе (убираем синий)
                  },
                }}
              />
            </Grid>
            <div className={c.send_btn_wrapper}>
              <button onClick={addComment} className={c.send_btn}>
                Send comment
              </button>
            </div>
          </Grid>
          <div className={c.comments}>
            {track.comments.length > 0 ? (
              track.comments.map((comment) => (
                <div key={comment._id} className={c.comment}>
                  <div>
                    <h3 className={c.comment_author}>{comment.username}</h3>
                    <div className={c.comment_text}>
                      <pre>{comment.text}</pre>
                    </div>
                  </div>
                  <div>
                    <IconButton
                      style={{ marginLeft: "auto", marginRight: 10 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteComment(comment._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <div className={c.comments_empty}>
                No comments yet. Be the first to leave a comment!
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await fetch(BACKEND_URL + "/tracks/" + params?.id);

    if (!response.ok) {
      return {
        redirect: {
          destination: "/music",
          permanent: false,
        },
      };
    }

    const data = await response.json();
    return {
      props: {
        serverTrack: data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/music",
        permanent: false,
      },
    };
  }
};
