<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Highlighted Text</title>
    <script>
        function getSelectedText() {
            const selectedText = window.getSelection().toString();
            if (selectedText) {
                alert("Selected text: " + selectedText);
            } else {
                alert("No text selected!");
            }
        }
    </script>
</head>
<body>
    <p>Select any part of this text with your mouse, then click the button below.</p>
    <button onclick="getSelectedText()">Get Highlighted Text</button>
</body>
</html>
