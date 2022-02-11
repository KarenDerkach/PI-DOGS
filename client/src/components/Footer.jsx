import React from "react";
import style from "./styless/Footer.module.css";

function Footer() {
  return (
    <div className={style.cfooter}>
      <footer class="page-footer font-small blue">
        <div class="footer-copyright text-center py-3">
          © 2022 Copyright:
          <a
            href="https://portfolio-karenderkach.vercel.app/"
            className={style.flink}
          >
            {" "}
            Karen Derkach
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
