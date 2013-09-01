# HTML_CodeSniffer

Everything from the [original README](https://github.com/squizlabs/HTML_CodeSniffer) applies.

## PhantomJS Additions

This fork provides the following to the PhantomJS runner:

- Uses [TAP 13](http://podwiki.hexten.net/TAP/TAP13.html?page=TAP13) as the output format.
- Paths to elements called out in warnings, errors, and notices are output, allowing you to easily find and fix the elements on your HTML page.
- Adds an error type level command line argument so that you can just get ERRORS, ERRORS and WARNINGS, or ERRORS WARNINGS and NOTICES.
- When a failure occurs, a non-zero exit status is returned.

## Examples

**Defaults to only checking for ERRORS**

```bash
➜  PhantomJS git:(master) ✗ phantomjs HTMLCS_Run.js http://0.0.0.0:4000/ WCAG2A
TAP version 13
1..36
ok 1 DOCUMENT
ok 2 DOCUMENT > HTML
ok 3 DOCUMENT > HTML > HEAD
ok 4 DOCUMENT > HTML > HEAD > META [0]
ok 5 DOCUMENT > HTML > HEAD > META [1]
ok 6 DOCUMENT > HTML > HEAD > TITLE
ok 7 DOCUMENT > HTML > HEAD > META
ok 8 DOCUMENT > HTML > HEAD > LINK
ok 9 DOCUMENT > HTML > HEAD > META#viewport [0]
ok 10 DOCUMENT > HTML > HEAD > META [6]
ok 11 DOCUMENT > HTML > BODY.general.home
ok 12 DOCUMENT > HTML > BODY.general.home > DIV.contain
ok 13 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content
ok 14 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds
ok 15 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c1 [0]
ok 16 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c2 [1]
ok 17 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c3 [2]
ok 18 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c4 [3]
ok 19 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c5 [4]
ok 20 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home
ok 21 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > H1
ok 22 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go
ok 23 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy
ok 24 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [0]
ok 25 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [1]
ok 26 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM
ok 27 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM > INPUT#start
ok 28 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds
ok 29 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [0]
ok 30 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [1]
ok 31 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [2]
ok 32 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]
ok 33 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [0]
ok 34 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [1]
ok 35 DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER
ok 36 DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER > A
```

**Checking for both ERRORS and WARNINGS**

```bash
➜  PhantomJS git:(master) ✗ phantomjs HTMLCS_Run.js http://0.0.0.0:4000/ WCAG2A ERRORS_AND_WARNINGS
TAP version 13
1..36
not ok 1 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [0]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [0]
  ...
not ok 2 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [1]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [1]
  ...
not ok 3 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [0]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [0]
  ...
not ok 4 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [1]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [1]
  ...
ok 5 DOCUMENT
ok 6 DOCUMENT > HTML
ok 7 DOCUMENT > HTML > HEAD
ok 8 DOCUMENT > HTML > HEAD > META [0]
ok 9 DOCUMENT > HTML > HEAD > META [1]
ok 10 DOCUMENT > HTML > HEAD > TITLE
ok 11 DOCUMENT > HTML > HEAD > META
ok 12 DOCUMENT > HTML > HEAD > LINK
ok 13 DOCUMENT > HTML > HEAD > META#viewport [0]
ok 14 DOCUMENT > HTML > HEAD > META [6]
ok 15 DOCUMENT > HTML > BODY.general.home
ok 16 DOCUMENT > HTML > BODY.general.home > DIV.contain
ok 17 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content
ok 18 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds
ok 19 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c1 [0]
ok 20 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c2 [1]
ok 21 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c3 [2]
ok 22 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c4 [3]
ok 23 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c5 [4]
ok 24 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home
ok 25 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > H1
ok 26 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go
ok 27 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy
ok 28 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM
ok 29 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM > INPUT#start
ok 30 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds
ok 31 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [0]
ok 32 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [1]
ok 33 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [2]
ok 34 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]
ok 35 DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER
ok 36 DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER > A
```

**Checking for all ERRORS, WARNINGS, and NOTICES**

```bash
➜  PhantomJS git:(master) ✗ phantomjs HTMLCS_Run.js http://0.0.0.0:4000/ WCAG2A ALL
TAP version 13
1..36
not ok 1 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [0]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [0]
  ...
not ok 2 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [1]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy > I [1]
  ...
not ok 3 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [0]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [0]
  ...
not ok 4 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [1]
  ---
  errors: 1
  details:
    - type: WARNING
      message: Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_1.H49.I
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]  > I [1]
  ...
not ok 5 DOCUMENT
  ---
  errors: 6
  details:
    - type: NOTICE
      message: Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_2.G57
      path: DOCUMENT
    - type: NOTICE
      message: Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.
      standard: WCAG2A.Principle1.Guideline1_3.1_3_3.G96
      path: DOCUMENT
    - type: NOTICE
      message: Check that any information conveyed using colour alone is also available in text, or through other visual cues.
      standard: WCAG2A.Principle1.Guideline1_4.1_4_1.G14,G182
      path: DOCUMENT
    - type: NOTICE
      message: If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.
      standard: WCAG2A.Principle2.Guideline2_2.2_2_2.SCR33,SCR22,G187,G152,G186,G191
      path: DOCUMENT
    - type: NOTICE
      message: Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.
      standard: WCAG2A.Principle2.Guideline2_3.2_3_1.G19,G176
      path: DOCUMENT
    - type: NOTICE
      message: Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.
      standard: WCAG2A.Principle2.Guideline2_4.2_4_1.G1,G123,G124,H69
      path: DOCUMENT
  ...
not ok 6 DOCUMENT > HTML > HEAD > TITLE
  ---
  errors: 1
  details:
    - type: NOTICE
      message: Check that the title element describes the document.
      standard: WCAG2A.Principle2.Guideline2_4.2_4_2.H25.2
      path: DOCUMENT > HTML > HEAD > TITLE
  ...
ok 7 DOCUMENT > HTML
ok 8 DOCUMENT > HTML > HEAD
ok 9 DOCUMENT > HTML > HEAD > META [0]
ok 10 DOCUMENT > HTML > HEAD > META [1]
ok 11 DOCUMENT > HTML > HEAD > META
ok 12 DOCUMENT > HTML > HEAD > LINK
ok 13 DOCUMENT > HTML > HEAD > META#viewport [0]
ok 14 DOCUMENT > HTML > HEAD > META [6]
ok 15 DOCUMENT > HTML > BODY.general.home
ok 16 DOCUMENT > HTML > BODY.general.home > DIV.contain
ok 17 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content
ok 18 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds
ok 19 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c1 [0]
ok 20 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c2 [1]
ok 21 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c3 [2]
ok 22 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c4 [3]
ok 23 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > DIV.clouds > DIV.cloud.c5 [4]
ok 24 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home
ok 25 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > H1
ok 26 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go
ok 27 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > P.copy
not ok 28 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM
  ---
  errors: 2
  details:
    - type: NOTICE
      message: If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.
      standard: WCAG2A.Principle3.Guideline3_3.3_3_1.G83,G84,G85
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM
    - type: NOTICE
      message: Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.
      standard: WCAG2A.Principle3.Guideline3_3.3_3_2.G131,G89,G184,H90
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM
  ...
not ok 29 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM > INPUT#start
  ---
  errors: 1
  details:
    - type: NOTICE
      message: Check that a change of context does not occur when this input field receives focus.
      standard: WCAG2A.Principle3.Guideline3_2.3_2_1.G107
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > HEADER.home > DIV.go > FORM > INPUT#start
  ...
ok 30 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds
ok 31 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [0]
ok 32 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [1]
ok 33 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [2]
ok 34 DOCUMENT > HTML > BODY.general.home > DIV.contain > DIV#content > SECTION.feature-clouds > DIV [3]
ok 35 DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER
not ok 36 DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER > A
  ---
  errors: 1
  details:
    - type: NOTICE
      message: Check that the link text combined with programmatically determined link context identifies the purpose of the link.
      standard: WCAG2A.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81
      path: DOCUMENT > HTML > BODY.general.home > DIV.contain > FOOTER > A
  ...
```

:heart: :heart: :heart:
