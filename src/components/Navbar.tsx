import Link from "next/link"

export default function Navbar() {
  return(
<div className="nav mx-auto sticky">
  <div className="container">
    <div className="btn">
      <Link href="/" >Home</Link>
    </div>
    <div className="btn">
      <Link href="/explore">Explore</Link>
    </div>
    <div className="btn">
      <Link href="/about" >About</Link>
    </div>
    <div className="btn">
      <Link href="/" >FAQ</Link>
      </div>

    <svg
      className="outline"
      overflow="visible"
      width="400"
      height="60"
      viewBox="0 0 400 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="rect"
        pathLength="100"
        x="0"
        y="0"
        width="400"
        height="60"
        fill="transparent"
        strokeWidth="5"
      ></rect>
    </svg>
  </div>
</div>

  )
}