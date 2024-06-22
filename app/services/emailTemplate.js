module.exports = (email, resetLink) => {
	return `
		<!doctype html>
<html>

<head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Transactional Email</title>
    <style>
        /* -------------------------------------
                    INLINED WITH htmlemail.io/inline
                ------------------------------------- */
        /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
        @media only screen and (max-width: 620px) {
            table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
            }

            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
                font-size: 16px !important;
            }

            table[class=body] .wrapper,
            table[class=body] .article {
                padding: 10px !important;
            }

            table[class=body] .content {
                padding: 0 !important;
            }

            table[class=body] .container {
                padding: 0 !important;
                width: 100% !important;
            }

            table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
            }

            table[class=body] .btn table {
                width: 100% !important;
            }

            table[class=body] .btn a {
                width: 100% !important;
            }

            table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
            }
        }

        /* -------------------------------------
                    PRESERVE THESE STYLES IN THE HEAD
                ------------------------------------- */
        @media all {
            .ExternalClass {
                width: 100%;
            }

            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }

            .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
            }

            .btn-primary table td:hover {
                background-color: #388e3c !important;
            }

            .btn-primary a:hover {
                background-color: #388e3c !important;
                border-color: #388e3c !important;
            }

            body>table>tbody>tr>td.container>div>div>table>tbody>tr>td>a :hover {
                color: #43a047;
            }
        }
    </style>
</head>

<body class=""
    style="background-color: #fff; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; font-size: 2rem; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" class="body"
        style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
        <tr>
            <td style="font-family: 'Inter', sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
            <td class="container"
                style="ffont-family: 'Inter', sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                <div class="content"
                    style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader"
                        style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This
                        is preheader text. Some clients will show this text as a preview.</span>
                    <table class="main"
                        style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                            <td class="wrapper"
                                style="font-family: 'Inter', sans-serif;font-size: 2rem; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                <table border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                    <tr>
                                        <td style="font-family: sans-serif; font-size: eeee; vertical-align: top;">
                                            <p
                                                style="font-family: sans-serif;font-size: 1.5rem; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                                                Hi <span style="color: #43a047;">${email}</span> ,</p>
                                            <p
                                                style="font-family: 'Inter', sans-serif; font-size: 1.2rem; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                                                Click the button below to change you password</p>
                                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"
                                                style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                                <tbody>
                                                    <tr>
                                                        <td align="left"
                                                            style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                                            <table border="0" cellpadding="0" cellspacing="0"
                                                                style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            style="font-family: 'Inter', sans-serif; font-size: 1.5rem; vertical-align: top; background-color: #43a047; border-radius: 5px; text-align: center;">
                                                                            <a href="${resetLink}" target="_blank"
                                                                                style="display: inline-block; color: #ffffff; background-color: #43a047; border: solid 1px #43a047; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #43a047;">Reset
                                                                                Password</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p
                                                style="font-family: sans-serif; font-size: 14px; font-weight: bold; margin: 0; Margin-bottom: 15px;">
                                                Note: Link expires in 1 hour</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- END MAIN CONTENT AREA -->
                    </table>

                    <!-- START FOOTER -->
                    <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                        <table border="0" cellpadding="0" cellspacing="0"
                            style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                            <tr>
                                <td class="content-block"
                                    style="font-family: 'Inter', sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                                    <h1 class="primary_heading"
                                        style="color: #111; text-transform: uppercase; font-weight: 900;">
                                        print<span style="color: #43A047;">it</span>y
                                    </h1>
                                    <br> <a href="https://www.instagram.com/printity.co/"
                                        style="font-size: 12px; text-align: center; color: #111; text-decoration: none;">Instagram</a>
                                    ・ <a href="https://facebook.com/"
                                        style="text-decoration: none; color: #111; font-size: 12px; text-align: center;">Facebook</a>
                                    ・ <a href="https://twitter.com/"
                                        style="text-decoration: none; color: #111; font-size: 12px; text-align: center;">Twitter</a>
                                    ・ <a href="https://linkedin.com/"
                                        style="text-decoration: none; color: #111; font-size: 12px; text-align: center;">linkedin</a>
                                </td>
                            </tr>

                        </table>
                    </div>
                    <!-- END FOOTER -->

                    <!-- END CENTERED WHITE CONTAINER -->
                </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        </tr>
    </table>
</body>

</html>
	`
}