export function Manifesto() {
  return (
    <section className="lk-manifesto" aria-labelledby="manifesto-title">
      <div className="lk-grid lk-manifesto-layout">
        <h2 id="manifesto-title" className="lk-display">
          <span className="lk-got">What got you</span>
          <span className="lk-here">here</span>
          <span className="lk-bridge" aria-hidden="true">
            <i />
            <b />
          </span>
          <span className="lk-wont">won’t get you</span>
          <span className="lk-there">there.</span>
        </h2>
        <div className="lk-manifesto-body">
          <p>
            You built this on long hours and a reputation people already trust.
          </p>
          <p>
            A new customer still meets the old name, the old logo, and a
            website from an earlier stage of the company. They ask “do you
            do…?” because the offer is hard to picture.
          </p>
          <p>
            I start with what the work is worth to that customer. Then I put
            it into the identity and the site, so the first visit matches the
            job you actually do now.
          </p>
        </div>
        <p className="lk-statement">
          If the work has outgrown the brand, that is the project.
        </p>
      </div>
    </section>
  );
}
