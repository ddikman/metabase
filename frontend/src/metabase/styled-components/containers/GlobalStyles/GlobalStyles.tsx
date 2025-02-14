import { css, Global, useTheme } from "@emotion/react";

import { baseStyle, getRootStyle } from "metabase/css/core/base.styled";
import { alpha, color } from "metabase/lib/colors";
import { useSelector } from "metabase/lib/redux";
import { aceEditorStyles } from "metabase/query_builder/components/NativeQueryEditor/NativeQueryEditor.styled";
import { saveDomImageStyles } from "metabase/visualizations/lib/save-chart-image";

import { getFont, getFontFiles } from "../../selectors";

export const GlobalStyles = (): JSX.Element => {
  const font = useSelector(getFont);
  const fontFiles = useSelector(getFontFiles);
  const theme = useTheme();

  const styles = css`
    :root {
      --default-font-family: "${font}";
      --color-brand: ${color("brand")};
      --color-brand-alpha-04: ${alpha("brand", 0.04)};
      --color-brand-alpha-88: ${alpha("brand", 0.88)};
      --color-focus: ${color("focus")};
    }

    ${fontFiles?.map(
      file => css`
        @font-face {
          font-family: "${font}";
          src: url(${encodeURI(file.src)}) format("${file.fontFormat}");
          font-weight: ${file.fontWeight};
          font-style: normal;
          font-display: swap;
        }
      `,
    )}

    ${aceEditorStyles}
    ${saveDomImageStyles}
    body {
      ${getRootStyle(theme)}
    }
    ${baseStyle}
  `;

  return <Global styles={styles} />;
};
