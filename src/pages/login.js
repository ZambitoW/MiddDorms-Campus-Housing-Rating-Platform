import { signIn } from "next-auth/react";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const [isPaused, setIsPaused] = useState(false);
  const handleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const router = useRouter();
  const alertShown = useRef(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (router.query.alert === "1" && !alertShown.current) {
      alert("You must be logged in to view that page.");
      alertShown.current = true;
      router.replace("/login", undefined, { shallow: true });
    }
  }, [router]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className={styles.loginPage}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={styles.backgroundVideo}
      >
        <source src="/middleburyDrone.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Login to MiddDorms</h1>
        <h3>Please use your Middlebury College email</h3>
        <div className={styles.loginForm}>
          <button onClick={handleLogin} className={styles.loginButton}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Sign in with Google
          </button>
        </div>
      </div>

      <button className={styles.videoControl} onClick={toggleVideoPlayback}>
        {isPaused ? (
          <div className={styles.playIcon} />
        ) : (
          <div className={styles.pauseIcon}>
            <div />
            <div />
          </div>
        )}
      </button>
    </div>
  );
}
