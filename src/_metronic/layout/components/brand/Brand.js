import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {toAbsoluteUrl} from "../../../_helpers";

export function Brand() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses("brand", true),
      asideSelfMinimizeToggle: objectPath.get(
          uiService.config,
          "aside.self.minimize.toggle"
      ),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo()
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Brand */}
      <div
          className={`brand flex-column-auto ${layoutProps.brandClasses}`}
          id="kt_brand"
      >
        {/* begin::Logo */}
        <Link to="" className="brand-logo">
          <img alt="logo" src={layoutProps.headerLogo} />
          <span>A ferramenta definitiva para seu escritório</span>
        </Link>
        {/* end::Logo */}
      </div>
      {/* end::Brand */}
      </>
  );
}
