import React, { useEffect, useState } from "react";
import { Grid, Card, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useFetchTracks } from "../../hooks/useFetchTracks";
import TrackList from "../../components/TrackList/TrackList";
import c from "./tracks.module.css";
import MainLayout from "../../layouts/MainLayout";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Button } from "../../components/Button/Button";

const TracksPage = () => {
  const router = useRouter();
  const { tracks, error, fetchTracks } = useFetchTracks();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        await fetchTracks(query);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    
    return () => { cancelled = true }
  }, [query]); // если добавить fetchTracks в массив зависимостей, то будет вечная загрузка

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <MainLayout title="Tracks">
        <div className={c.grad1}></div>
        <div className={c.grad2}></div>
        <Grid container justifyContent="center" className={c.wrapper}>
          <Card
            className={c.card}
            style={{
              borderRadius: 32,
              width: 1200,
              backgroundColor: "rgba(0,0,0,0.4)",
              marginTop: 60,
            }}
          >
            <Box
              p={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <h1 className={c.title}>Tracks</h1>

              <Button onClick={() => router.push("/tracks/create")} str="Upload +" />
            </Box>
            <div style={{ margin: "0 40px" }}>
              <h2 className={c.search_text}>Search by name</h2>
              <SearchInput
                value={query}
                onChange={search}
                className={c.searchInput}
              />
            </div>
            {error ? (
              <h1 className={c.error}>Error: {error}</h1>
            ) : loading ? (
              <div className={c.loader_wrapper}>
                <div className={c.loader}></div>
              </div>
            ) : tracks.length ? (
              <TrackList tracks={tracks} />
            ) : (
              <h1 className={c.error}>
                No tracks yet. Be the first to upload!
              </h1>
            )}
          </Card>
        </Grid>
      </MainLayout>
    </div>
  );
};

export default TracksPage;
