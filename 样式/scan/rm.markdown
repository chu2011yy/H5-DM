```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        body{
            background-color: #eee;
        }
        .bar-box{
            position: relative;
            margin: 30px auto;
            border-radius: 16px;
            width: 350px;
            height: 600px;
            position: relative;
            overflow: hidden;
            box-shadow: 0px 0px 100px #999;
        }
        .bar-front{
            position: absolute;
            top:0;
            left:0;
            right: 100%;
            bottom:0;
            animation: an 3s infinite linear, an1 0.8s infinite linear;
            overflow: hidden;
        }
        .bar-front .bar-fixed{
            width: 350px;
            height: 600px;
            line-height: 600px;
            background-color: slateblue;
            color: white;
            font-size: 26px;
        }
        .bar-box:hover .bar-front{
            animation-play-state: paused;
        }
        @keyframes an {
            0% {
                right: 100%;
            }
            25% {
                right: 0%;
                bottom: 0%;
            }
            50% {
                bottom: 100%;
            }
            75% {
                bottom: 0%;
                right: 0%;
            }
            100% {
                right: 100%;
            }
        }
        @keyframes an1{
            0% {
                filter: invert(75%) blur(4px);
            }
            50% {
                transform: scale(1.05);
                filter: invert(90%) blur(2px);
            }
            100% {
                filter: invert(75%) blur(4px);
            }
        }
        .bar-fixed,.bar-box{
            background-image: url(ti.jpg);
            background-size: 100% 100%;
        }
    </style>
</head>
<body>
    <div class="bar-box">
        <div class="bar-front">
            <div class="bar-fixed"></div>
        </div>
    </div>
</body>
</html>
```