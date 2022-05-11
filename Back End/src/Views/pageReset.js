const teste = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de senha</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-image: linear-gradient(45deg, rgb(255, 81, 0), rgb(255, 166, 0));
        }

        div {
            background-color: rgba(0, 0, 0, 0.9);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 80px;
            border-radius: 15px;
            color: #fff;
        }

        input {
            padding: 15px;
            border: none;
            outline: none;
            font-size: 15px;
        }

        button {
            background-color: rgb(250, 246, 10);
            border: none;
            padding: 15px;
            width: 100%;
            border-radius: 10px;
            color: rgb(2, 1, 1);
            font-size: 15px;
            font-weight: bold;

        }

        button:hover {
            background-color: rgb(36, 238, 0);
            cursor: pointer;
        }
    </style>
</head>

<body>

    <div>
        <h1>Redefinir Senha</h1>
        <input type="password" placeholder="Nova Senha" id="password">
        <br><br>
        <input type="password" placeholder="Confirmar Senha" id="confirmPassword">
        <br><br>
        <button onclick="resetPassword()">
            Redefinir
        </button>
    </div>

    <script>
        function resetPassword() {

            const password = document.getElementById("password").value

            const confirmPassword = document.getElementById("confirmPassword").value

            var token = window.location.href.split('#')[1]

            const reset = () => {
                fetch('https://auth-api-user.herokuapp.com/user/resetPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token,
                        password: password,
                    })
                }).then(res => res.json())
                    .then(data => {
                        alert("Redefinição concluida com sucesso!");

                    }).catch(err => {
                        alert("Url inválida");
                    })
            }

            if (password === "" || confirmPassword === "") alert("Campo sem senha")

            password === confirmPassword ? reset() : alert("As senhas devem ser iguais");
        }
    </script>
</body>

</html>
`

module.exports = teste