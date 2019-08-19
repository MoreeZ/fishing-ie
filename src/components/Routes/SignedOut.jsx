import React from "react";

const SignedOut = () => {
  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    box: {
      width: 500,
      height: 300,
      backgroundColor: "white",
      marginBottom: 100,
      border: "#d8d8d8 1px solid",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 30,
      borderRadius: 50
    },
    header: { fontFamily: "Gloria Hallelujah", fontSize: 60 },
    subheading: {
      fontFamily: "Gloria Hallelujah",
      fontSize: 24,
      textAlign: "center",
      color: "#353535"
    }
  };
  return (
    <div className="each-page-layout" style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.header}>Goodbye!</h1>
        <p style={styles.subheading}>
          Thank you for viewing my project. Have a wonderful day :)
        </p>
      </div>
    </div>
  );
};

export default SignedOut;
