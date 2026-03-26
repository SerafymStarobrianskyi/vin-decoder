import { NavLink } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar__container">
          <h1 className="topbar__title">VIN Decoder</h1>
          <nav className="topbar__nav">
            <NavLink to="/" className="topbar__link">Home</NavLink>
            <NavLink to="/variables" className="topbar__link">Variables</NavLink>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
