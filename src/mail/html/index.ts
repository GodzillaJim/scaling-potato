import { IContactForm } from "../../types";

const getEmailTemplate = ({
  name,
  email,
  message,
}: IContactForm) => `<!DOCTYPE html>
    <html xml:lang="eng-US">
      <head>
        <title></title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/darkly/bootstrap.min.css" integrity="sha384-nNK9n28pDUDDgIiIqZ/MiyO3F4/9vsMtReZK39klb/MtkZI3/LtjSjlmyVPS3KdN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
      </head>
      <body class="bg-light">
        <style>
            .message{
                font-family: 'Times New Roman', Times;
                background-color: #dee0e3;
                border-radius: 4px;
                padding: 8px;
            }
            .instruction{
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }
            .footer{
                font-family: algerian
            }
        </style>
        <div class="container m-2 instruction">
            <div class="row">
                <div class="col">
                    <h6 class="text-dark">Hello there!</h6>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="text-dark">You got a new message from ${name}. Here is the message:</p>
                </div>
            </div>
            <div class="row text-dark p-1 message">
                <div class="col">
                    <p>${message}</p>
                    <p>${name}<br/>${email}</p>
                </div>
            </div>
            <div class="row my-2 pt-2">
                <div class="col">
                    <h5 class="text-dark">Yours,</h5>
                    <h5 class="footer text-dark">COLLABOR@TE</h5>
                </div>
            </div>
        </div>
      </body>
    </html>
    `;
export default getEmailTemplate;
