export default function Home() {
  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
      <div className="container text-center mt-4">
        <h1 style={{ color: "#006633" }}>Ganesh Jasti Portfolio</h1>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src="https://ganesh-645-hw1.s3.us-east-1.amazonaws.com/Homepage_pic.jpg"
              alt="Ganesh Jasti"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-8">
            <p>
              Hi, I'm <b>Ganesh Jasti</b>, a passionate <b>Software Engineer in the making</b>.
              I am currently pursuing my Master's in Computer Science at <b>George Mason University</b>.
            </p>
            <p>
              Here, you’ll find a collection of my projects, showcasing my expertise in{" "}
              <b>programming, problem-solving, and software development</b>.
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h3 className="text-center">Contact Me</h3>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ul className="list-group">
              <li className="list-group-item">
                📧 Email: <a href="mailto:gjasti@gmu.edu">gjasti@gmu.edu</a>
              </li>
              <li className="list-group-item">
                📞 Phone: <a href="tel:+15719109089">+1 (571) 910-9089</a>
              </li>
              <li className="list-group-item">
                🔗 LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/ganeshjasti" target="_blank" rel="noreferrer">
                  linkedin.com/in/ganeshjasti
                </a>
              </li>
              <li className="list-group-item">
                🔗 GitHub:{" "}
                <a href="https://github.com/Ganeshjasti0912" target="_blank" rel="noreferrer">
                  github.com/Ganeshjasti0912
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="text-center p-3 bg-success text-light mt-5">
        © 2025 Ganesh Jasti | All Rights Reserved
      </footer>
    </div>
  );
}
