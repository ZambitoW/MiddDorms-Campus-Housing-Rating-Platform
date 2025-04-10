import React, { useEffect } from "react";
import { useState } from "react";

export default function ProfilePage() {
  const [firstName] = useState("");
  const [lastName] = useState("");
  const [classYear, setClassYear] = useState("");
  const [email] = useState("");
  const [setPastReviews] = useState(undefined);

  const [classChange, setClassChange] = useState(true);

  r;

  useEffect(() => {
    const fetchPastReviews = async () => {
      try {
        const response = await fetch("Enter my URL");

        if (response.ok) {
          const reviews = await response.json();
          setPastReviews(reviews);
        }
      } catch (error) {
        console.error("Error fetching pastReviews", error);
      }
    };
    fetchPastReviews();
  }, []);
  return (
    <div>
      <h1> Profile Page </h1>
      <div>
        <h2> {`${firstName} ${lastName}`} </h2>
        <p>{`Email: ${email}`} </p>
        {classChange ? (
          <p> {`Graduation Year: ${classYear} `} </p>
        ) : (
          <input
            type="number"
            value={classYear}
            placeholder="Enter your graduation year"
            onChange={(e) => setClassYear(e.target.value)}
          />
        )}
        <button
          onClick={() => {
            classChange ? setClassChange(false) : setClassChange(true);
          }}
        >
          {" "}
          {classChange ? "Change Graduation Year" : "Submit"}{" "}
        </button>
      </div>
    </div>
  );
}
